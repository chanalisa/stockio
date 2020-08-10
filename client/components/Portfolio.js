import React from "react";
import { connect } from "react-redux";

import { logout, me } from "../store";
import { getPortfolio } from "../store/portfolio";
import OrderForm from "./OrderForm";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioValue: 0,
    };
  }

  async componentDidMount() {
    // this.props.authentication();
    await this.props.getPortfolio(this.props.user);
    let portfolioValue = await (
      this.props.portfolio.reduce(
        (total, stock) => total + stock.currentPrice
      ) / 100
    ).toFixed(2);
    await this.setState({
      portfolioValue: portfolioValue,
    });
    await console.log(this.state.portfolioValue);
    await this.props.portfolio.map((stock) => {
      if (stock.currentPrice < stock.openPrice) {
        document.getElementById(stock.id).classList.add("decrease");
      } else if (stock.currentPrice > stock.openPrice) {
        document.getElementById(stock.id).classList.add("increase");
      } else {
        document.getElementById(stock.id).classList.add("no-change");
      }
    });
  }

  render() {
    console.log(
      this.props.portfolio
      // .reduce((totalVal, stock) => {
      //   totalVal + stock.quantity * stock.currentPrice;
      // })
    );
    return (
      <div>
        <div className="section">
          <h1 className="heading-component">
            Hi, {this.props.user.firstName}!
          </h1>
          <div className="row">
            <h1 className="heading-component">
              Portfolio{" "}
              {this.props.portfolio.length ? this.state.portfolioValue : ` `}
            </h1>
            <div className="col-1-of-2">
              {this.props.portfolio.length ? (
                <ul className="stock-list">
                  {this.props.portfolio.map((stock) => (
                    <li key={stock.id} id={stock.id}>
                      <div className="col-1-of-2">
                        {stock.ticker}: {stock.quantity} Shares
                      </div>
                      <div className="col-1-of-2">
                        {((stock.currentPrice * stock.quantity) / 100).toFixed(
                          2
                        )}
                      </div>
                    </li>
                  ))}
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
  console.log(state);
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
