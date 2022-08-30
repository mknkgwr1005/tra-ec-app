import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import {
  getProductsInCart,
  getUsersFavourite,
  getUserId,
  getUserName,
} from "../../../reducks/reducks/users/selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "../../../firebase/index";
import { useDispatch } from "react-redux";
import {
  fetchProductsInCart,
  fetchUsersFavourite,
} from "../../../reducks/reducks/users/operations";
import { push } from "connected-react-router";

const HeaderMenus = (props) => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const dispatch = useDispatch();

  const userName = getUserName(selector);

  let productsInCart = getProductsInCart(selector);
  let usersFavourite = getUsersFavourite(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              const index = productsInCart.findIndex(
                (product) => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              productsInCart = productsInCart.filter(
                (product) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(productsInCart));
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("favourite")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const favourite = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              usersFavourite.push(favourite);
              break;
            case "modified":
              const index = usersFavourite.findIndex(
                (favourite) => favourite.favouriteId === change.doc.id
              );
              usersFavourite[index] = favourite;
              break;
            case "removed":
              usersFavourite = usersFavourite.filter(
                (favourite) => favourite.favouriteId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchUsersFavourite(usersFavourite));
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>ようこそ、{userName}さん</div>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(push("/favourite"))}>
        <Badge badgeContent={usersFavourite.length} color="secondary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
