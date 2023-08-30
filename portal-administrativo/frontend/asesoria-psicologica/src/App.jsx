import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reset from "./components/Reset";
import ResetPass from "./pages/ResetPass";
const Login = () => <div>Login</div>;
const Login2 = () => <div>Login 2 para /reset</div>;

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/reset">
            <Login2 />
          </Route>
          <Route path="/forgot">
            <Reset />
          </Route>
          <Route path="/reset-pass">
            <ResetPass />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
