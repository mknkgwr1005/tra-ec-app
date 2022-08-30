import React from "react";
import { Switch, Route } from "react-router";
import {
  Home,
  SignUp,
  SignIn,
  Reset,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
  OrderHistory,
  FavouriteList,
} from "./templates";
import Auth from "./Auth";
import Admin from "./Admin";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin/reset" component={Reset} />
      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        <Admin>
          <Route exact path="/product/edit/:id" component={ProductEdit} />
          <Route exact path="/product/edit(/:id)?" component={ProductEdit} />
        </Admin>
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/cart" component={CartList} />
        <Route exact path="/favourite" component={FavouriteList} />
        <Route exact path="/order/confirm" component={OrderConfirm} />
        <Route exact path="/order/history" component={OrderHistory} />
      </Auth>
    </Switch>
  );
};

export default Router;
