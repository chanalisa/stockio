import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, me } from "../store";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <nav>
          <div className="row">
            <h1 className="heading-primary logo">stockio</h1>
            {isLoggedIn && (
              <ul className="main-nav">
                {/* The navbar will show these links after you log in */}
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link to="/transactions">Transactions</Link>
                </li>
                <div className="button-wrapper">
                  <button onClick={this.props.logOut} className="btn btn-full">
                    Log Out
                  </button>
                </div>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: state.user ? !!state.user.id : false,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
