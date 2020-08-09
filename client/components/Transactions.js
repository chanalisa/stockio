import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout, me } from "../store";
import { getTransactions } from "../store/transactions";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authentication();
    this.props.getTransactions(this.props.user);
  }

  render() {
    return (
      <div>
        <h1>Transactions</h1>
        {this.props.transactions.length ? (
          <ul className="stock-list">
            {this.props.transactions.map((transaction) => (
              <li>{transaction.ticker}</li>
            ))}
          </ul>
        ) : (
          <div>No Transactions</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authentication: () => dispatch(me()),
    getTransactions: (user) => dispatch(getTransactions(user)),
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
