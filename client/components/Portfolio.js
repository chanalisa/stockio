import React from "react";
import { connect } from "react-redux";

const Portfolio = (props) => {
  // console.log(props);
  return (
    <div>
      <p>YAY</p>
      <button>Log Out</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Portfolio);
