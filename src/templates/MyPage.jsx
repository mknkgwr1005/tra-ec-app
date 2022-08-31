import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserName,
  getUsersEmail,
  getUsersRole,
} from "../reducks/reducks/users/selectors";
import { push } from "connected-react-router";
import { PrimaryButton, GreyButton } from "../components/Uikit";
import { resetPassword } from "../reducks/reducks/users/operations";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

const useStyles = makeStyles({
  title: {
    fontSize: "30px",
    fontWeight: "bold",
  },
});

const MyPage = () => {
  const selector = useSelector((state) => state);
  const userName = getUserName(selector);
  const userRole = getUsersRole(selector);
  const userEmail = getUsersEmail(selector);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [userRoleName, setUserRoleName] = useState("");

  useEffect(() => {
    if (userRole === "admin") {
      setUserRoleName("管理者");
    } else {
      setUserRoleName("会員");
    }
  });

  const goToOrderHistory = useCallback(() => {
    dispatch(push("/order/history"));
  });

  const goToFavourite = useCallback(() => {
    dispatch(push("/favourite"));
  });

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__column">
        <TableContainer component={Paper}>
          <div className={classes.title}>プロフィール</div>
          <Table>
            <TableHead>
              <TableCell align="right">ユーザー名</TableCell>
              <TableCell align="right">ユーザー権限</TableCell>
              <TableCell align="right">メールアドレス</TableCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">{userName}</TableCell>
                <TableCell align="right">{userRoleName}</TableCell>
                <TableCell align="right">{userEmail}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="module-spacer--medium" />
        <PrimaryButton label={"購入履歴"} onClick={goToOrderHistory} />
        <PrimaryButton label={"お気に入り"} onClick={goToFavourite} />
        <Divider />
        <GreyButton
          label={"パスワードをリセット"}
          onClick={resetPassword(userEmail)}
        />
      </div>
    </section>
  );
};

export default MyPage;
