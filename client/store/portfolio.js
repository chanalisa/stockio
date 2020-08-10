import axios from "axios";
// import store from "./index";

/**
 * ACTION TYPES
 */

const GOT_PORTFOLIO = "GOT_PORTFOLIO";
const BOUGHT_STOCK = "BOUGHT_STOCK";
// const UPDATED_USER_CASH = "UPDATED_USER_CASH";

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

// const updatedUserCash = (user) => ({
//   type: UPDATED_USER_CASH,
//   user,
// });

/**
 * THUNK CREATORS
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
    // console.log({ ...order, user });
    const { data } = await axios.put("/api/portfolio", { ...order, user });
    // console.log(data);
    dispatch(boughtStock(data));
    // dispatch(updatedUserCash(data.user));
  } catch (error) {
    console.error(error);
  }
};

/**
 * INITIAL STATE
 */

// const defaultState = {
//   portfolio: [],
//   user: {},
// };

const defaultPortfolio = [];

/**
 * REDUCER
 */

export default function (state = defaultPortfolio, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return action.portfolio;
    case BOUGHT_STOCK:
      return state.map((stock) => {
        if (stock.ticker === action.newStock.ticker) {
          return { ...stock, quantity: action.newStock.quantity };
        }
        return stock;
      });
    default:
      return state;
  }
}
