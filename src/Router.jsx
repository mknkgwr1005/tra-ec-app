import React from "react";
import { Switch, Route } from "react-router";
import { Home, SignUp, SignIn } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Auth>
        <Route exact path="/" component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;
