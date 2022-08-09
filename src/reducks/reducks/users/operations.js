// 非同期処理の制御。actionsを呼び出す
import { push } from "connected-react-router";
import { signInAction } from "./actions";
import { auth, db, FirebaseTimestamp } from "../../../firebase/index";

export const signIn = (email, password) => {
  // 第一引数：actionを呼び出す、getState:storeの参照
  return async (dispatch) => {
    if (password == "" || email == "") {
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
      username == "" ||
      password == "" ||
      email == "" ||
      confirmPassword == ""
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
        console.log(result);
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
