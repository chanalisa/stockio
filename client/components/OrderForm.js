import React from "react";
import { connect } from "react-redux";

import { buyStock } from "../store/portfolio";
import { me } from "../store";
class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      quantity: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.buyStock(this.state, this.props.user);
    this.props.getUser();
    this.setState({
      ticker: "",
      quantity: "",
    });
  }

  render() {
    return (
      <div className="col-1-or-2 form">
        <h1 className="heading-component">
          Cash: ${(this.props.user.cash / 100).toFixed(2)}
        </h1>
        <form className="form-order" name="order" onSubmit={this.handleSubmit}>
          {this.props.portfolio.length
            ? this.props.portfolio[this.props.portfolio.length - 1].error &&
              this.props.portfolio[this.props.portfolio.length - 1].error
                .response && (
                <div className="error">
                  {
                    this.props.portfolio[this.props.portfolio.length - 1].error
                      .response.data
                  }
                </div>
              )
            : ""}
          <label>
            Ticker
            <input
              type="text"
              name="ticker"
              value={this.state.ticker}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Quantity
            <input
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              required
            />
          </label>
          <div className="button-wrapper">
            <button type="submit" className="btn btn-full">
              Buy
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(me()),
    buyStock: (order, user) => {
      dispatch(buyStock(order, user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
