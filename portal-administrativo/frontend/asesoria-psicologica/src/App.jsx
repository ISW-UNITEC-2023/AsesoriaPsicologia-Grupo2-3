import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reset from "./components/Reset/Navbar.jsx";
import ResetPass from "./pages/ResetPass";

const Login = () => <div>Login</div>;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/navbar"> {/*iba el reset modifique para poder visual el navbar*/}
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
