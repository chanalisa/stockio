import React from "react";
import Routes from "./routes";
import { LogIn } from "./components";
import { Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div>
        {/* <div>Hello World!</div> */}
        <Routes />
      </div>
    );
  }
}
