import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, me } from "../store";

class Navbar extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/portfolio" className="btn btn-ghost">
                Portfolio
              </Link>
              <Link to="/transactions" className="btn btn-ghost">
                Transactions
              </Link>
              <div className="button-wrapper">
                <button onClick={this.props.logOut} className="btn btn-ghost">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    isLoggedIn: state.user.user ? !!state.user.user.id : false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    logOut: () => dispatch(logout),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
