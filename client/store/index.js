import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import userReducer from "./user";
import portfolioReducer from "./portfolio";

const reducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
export * from "./user";
