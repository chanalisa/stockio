import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout, me } from "../store";
import { buyStock, getPortfolio } from "../store/portfolio";
import { OrderForm } from "./OrderForm";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authentication();
    this.props.getPortfolio(this.props.user);
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.props.user.firstName}!</h1>
        {this.props.portfolio.length ? (
          <ul>
            {this.props.portfolio.map((stock) => (
              <li key={stock.id}>{stock.ticker}</li>
            ))}
          </ul>
        ) : (
          <div>Nothing to see here...</div>
        )}
        <Link to="/transactions">Transactions</Link>
        <button onClick={this.props.logOut}>Log Out</button>
        <OrderForm buyStock={this.props.buyStock} user={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    portfolio: state.portfolio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authentication: () => dispatch(me()),
    buyStock: (order, user) => dispatch(buyStock(order, user)),
    getPortfolio: (user) => dispatch(getPortfolio(user)),
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
