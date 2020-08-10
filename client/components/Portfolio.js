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
    // this.props.authentication();
    await this.props.getPortfolio(this.props.user);
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
              Portfolio (
              {/* {this.props.portfolio.length &&
                this.props.portfolio.forEach((stock) => {
                  totalVal + stock.quantity * stock.currentPrice;
                })} */}
              )
            </h1>
            <div className="col-1-of-2">
              {this.props.portfolio.length ? (
                <ul className="stock-list">
                  {this.props.portfolio.map((stock) => (
                    <li key={stock.id}>
                      {stock.ticker}: {stock.quantity}
                      <div>
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
  return {
    user: state.user.user,
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
