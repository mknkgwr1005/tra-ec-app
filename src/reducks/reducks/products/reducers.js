// ここでstateを上書きする

import * as Actions from "./actions";
import initialState from "../store/initialState";

// 第一引数：初期値、第二引数：axtions.jsから返ってくる値（自分で設定した初期値）
export const ProductsReducer = (state = initialState.products, action) => {
  // actionのタイプによって処理をわけるswitch...case
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        // 新しい配列として上書きする
        list: [...action.payload],
      };
    // 変更がないとき
    default: {
      return state;
    }
  }
};
