import React from "react";
import { connect } from "react-redux";

class SignUp extends React.Component {
  constructor() {
    this.state = {
      firstName: "",
      lastName: "",
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form name="signup" onSubmit={this.handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
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
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return dispatch(logIn(this.state));
};

export default connect(null, mapDispatchToProps)(SignUp);
