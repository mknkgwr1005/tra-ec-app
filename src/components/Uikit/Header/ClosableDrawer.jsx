import React, { useState, useCallback, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcons from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextInput } from "../../Uikit/index";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../../reducks/reducks/users/operations";
import { searchProducts } from "../../../reducks/reducks/products/operations";
import { useSelector } from "react-redux";
import { getUsersRole } from "../../../reducks/reducks/users/selectors";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: 256,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: "center",
      display: "flex",
      marginLeft: 32,
    },
  })
);

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const { container } = props;
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const usersRole = getUsersRole(selector);

  const [searchKeyword, setSearchKeyword] = useState("");

  const selectMenu = (event, path) => {
    dispatch(push(path));
    // メニューを選択した後自動的にメニューを閉じる
    props.onClose(event, false);
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "すべて",
      id: "all",
      value: "/",
    },
    {
      func: selectMenu,
      label: "メンズ",
      id: "male",
      value: "/?gender=male",
    },
    {
      func: selectMenu,
      label: "レディース",
      id: "female",
      value: "/?gender=female",
    },
    {
      func: selectMenu,
      label: "シャツ",
      id: "shirts",
      value: "/?category=shirts",
    },
    {
      func: selectMenu,
      label: "トップス",
      id: "tops",
      value: "/?category=tops",
    },
    {
      func: selectMenu,
      label: "ワンピース",
      id: "onepiece",
      value: "/?category=onepiece",
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "注文履歴",
      icon: <HistoryIcons />,
      id: "history",
      value: "/order/history",
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage",
    },
  ];

  const adminMenus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit",
    },
  ];

  // useEffect(() => {
  //   db.collection("categories")
  //     .orderBy("order", "asc")
  //     .get()
  //     .then((snapshots) => {
  //       const list = [];
  //       snapshots.forEach((snapshot) => {
  //         const category = snapshot.data();
  //         list.push({
  //           func: selectMenu,
  //           label: category.name,
  //           id: category.id,
  //           value: `/?category=${category.id}`,
  //         });
  //       });
  //       setFilters((prevState) => [...prevState, ...list]);
  //     });
  // }, []);

  const inputSearchKeyword = useCallback(
    (event) => {
      setSearchKeyword(event.target.value);
    },
    [searchKeyword]
  );

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor={"right"}
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        {/* 検索バー */}
        <div onClose={(e) => props.onClose(e)}>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              onChange={inputSearchKeyword}
              required={false}
              rows={1}
              value={searchKeyword}
              type={"text"}
            />
            <IconButton onClick={() => dispatch(searchProducts(searchKeyword))}>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {usersRole === "admin" &&
              adminMenus.map((menu) => (
                <ListItem
                  button
                  key={menu.id}
                  onClick={(e) => menu.func(e, menu.value)}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItem>
              ))}
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"ログアウト"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
