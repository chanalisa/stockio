import axios from "axios";

/**
 * ACTION TYPES
 */

const GOT_PORTFOLIO = "GOT_PORTFOLIO";

/**
 * ACTION CREATORS
 */

const gotPortfolio = (portfolio) => ({
  type: GOT_PORTFOLIO,
  portfolio,
});

/**
 * THUNK CREATORS
 */

export const getPortfolio = (user) => async (dispatch) => {
  try {
    console.log("getting portfolio", user);
    const { data } = await axios.get("/api/portfolio", user);
    console.log("data:", data);
    dispatch(gotPortfolio(data));
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
    default:
      return state;
  }
}
