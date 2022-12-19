// Storeで管理しているstateを参照する関数

import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getUsersEmail = createSelector(
  [usersSelector],
  (state) => state.email
);

export const getUsersRole = createSelector(
  [usersSelector],
  (state) => state.role
);

export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);

export const getOrdersHistory = createSelector(
  [usersSelector],
  (state) => state.orders
);

export const getUsersFavourite = createSelector(
  [usersSelector],
  (state) => state.favourite
);

export const getPersonalData = createSelector(
  [usersSelector],
  (state) => state.personal
);
