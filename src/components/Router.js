import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Intro from "./Intro";
import App from "./App";
import Register from "./Register";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route exact path="/flight" component={App} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;