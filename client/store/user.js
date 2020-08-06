import axios from "axios";

/**
 * ACTION TYPES
 */

const LOGGED_IN = "LOGGED_IN";

/**
 * ACTION CREATORS
 */

const loggedIn = (user) => ({
  type: LOGGED_IN,
  user,
});

/**
 * THUNK CREATORS
 */

export const logIn = (user) => async (dispatch) => {
  let res;
  try {
    res = await axios.post("/auth/login", user);
  } catch (authError) {
    return dispatch(loggedIn(authError));
  }
  try {
    dispatch(loggedIn(res.data));
    // history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const signUp = (user) => async (dispatch) => {
  let res;
  try {
    res = await axios.post("/auth/signup", user);
  } catch (authError) {
    return dispatch(loggedIn(authError));
  }
  try {
    dispatch(loggedIn(res.data));
    // history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case LOGGED_IN:
      return action.user;
    default:
      return state;
  }
}
