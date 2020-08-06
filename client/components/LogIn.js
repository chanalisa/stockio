import React from "react";
import { connect } from "react-redux";

import { logIn } from "../store";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form name="login" onSubmit={this.handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return dispatch(logIn(this.state));
// };

// export default connect(null, mapDispatchToProps)(LogIn);
export default LogIn;
