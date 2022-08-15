import { db, FirebaseTimestamp } from "../../../firebase";
import { push } from "connected-react-router";

const productsRef = db.collection("products");

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
