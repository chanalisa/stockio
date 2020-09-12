import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { auth } from "../store";

const AuthForm = (props) => {
  const { authFormName, formDisplayName, handleSubmit, error } = props;

  function componentDidMount() {
    localStorage.clear();
  }

  return (
    <div className="row">
      <div className="form">
        <h1 className="heading-primary">{formDisplayName}</h1>
        <form className="form-auth" name={authFormName} onSubmit={handleSubmit}>
          {authFormName === "signup" && (
            <div className="row">
              <label>
                First Name
                <div className="row">
                  <input type="firstName" name="firstName" required />
                </div>
              </label>
            </div>
          )}
          {authFormName === "signup" && (
            <div className="row">
              <label>
                Last Name
                <div className="row">
                  <input type="lastName" name="lastName" required />
                </div>
              </label>
            </div>
          )}
          <div className="row">
            <label>
              Email
              <div className="row">
                <input type="email" name="email" required />
              </div>
            </label>
          </div>
          <div className="row">
            <label>
              Password
              <div className="row">
                <input type="password" name="password" required />
              </div>
            </label>
          </div>
          {error && error.response && (
            <div className="error"> {error.response.data} </div>
          )}
          <div className="button-wrapper">
            <button type="submit" className="btn btn-full">
              {formDisplayName}
            </button>
          </div>
        </form>
        <div className="button-wrapper">
          {authFormName === "login" ? (
            <Link to="/signup" className="btn btn-ghost">
              Sign Up
            </Link>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToPropsLogIn = (state) => {
  return {
    authFormName: "login",
    formDisplayName: "Log In",
    error: state.user.error,
  };
};

const mapStateToPropsSignUp = (state) => {
  return {
    authFormName: "signup",
    formDisplayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      localStorage.clear();
      const authFormName = event.target.name;
      const email = event.target.email.value.toLowerCase();
      const password = event.target.password.value;
      authFormName === "signup"
        ? dispatch(
            auth(
              email,
              password,
              authFormName,
              event.target.firstName.value,
              event.target.lastName.value
            )
          )
        : dispatch(auth(email, password, authFormName));
    },
  };
};

export const LogIn = connect(
  mapStateToPropsLogIn,
  mapDispatchToProps
)(AuthForm);
export const SignUp = connect(
  mapStateToPropsSignUp,
  mapDispatchToProps
)(AuthForm);
