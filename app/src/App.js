import React from "react";
import Home from "./pages/home";
import "./sass/base.scss";
import NavBar from "./components/NavBar";
import Swipper from "./components/Swipper";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageRenderer from "./page-renderer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/:page" component={PageRenderer} />

          <Route path="/" render={() => <Redirect to="/home" />} />
          <Route component={() => 404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
