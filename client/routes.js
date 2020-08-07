import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import { LogIn, Portfolio, SignUp, Transactions } from "./components";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/transactions" component={Transactions} /> */}
        <Route path="/portfolio" component={Portfolio} />
      </Switch>
    );
  }
}

export default withRouter(connect(null, null)(Routes));
