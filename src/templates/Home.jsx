import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signOut } from "../reducks/reducks/users/operations";
import { getUserId, getUserName } from "../reducks/reducks/users/selectors";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOut())}>サインアウト</button>
    </div>
  );
};

export default Home;
