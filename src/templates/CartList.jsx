import React, { useCallback } from "react";
import List from "@material-ui/core/List";
import { useSelector, useDispatch } from "react-redux";
import { getProductsInCart } from "../reducks/reducks/users/selectors";
import { CartListItem } from "../components/Uikit/Products";
import { PrimaryButton, GreyButton } from "../components/Uikit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  const disableCart = (products) => {
    if (products.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text_headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium">
        <div className="p-grid_column">
          <PrimaryButton
            label={"レジへ進む"}
            onClick={goToOrder}
            disabled={disableCart(productsInCart)}
          />
          <div className="module-spacer--extra-extra-small" />
          <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
        </div>
      </div>
    </section>
  );
};

export default CartList;
