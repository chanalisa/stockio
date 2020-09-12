import axios from "axios";

/**
 * ACTION TYPES
 */

const GOT_TRANSACTIONS = "GOT_TRANSACTIONS";

/**
 * ACTION CREATORS
 */

const gotTransactions = (transactions) => ({
  type: GOT_TRANSACTIONS,
  transactions,
});

/**
 * THUNK CREATORS
 */

export const getTransactions = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/transactions", user);
    dispatch(gotTransactions(data));
  } catch (error) {
    history.push("/login");
    console.error(error);
  }
};

/**
 * INITIAL STATE
 */

const defaultTransactions = [];

/**
 * REDUCER
 */

export default function (state = defaultTransactions, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
}
