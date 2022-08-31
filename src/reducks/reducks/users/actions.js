// どういう値を渡すかをすべてここにかく
export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  // reducerに渡す値
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      email: userState.email,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
      email: "",
    },
  };
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
  return {
    type: "FETCH_PRODUCTS_IN_CART",
    payload: products,
  };
};

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrderHistoryAction = (history) => {
  return {
    type: "FETCH_ORDERS_HISTORY",
    payload: history,
  };
};

export const FETCH_USERS_FAVOURITE = "FETCH_USERS_FAVOURITE";
export const fetchUsersFavouriteAction = (favourite) => {
  return {
    type: "FETCH_USERS_FAVOURITE",
    payload: favourite,
  };
};
