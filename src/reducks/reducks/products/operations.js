import { db, FirebaseTimestamp } from "../../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction, deleteProductsAction } from "./actions";

const productsRef = db.collection("products");

export const orderProduct = (productsInCart, price, paymentOptions) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const usersRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = {},
      soldOutProducts = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      products[product.productId] = {
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
        payment: paymentOptions,
      };

      batch.update(productsRef.doc(product.productId), { sizes: updatedSizes });
      batch.delete(usersRef.collection("cart").doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];
      alert(
        "大変申し訳ございません。" +
          errorMessage +
          "が在庫切れとなったため、注文処理を中断しました"
      );
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = usersRef.collection("orders").doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: price,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
            payment: paymentOptions,
          };

          orderRef.set(history);

          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert("注文処理に失敗しました。通信環境を確認してください。");
          return false;
        });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductsAction(nextProducts));
      });
  };
};

export const fetchProducts = (
  gender,
  category,
  productsPerPage,
  currentPage,
  lastProduct,
  beforePageNum,
  firstProduct
) => {
  return async (dispatch) => {
    let query = productsRef.orderBy("order", "desc").limit(productsPerPage);
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    // ページング機能
    // 次ページへ行くとき、前の値が今のページ数より小さい場合は、前のページの最後のデータ以降のデータを表示する
    if (currentPage > beforePageNum && lastProduct) {
      const lastId = lastProduct.id;
      const lastSnapshot = await (await query.where("id", "==", lastId).get())
        .docs[0];
      const next = productsRef
        .orderBy("order", "desc")
        .startAfter(lastSnapshot)
        .limit(productsPerPage);
      query = next;
      // 前ページへ戻るとき、前の値が今のページ数より大きい場合は、前のページの最後のデータ以前のデータを表示する
    } else if (currentPage < beforePageNum) {
      console.log("goBack");
      console.log(firstProduct);
      const lastId = firstProduct.id;
      const lastSnapshot = await (await query.where("id", "==", lastId).get())
        .docs[0];
      const before = productsRef
        .orderBy("order", "desc")
        .endBefore(lastSnapshot)
        .limit(productsPerPage);
      query = before;
    }

    // 表示する商品をかえる処理
    query.get().then((snapshots) => {
      const ProductList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        ProductList.push(product);
      });
      dispatch(fetchProductsAction(ProductList));
    });
  };
};

export const searchProducts = (searchKeyword) => {
  return async (dispatch) => {
    let query = productsRef.orderBy("name", "asc");
    query =
      searchKeyword !== ""
        ? query.startAt(searchKeyword).endAt(searchKeyword + "\uf8ff")
        : query;

    query.get().then((snapshots) => {
      const ProductList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        ProductList.push(product);
      });
      dispatch(fetchProductsAction(ProductList));
    });
  };
};

export const saveProduct = (
  order,
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
) => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now();

    const data = {
      order: order,
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      updated_at: timeStamp,
      images: images,
      sizes: sizes,
    };

    // 新規作成のときだけ、IDを作成する
    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timeStamp;
    }
    return (
      productsRef
        .doc(id)
        // 上書きする用の引数（第二引数）
        .set(data, { merge: true })
        .then(() => {
          dispatch(push("/"));
        })
        .catch((error) => {
          throw new Error(error);
        })
    );
  };
};
