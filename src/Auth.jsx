import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reducks/reducks/users/operations";
import { getIsSignedIn } from "./reducks/reducks/users/selectors";

const Auth = ({ children }) => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  });

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
