import React from "react";

import Routes from "./routes";
import { NavBar } from "./components";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Routes />
      </div>
    );
  }
}
