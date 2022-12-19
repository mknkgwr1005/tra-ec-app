import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImage from "../../../assets/img/src/no_image.png";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import { deleteProduct } from "../../../reducks/reducks/products/operations";
import { useSelector } from "react-redux";
import { getUsersRole } from "../../../reducks/reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    // スマホ用のCSS
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50%-16px)",
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.3333%-32px)",
    },
  },
  content: {
    display: "flex,",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const usersRole = getUsersRole(selector);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const price = props.price.toLocaleString();
  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.images[0].path}
        title=""
        onClick={() => dispatch(push("/product/" + props.id))}
      />
      <CardContent>
        <div
          onClick={() => {
            dispatch(push("/product/" + props.id));
          }}
        >
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography component="p">{"￥" + price}</Typography>
        </div>
        {usersRole === "admin" && (
          <IconButton onClick={handleClick}>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        )}
        {usersRole === "admin" && (
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                dispatch(push("/product/edit/" + props.id));
                handleClose();
              }}
            >
              編集する
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(deleteProduct(props.id));
                handleClose();
              }}
            >
              削除する
            </MenuItem>
          </Menu>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
