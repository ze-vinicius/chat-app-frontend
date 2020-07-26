import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Chat from "./Pages/Chat";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <Chat />
        </PrivateRoute>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={SignIn} />
        <Redirect from="*" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
