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

export const buyStock = (user) => async (dispatch) => {
  try {
    console.log(user);
    const { data } = await axios.put("/api/portfolio", {
      ticker: "IBM",
      quantity: 5,
      user,
    });
    console.log(data);
    dispatch(boughtStock(data));
  } catch (error) {
    console.error(error);
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
      return [...state, action.newStock];
    default:
      return state;
  }
}
