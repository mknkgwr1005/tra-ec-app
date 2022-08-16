import { db, FirebaseTimestamp } from "../../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction, deleteProductsAction } from "./actions";

const productsRef = db.collection("products");

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

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
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
