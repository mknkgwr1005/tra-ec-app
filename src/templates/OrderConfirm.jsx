import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsInCart,
  getPersonalData,
} from "../reducks/reducks/users/selectors";
import { makeStyles } from "@material-ui/styles";
import { CartListItem } from "../components/Uikit/Products/";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { PrimaryButton, TextDetail } from "../components/Uikit";
import { orderProduct } from "../reducks/reducks/products/operations";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { PaymentList } from "../components/Uikit/Payment";
import { fetchPersonalData } from "../reducks/reducks/users/operations";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      width: 512,
    },
  },
  orderBox: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2",
    height: "auto",
    margin: "24px auto 16px auto",
    padding: 16,
    width: 512,
  },
}));

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);
  const userPersonalData = getPersonalData(selector);
  const [paymentOptions, setPaymentOptions] = useState("");

  //   第２引数に変化が変わるたびに再レンダーされる
  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const shippingFee = subtotal >= 10000 ? 0 : 210;
  const tax = parseInt(subtotal * 0.1);

  const totalPrice = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, totalPrice, paymentOptions));
  }, [productsInCart, totalPrice, paymentOptions]);

  const handleChange = (e) => {
    setPaymentOptions(e.target.value);
  };

  const disableOrder = (products) => {
    if (products.length === 0 || !paymentOptions) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * ユーザーのプロフィールをfirebaseから呼び出す
   */
  useEffect(() => {
    dispatch(fetchPersonalData());
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text_headline">注文の確認</h2>
      <div className="p-grid_row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem
                  key={product.cartId}
                  product={product}
                ></CartListItem>
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={"商品合計"}
            value={"￥" + subtotal.toLocaleString()}
          />
          <TextDetail
            label={"送料"}
            value={"￥" + shippingFee.toLocaleString()}
          />
          <TextDetail label={"消費税"} value={"￥" + tax} />
          <Divider />
          <TextDetail label={"合計（税込み）"} value={"￥" + totalPrice} />
          <Divider />
          <Divider />
          <div>
            <TextDetail label="送付先情報" />
            {userPersonalData.length > 0 &&
              userPersonalData.map((data) => (
                <>
                  <TextDetail label={"氏名：" + data.name} />
                  <TextDetail label={"郵便番号：" + data.zipcode} />
                  <TextDetail label={"住所：" + data.address} />
                  <TextDetail label={"電話番号：" + data.telephone} />
                </>
              ))}
          </div>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="payment">支払方法</InputLabel>
              <Select
                id="payment"
                labelId="payment"
                value={paymentOptions}
                label="支払方法"
                onChange={handleChange}
              >
                <MenuItem value="credit">クレジットカード決済</MenuItem>
                <MenuItem value="convenience">コンビニ決済</MenuItem>
                <MenuItem value="cash">代金引換</MenuItem>
              </Select>
            </FormControl>
            <PaymentList paymentOptions={paymentOptions} />
          </Box>
          <div className="module-spacer--medium" />
          <PrimaryButton
            label={"注文する"}
            onClick={order}
            disabled={disableOrder(productsInCart)}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
