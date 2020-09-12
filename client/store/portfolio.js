import axios from "axios";

/**
 * ACTION TYPES
 */

const GOT_PORTFOLIO = "GOT_PORTFOLIO";
const BOUGHT_STOCK = "BOUGHT_STOCK";

/**
 * ACTION CREATORS
 */

const gotPortfolio = (portfolio) => ({
  type: GOT_PORTFOLIO,
  portfolio,
});

const boughtStock = (newStock) => ({
  type: BOUGHT_STOCK,
  newStock,
});

/**
 * THUNK
 */

export const getPortfolio = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/portfolio", user);
    dispatch(gotPortfolio(data));
  } catch (error) {
    console.error(error);
  }
};

export const buyStock = (order, user) => async (dispatch) => {
  try {
    let res = await axios.put("/api/portfolio", { ...order, user });
    dispatch(boughtStock(res.data));
  } catch (error) {
    if (
      error.response.data === "Invalid Ticker" ||
      error.response.data === "Invalid Quantity" ||
      error.response.data === "Insufficient Funds"
    ) {
      dispatch(boughtStock({ error }));
    }
  }
};

/**
 * INITIAL STATE
 */

const defaultPortfolio = [];

/**
 * REDUCER
 */

export default function (state = defaultPortfolio, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return action.portfolio;
    case BOUGHT_STOCK:
      let stock = state.find(
        (stock) => stock.ticker === action.newStock.ticker
      );
      if (stock) {
        return state.map((stock) => {
          if (stock.ticker === action.newStock.ticker) {
            return { ...stock, quantity: action.newStock.quantity };
          }
          return stock;
        });
      } else {
        return [...state, action.newStock];
      }
    default:
      return state;
  }
}
