import React from "react";
import { useSelector } from "react-redux";
import { getUsersRole } from "./reducks/reducks/users/selectors";

const Admin = ({ children }) => {
  const selector = useSelector((state) => state);
  const usersRole = getUsersRole(selector);

  if (usersRole === "admin") {
    return children;
  } else {
    return <></>;
  }
};

export default Admin;
