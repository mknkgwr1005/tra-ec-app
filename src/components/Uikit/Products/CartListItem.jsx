import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../reducks/reducks/users/selectors";
import { db } from "../../../firebase";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const CartListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  const image = props.product.images[0].path;
  const price = props.product.price.toLocaleString();
  const name = props.product.name;
  const size = props.product.size;
  const id = props.product.productId;

  const uid = getUserId(selector);

  const removeProductFromCart = (id) => {
    return db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .doc(id)
      .delete();
  };

  const goToProductDetail = () => {
    dispatch(push("/product/" + id));
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img
            className={classes.image}
            src={image}
            alt="商品画像"
            onClick={goToProductDetail}
          />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={"サイズ" + size}></ListItemText>
        <ListItemText primary={"/" + price}></ListItemText>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
