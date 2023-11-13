import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {useEffect, useState} from "react";
import AboutUs from "./Pages/AboutUs";
import DashBoard from "./Pages/DashBoard";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/LoginComponent";
import LandingPage from "./Pages/LandingPage";
import Modulos from "./Pages/Modulos";
import Pacientes from "./Pages/Pacientes";
import Sections from "./Pages/Sections";
import Sesiones from "./Pages/Sesiones";
import Vistas from "./Pages/Vistas";
import Wizard from "./Pages/Wizard";
import Anuncios from "./Pages/Anuncios";
import AnunciosCrear from "./Pages/AnunciosCrear";
import Accounts from "./Pages/Accounts";
import LoadingSpinner from "./Pages/LoadingStyle";
import AuditLogs from "./Pages/AuditLogs";
import { PDFViewer } from "@react-pdf/renderer";
import { getCookies } from "../src/Utilities/login-services";
import MyZoomPat from "./Components/Zoom/zoomPat";
import MyZoom from "./Components/Zoom/Zoom";

function ProtectedRoute({ element, allowedRoles, userRoles }) {
    const isAuthorized =
        userRoles && userRoles.some((role) => allowedRoles.includes(role));

    return isAuthorized ? element : null;
}

function App() {
    const [userData, setUserData] = useState(null);
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    const fetchUserData = async () => {
        const userData = await getCookies();
    console.log("Fetching data")
        if (userData && userData.user_data && userData.user_data.roles) {
            setUserData(userData.user_data.roles);
            setUserDataLoaded(true);
        }
    };

    const handleLoginSuccess = (e) => {
        e.preventDefault();
        fetchUserData();
    };

    useEffect(() => {
        fetchUserData();
    }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage {...homedata} />} />
        <Route path="/Inicio" element={<LandingPage {...homedata} />} />
        <Route
          path="/ResetPassword"
          element={<ForgotPassword {...forgotData} />}
        />
        <Route
          path="/Anuncios"


                element={<Anuncios />}


        />
        <Route
          path="/Modulos"


                element={<Modulos />}


        />
        <Route
          path="/Expedientes"

                element={<Vistas />}

        />
        <Route
          path="/ExpedientesPDF"

        />
        <Route
          path="/Secciones"

                element={<Sections />}

        />
        <Route
          path="/Sesiones"
                element={<Sesiones />}
        />
        <Route
          path="/Pacientes"

                element={<Pacientes />}

        />
        <Route
          path="/InicioSesion"
          element={
            <Login
              {...loginData}
              onLoginSuccess={handleLoginSuccess}
              setUserDataLoaded={setUserDataLoaded}
            />
          }
        />
        <Route
          path="/Dashboard"

                element={<DashBoard />}

        />
        <Route path="/SobreNosotros" element={<AboutUs {...aboutData} />} />
        <Route path="/Cuestionario" element={<Wizard {...wizardData} />} />
        <Route path="/Cuentas" element={<Accounts />} />
        <Route
          path="/Crearanuncios"

                element={<AnunciosCrear />}

        />
        {/* <Route
          path="/Profiles"

                element={<ProfilesPage />}

        /> */}
      
        <Route path="/AuditLogs" element={<AuditLogs />} />
        <Route path="/Crearanuncios" element={<AnunciosCrear />} />
        
        <Route path="/ZoomC" element={<MyZoom/>} />
        <Route path="/ZoomV" element={<MyZoomPat/>} />
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
