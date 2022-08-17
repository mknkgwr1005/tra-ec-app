import React from "react";
import {
  makeStyles,
  createStyles,
  useDispatch,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../../../assets/img/icons/logo.png";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "../../../reducks/reducks/users/selectors";
import HeaderMenus from "../Header/index";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    marigin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 0",
  },
});

const Header = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar} />
        <img
          src={logo}
          alt="torahackLogo"
          width="128px"
          onClick={() => dispatch(push("/"))}
        />
        {isSignedIn && (
          <div className={classes.iconButtons}>
            <HeaderMenus />
          </div>
        )}
      </AppBar>
    </div>
  );
};

export default Header;
