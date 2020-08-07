import React from "react";
import { connect } from "react-redux";

import { logout } from "../store";

const Portfolio = (props) => {
  const { logOut } = props;
  return (
    <div>
      <p>YAY</p>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
