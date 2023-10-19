import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AboutUs from "./Pages/AboutUs";
import DashBoard from "./Pages/DashBoard";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/LoginComponent";
import LandingPage from "./Pages/LandingPage";
import Modulos from "./Pages/Modulos";
import Pacientes from "./Pages/Pacientes";
import Sections from "./Pages/Sections";
import Vistas from "./Pages/Vistas";
import Wizard from "./Pages/Wizard";
import Anuncios from "./Pages/Anuncios";
import AnunciosCrear from "./Pages/AnunciosCrear";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage {...homedata} />} />
        <Route path="/Inicio" element={<LandingPage {...homedata} />} />
        <Route path="/ResetPassword" element={<ForgotPassword {...forgotData} />}/>
        <Route path="/Anuncios" element={<Anuncios />} />
        <Route path="/Modulos" element={<Modulos />} />
        <Route path="/Expedientes" element={<Vistas />} />
        <Route path="/Secciones" element={<Sections />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/InicioSesion" element={<Login {...loginData} />} />
        <Route path="/Dashboard" element={<DashBoard />} />
        <Route path="/SobreNosotros" element={<AboutUs {...aboutData} />} />
        <Route path="/Cuestionario" element={<Wizard {...wizardData} />} />
        <Route path="/Crearanuncios" element={<AnunciosCrear />} />
      </Routes>
    </Router>
  );
}

export default App;

//Aqui se importan las imagenes necesarias para el proyecto
//Ejemplo const logo = require('./assets/logo.png');
const wizardData = {
  unitecLogo: require("./Styles/Images/unitec-logo.png"),
  navbarBg: require("./Styles/Images/navbar.png"),
  howieImg: require("./Styles/Images/howie-wizard.png"),
};

const forgotData = {
  unitecLogo: require("./Styles/Images/unitec-logo.png"),
  navbarBg: require("./Styles/Images/navbar.png"),
};

const homedata = {
  unitecLogo: require("./Styles/Images/unitec-logo.png"),
  navbarBg: require("./Styles/Images/navbar.png"),
};

const aboutData = {
  unitecLogo: require("./Styles/Images/unitec-logo.png"),
  navbarBg: require("./Styles/Images/navbar.png"),
  misionIcon: require("./Styles/Images/fondoAU1.png"),
  visionIcon: require("./Styles/Images/fondoAU2.jpg"),
  historyIcon: require("./Styles/Images/fondoAU3.jpeg"),
};

const loginData = {
  unitecLogo: require("./Styles/Images/unitec-logo.png"),
  navbarBg: require("./Styles/Images/navbar.png"),
};