import React from "react";
import { connect } from "react-redux";

import { getTransactions } from "../store/transactions";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTransactions(this.props.user);
  }

  render() {
    return (
      <div className="section">
        <div className="row">
          <h1 className="heading-component">Transactions</h1>
          {this.props.transactions.length && (
            <ul className="stock-list">
              {this.props.transactions.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.transactionType} ({transaction.ticker}):{" "}
                  {transaction.quantity} shares @{" "}
                  {(transaction.priceAtTransaction / 100).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (user) => dispatch(getTransactions(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
