import { db, FirebaseTimestamp } from "../../../firebase";
import { push } from "connected-react-router";

const productsRef = db.collection("products");

export const saveProduct = (
  name,
  description,
  category,
  gender,
  price,
  images
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
    };

    const ref = productsRef.doc();
    const id = ref.id;

    data.id = id;
    data.created_at = timeStamp;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
