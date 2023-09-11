import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Reset from "./components/Reset/Reset";
import ResetPass from "./pages/ResetPass";
import Modulos from "./pages/Modulos/Modulos";
import Navbar from "./components/Navbar/Navbar"
import PacientesForm from "./pages/Pacientes/Pacientes";
import Expedientes from "./pages/Vistas/Vistas"
import Login from "./pages/Login/Login"
import SectionsDashBoard from "./pages/DashBoard/DashBoard"

function App() {
  return (
    <Router>
        <div style={{display:'flex', flexDirection:'row'}}>
          <Navbar/> 
          <Switch >
            <Route exact path="/inicio">
              <PacientesForm />
            </Route>
            <Route exact path="/reset"> {/*iba el reset modifique para poder visual el navbar*/}
              <Reset />
            </Route>
            <Route exact path="/forgot">
              <Reset />
            </Route>
            <Route exact path="/reset-pass">
              <ResetPass />
            </Route>
            <Route exact path="/modulos"> {/*iba el reset modifique para poder visual el navbar*/}
              <Modulos />
            </Route>
            <Route exact path="/expedientes"> {/*iba el reset modifique para poder visual el navbar*/}
              <Expedientes />
            </Route>
            <Route exact path="/sections"> {/*iba el reset modifique para poder visual el navbar*/}
              <SectionsDashBoard />
            </Route>
            <Route exact path="/pacientes"> {/*iba el reset modifique para poder visual el navbar*/}
              <PacientesForm />
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
