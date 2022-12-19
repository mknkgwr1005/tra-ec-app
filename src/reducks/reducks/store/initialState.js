// Storeの初期状態
// アプリに必要なstateをすべて記述

const initialState = {
  products: {
    list: [],
  },

  users: {
    orders: [],
    cart: [],
    icon: "",
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
    favourite: [],
    email: "",
    personal: [],
  },
};

export default initialState;
