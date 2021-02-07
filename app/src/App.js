import React, { Component } from "react";
import Home from "./pages/home";
import "./sass/base.scss";
import NavBar from "./components/NavBar";
import Swipper from "./components/Swipper";

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import PageRenderer from "./page-renderer";
import AuthContext from "./context/authContext";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };
  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <HashRouter>
        <div className="App">
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <NavBar />
            <Switch>
              <Route path="/:page" component={PageRenderer} />

              <Route path="/" render={() => <Redirect to="/home" />} />
              <Route component={() => 404} />
            </Switch>
          </AuthContext.Provider>
        </div>
      </HashRouter>
    );
  }
}

export default App;
