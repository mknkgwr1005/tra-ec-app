import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPersonalData,
  getUserName,
  getUsersEmail,
  getUsersRole,
} from "../reducks/reducks/users/selectors";
import { push } from "connected-react-router";
import { PrimaryButton, GreyButton } from "../components/Uikit";
import {
  fetchPersonalData,
  resetPassword,
} from "../reducks/reducks/users/operations";
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
  const userPersonalData = getPersonalData(selector);

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

  useEffect(() => {
    dispatch(fetchPersonalData());
  }, []);

  const goToOrderHistory = useCallback(() => {
    dispatch(push("/order/history"));
  });

  const goToFavourite = useCallback(() => {
    dispatch(push("/favourite"));
  });

  const editPersonalData = useCallback(() => {
    dispatch(push("/user/personal"));
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

        <div className={classes.title}>送付先情報</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell align="right">氏名</TableCell>
              <TableCell align="right">郵便番号</TableCell>
              <TableCell align="right">住所</TableCell>
              <TableCell align="right">電話番号</TableCell>
            </TableHead>
            <TableBody>
              {userPersonalData.length > 0 &&
                userPersonalData.map((data) => (
                  <>
                    <TableCell align="right">{data.name}</TableCell>
                    <TableCell align="right">{data.zipcode}</TableCell>
                    <TableCell align="right">{data.address}</TableCell>
                    <TableCell align="right">{data.telephone}</TableCell>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="module-spacer--medium" />
        <PrimaryButton
          label={"送付先情報を変更する"}
          onClick={editPersonalData}
        />

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
