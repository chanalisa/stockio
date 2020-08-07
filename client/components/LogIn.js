import React from "react";
import { connect } from "react-redux";

import { logIn } from "../store";

const LogIn = (props) => {
  const { handleSubmit } = props;

  return (
    <div>
      <h1>Log In</h1>
      <form name="login" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

// const mapStateToProps = state => {
//   return
// }

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      dispatch(logIn(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
// export default LogIn;
