import React from "react";
import { useDispatch } from "react-redux";
// import { push } from "connected-react-router";
import { useSelector } from "react-redux";
// import { signInAction } from "../reducks/reducks/users/actions";
import { signIn } from "../reducks/reducks/users/operations";

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(signIn())}>ログイン</button>
    </div>
  );
};

export default Login;
