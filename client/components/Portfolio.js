import React from "react";
import { connect } from "react-redux";

import { logout, me } from "../store";
import { getPortfolio } from "../store/portfolio";
import OrderForm from "./OrderForm";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getPortfolio(this.props.user);
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className="row">
            <h1 className="heading-component">
              Portfolio
              {this.props.portfolio.length
                ? `: $${(
                    this.props.portfolio
                      .filter((stock) => stock.id)
                      .reduce((total, stock) => {
                        return total + stock.currentPrice * stock.quantity;
                      }, 0) / 100
                  ).toFixed(2)}`
                : ""}
            </h1>
            <div className="col-1-of-2">
              {this.props.portfolio.length ? (
                <ul className="stock-list">
                  {this.props.portfolio.map((stock) => {
                    if (stock.id) {
                      return (
                        <li
                          key={stock.id}
                          className={
                            stock.currentPrice < stock.openPrice
                              ? "decrease"
                              : stock.currentPrice > stock.openPrice
                              ? "increase"
                              : "no-change"
                          }
                        >
                          <div className="col-1-of-2">
                            {stock.ticker}: {stock.quantity} Shares
                          </div>
                          <div className="col-1-of-2">
                            {(
                              (stock.currentPrice * stock.quantity) /
                              100
                            ).toFixed(2)}
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              ) : (
                <div className="col-1-of-2">
                  <br />
                </div>
              )}
            </div>
            <OrderForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    portfolio: state.portfolio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authentication: () => dispatch(me()),
    getPortfolio: (user) => dispatch(getPortfolio(user)),
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
