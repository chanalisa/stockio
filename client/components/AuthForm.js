import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { auth, logIn } from "../store";

// const LogIn = (props) => {
//   const { handleSubmit } = props;

//   return (
//     <div>
//       <h1>Log In</h1>
//       <form name="login" onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input type="email" name="email" />
//         </label>
//         <label>
//           Password
//           <input type="password" name="password" />
//         </label>
//         <button type="submit">Log In</button>
//       </form>
//       <Link to="/signup">Sign Up</Link>
//     </div>
//   );
// };

// // const mapStateToProps = state => {
// //   return
// // }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleSubmit(event) {
//       event.preventDefault();
//       const email = event.target.email.value;
//       const password = event.target.password.value;
//       dispatch(logIn(email, password));
//     },
//   };
// };

// export default connect(null, mapDispatchToProps)(LogIn);
// // export default LogIn;
const AuthForm = (props) => {
  const { authFormName, formDisplayName, handleSubmit, error } = props;

  return (
    <div>
      <h1>{formDisplayName}</h1>
      <form className="auth-form" name={authFormName} onSubmit={handleSubmit}>
        {authFormName === "signup" && (
          <label>
            First Name
            <input type="firstName" name="firstName" required />
          </label>
        )}
        {authFormName === "signup" && (
          <label>
            Last Name
            <input type="lastName" name="lastName" required />
          </label>
        )}
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">{formDisplayName}</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {authFormName === "login" ? (
        <Link to="/signup">Sign Up</Link>
      ) : (
        <Link to="/login">Log In</Link>
      )}
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
      event.preventDefault;
      // localStorage.clear();
      const authFormName = event.target.name;
      const email = event.target.email.value;
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
