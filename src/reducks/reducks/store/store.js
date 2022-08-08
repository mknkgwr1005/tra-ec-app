import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
// import { configureStore as reduxCreateStore } from "@reduxjs/toolkit";
// 現在どのパスにいるかを管理するモジュール
import { connectRouter, routerMiddleware } from "connected-react-router";

// import { ProductsReducer } from "../products/reducers";
import { UsersReducer } from "../users/reducers";

import thunk from "redux-thunk";

// 渡したい初期値
export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      // 現在いるroute
      router: connectRouter(history),
      users: UsersReducer,
    }),
    // routerをミドルウェアとして使う
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
