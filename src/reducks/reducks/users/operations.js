// 非同期処理の制御。actionsを呼び出す
import { push } from "connected-react-router";
import { signInAction } from "./actions";

export const signIn = (email, password) => {
  // 第一引数：actionを呼び出す、getState:storeの参照
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "https://api.github.com/users/mknkgwr1005";

      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);

      const username = response.login;

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: "0001",
          username: username,
        })
      );

      dispatch(push("/"));
    }
  };
};
