import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */

const GOT_USER = "GOT_USER";
const REMOVED_USER = "REMOVED_USER";

/**
 * ACTION CREATORS
 */

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
    console.log(res.data);
  } catch (authError) {
    dispatch(gotUser({ error: authError }));
  }
  try {
    dispatch(gotUser(res.data.user));
    console.log(res.data.token);
    history.push("/portfolio");
    window.localStorage.setItem("token", res.data.token);
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

// confirms the authenticated user on state
export const me = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) {
      dispatch(gotUser(res.data));
      // user is redirected to portfolio page upon successful login
      history.location.pathname === "/login" && history.push("/portfolio");
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

/**
 * INITIAL STATE
 */

const defaultUser = {};

/**
 * REDUCER
 */

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    case REMOVED_USER:
      return defaultUser;
    default:
      return state;
  }
}
