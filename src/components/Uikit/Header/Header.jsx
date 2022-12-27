import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../../assets/img/icons/logo.png";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "../../../reducks/reducks/users/selectors";
import { HeaderMenus, ClosableDrawer } from "../Header/index";
import { push } from "connected-react-router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 128,
    },
    menuBar: {
      backgroundColor: "#fff",
      color: "#444",
    },
    toolbar: {
      margin: "0 auto",
      maxWidth: 1024,
      width: "100%",
    },
    iconButtons: {
      margin: "0 0 0 auto",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        (event.type === "keydown" && event.key === "Tab") ||
        event.key === "Shift"
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src={logo}
            alt=""
            width="128px"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus
                handleDrawerToggle={handleDrawerToggle}
              ></HeaderMenus>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
