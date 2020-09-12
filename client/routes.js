import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import { LogIn, Portfolio, SignUp, Transactions } from "./components";
import { me } from "./store";
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData("routes");
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        {/* only allow users who are logged in to access these routes */}
        {isLoggedIn && (
          <Switch>
            <Route path="/transactions" component={Transactions} />
            <Route path="/portfolio" component={Portfolio} />
          </Switch>
        )}
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user.user that has a truthy id.
    // Otherwise, state.user.user will be an empty object, and state.user.user.id will be falsey
    isLoggedIn: state.user ? !!state.user.id : false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(source) {
      dispatch(me(source));
    },
  };
};
export default withRouter(connect(mapState, mapDispatch)(Routes));
