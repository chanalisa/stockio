import React from "react";

export class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      quantity: "",
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
    console.log(this.state);
    this.props.buyStock(this.state, this.props.user);
    this.setState({
      ticker: "",
      quantity: "",
    });
  }

  render() {
    return (
      <div>
        {/* <h1>{formDisplayName}</h1> */}
        <form className="order-form" name="order" onSubmit={this.handleSubmit}>
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
          <button type="submit">Buy</button>
        </form>
      </div>
    );
  }
}
