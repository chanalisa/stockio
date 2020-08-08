import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */

const LOGGED_IN = "LOGGED_IN";
const GOT_USER = "GOT_USER";
const REMOVED_USER = "REMOVED_USER";

/**
 * ACTION CREATORS
 */

const loggedIn = (user) => ({
  type: LOGGED_IN,
  user,
});

const gotUser = (user) => ({
  type: GOT_USER,
  user,
});

const removedUser = () => ({
  type: REMOVED_USER,
});

/**
 * THUNK CREATORS
 */

export const auth = (
  email,
  password,
  method,
  firstName = null,
  lastName = null
) => async (dispatch) => {
  let res;
  try {
    res = firstName
      ? await axios.post(`/auth/${method}`, {
          firstName,
          lastName,
          email,
          password,
        })
      : await axios.post(`/auth/${method}`, { email, password });
    console.log(res);
  } catch (authError) {
    return dispatch(gotUser(authError));
  }
  try {
    dispatch(gotUser(res.data));
    // localStorage.setItem("token", res.data.token);
    localStorage.setItem("token", res.data.token);
    history.push("/portfolio");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const me = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) {
      dispatch(gotUser(res.data));
      history.push("/portfolio");
    } else {
      dispatch(gotUser(defaultUser));
      history.push("/login");
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    await axios.post("/auth/logout");
    dispatch(removedUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

// export const logIn = (email, password) => async (dispatch) => {
//   let res;
//   try {
//     res = await axios.post("/auth/login", { email, password });
//   } catch (authError) {
//     return dispatch(loggedIn(authError));
//   }
//   try {
//     dispatch(loggedIn(res.data));
//     localStorage.setItem("token", res.data.token);
//     // history.push("/portfolio");
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr);
//   }
// };

// export const signUp = (user) => async (dispatch) => {
//   let res;
//   try {
//     res = await axios.post("/auth/signup", user);
//   } catch (authError) {
//     return dispatch(loggedIn(authError));
//   }
//   try {
//     dispatch(loggedIn(res.data));
//     // history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr);
//   }
// };

/**
 * INITIAL STATE
 */

const defaultUser = {};

/**
 * REDUCER
 */

export default function (state = defaultUser, action) {
  switch (action.type) {
    case LOGGED_IN:
      return action.user;
    case GOT_USER:
      return action.user;
    case REMOVED_USER:
      return defaultUser;
    default:
      return state;
  }
}
