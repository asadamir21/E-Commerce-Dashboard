
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import SignIn from "layouts/SignIn.js";
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={SignIn} />
      {/*<Redirect from="/" to="/admin/dashboard" />*/}
    </Switch>
  </Router>,
  document.getElementById("root")
);
