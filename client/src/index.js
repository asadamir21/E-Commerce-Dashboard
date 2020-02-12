
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect} from "react-router-dom";

// core components
import SignIn from "layouts/SignIn.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/SignIn" component={SignIn} />
      <Redirect from="/" to="/SignIn" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

export default hist;