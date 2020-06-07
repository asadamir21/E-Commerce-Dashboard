
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
//import { Router, Route, Switch, Redirect} from "react-router-dom";

// core components
import SignIn from "layouts/SignIn.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <SignIn/>,
  document.getElementById("root")
);

export default hist;