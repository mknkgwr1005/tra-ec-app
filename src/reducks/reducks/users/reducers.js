// ここでstateを上書きする

import * as Actions from "./actions";
import initialState from "../store/initialState";

// 第一引数：初期値、第二引数：axtions.jsから返ってくる値（自分で設定した初期値）
export const UsersReducer = (state = initialState.users, action) => {
  // actionのタイプによって処理をわけるswitch...case
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        // 初期値と変更値をマージできるように、spread構文でかくこと
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};
