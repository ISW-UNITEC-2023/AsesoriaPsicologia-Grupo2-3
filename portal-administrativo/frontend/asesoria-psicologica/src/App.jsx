import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reset from "./components/Reset";
import ResetPass from "./pages/ResetPass";

const Login = () => <div>Login</div>;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
        <Route exact path="/forgot">
          <Reset />
        </Route>
        <Route exact path="/reset-pass">
          <ResetPass />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
