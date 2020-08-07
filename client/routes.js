import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import { LogIn, Portfolio, SignUp, Transactions } from "./components";
import { me } from "./store";
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        {isLoggedIn && (
          <Switch>
            {/* <Route path="/transactions" component={Transactions} /> */}
            <Route path="/portfolio" component={Portfolio} />
          </Switch>
        )}
      </Switch>
    );
  }
}

const mapState = (state) => {
  console.log("here");
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};
export default withRouter(connect(mapState, mapDispatch)(Routes));
