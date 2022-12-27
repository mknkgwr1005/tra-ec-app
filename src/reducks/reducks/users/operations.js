// 非同期処理の制御。actionsを呼び出す
import { push } from "connected-react-router";
import {
  fetchOrderHistoryAction,
  fetchPersonalDataAction,
  fetchProductsInCartAction,
  fetchUsersFavouriteAction,
  signInAction,
  signOutAction,
} from "./actions";
import { auth, db, FirebaseTimestamp } from "../../../firebase/index";

export const addUsersFavourite = (addedFavourite) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const favouriteRef = db
      .collection("users")
      .doc(uid)
      .collection("favourite")
      .doc();
    addedFavourite["favouriteId"] = favouriteRef.id;
    await favouriteRef.set(addedFavourite);
    dispatch(push("/"));
  };
};

export const fetchUsersFavourite = (favourite) => {
  return async (dispatch) => {
    dispatch(fetchUsersFavouriteAction(favourite));
  };
};

export const fetchOrderHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const list = [];

    db.collection("users")
      .doc(uid)
      .collection("orders")
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push(data);
        });

        dispatch(fetchOrderHistoryAction(list));
      });
  };
};

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .doc();
    addedProduct["cartId"] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push("/"));
  };
};

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products));
  };
};

export const fetchPersonalData = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const list = [];
    db.collection("users")
      .doc(uid)
      .collection("personal")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push(data);
        });
        dispatch(fetchPersonalDataAction(list));
      });
  };
};

export const addPersonalData = (personalData, addedPersonalData) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;

    const docData = db
      .collection("users")
      .doc(uid)
      .collection("personal")
      .doc();

    if (personalData.length === 0) {
      addedPersonalData["personalId"] = docData.id;
      await docData.set(addedPersonalData);
      dispatch(push("/"));
    } else {
      const personalId = getState().users.personal[0].personalId;
      const personalRef = db
        .collection("users")
        .doc(uid)
        .collection("personal")
        .doc(personalId);

      personalRef.set(addedPersonalData, { merge: true });
      dispatch(push("/"));
    }
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else {
      const result = window.confirm("パスワードをリセットしますか？");
      if (result) {
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
            alert(
              "入力されたアドレスにパスワードリセット用のメールを送信しました"
            );
            dispatch(push("/signin"));
          })
          .catch(() => {
            alert(
              "パスワードリセットに失敗しました。通信状況を確認してください"
            );
          });
      } else {
        alert("パスワードリセットをキャンセルしました");
      }
    }
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                email: data.email,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    // firebaseのサインアウトプロパティ
    auth.signOut().then(() => {
      // サインイン状態のstateのリセット
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

export const signIn = (email, password) => {
  // 第一引数：actionを呼び出す、getState:storeの参照
  return async (dispatch) => {
    if (password === "" || email === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                email: data.email,
              })
            );

            dispatch(push("/"));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致していません。もう一度入力してください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timeStamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timeStamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timeStamp,
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};
