// Storeの初期状態
// アプリに必要なstateをすべて記述

const initialState = {
  products: {
    list: [],
  },

  users: {
    icon: "",
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
