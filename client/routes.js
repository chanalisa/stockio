import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import { LogIn, Transactions } from "./components";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/transactions" component={Transactions} />
      </Switch>
    );
  }
}

export default Routes;