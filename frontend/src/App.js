import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
import ProfilesPage from "./Pages/Profiles";
import Accounts from "./Pages/Accounts";
import VistasPDF from "./Pages/DocuPDF";
import LoadingSpinner from "./Pages/LoadingStyle";
import AuditLogs from "./Pages/AuditLogs";
import { PDFViewer } from "@react-pdf/renderer";
import { getCookies } from "../src/Utilities/login-services";

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
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<Anuncios />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/Modulos"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<Modulos />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/Expedientes"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<Vistas />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/ExpedientesPDF"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <VistasPDF />
                  </PDFViewer>
                }
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/Secciones"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<Sections />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/Sesiones"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<Sesiones />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/Pacientes"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<Pacientes />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
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
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<DashBoard />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />

        <Route path="/SobreNosotros" element={<AboutUs {...aboutData} />} />
        <Route path="/Cuestionario" element={<Wizard {...wizardData} />} />
        <Route path="/Cuentas" element={<Accounts/>} />
        <Route
          path="/Crearanuncios"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<AnunciosCrear />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
        <Route
          path="/Profiles"
          element={
            userDataLoaded ? (
              <ProtectedRoute
                element={<ProfilesPage />}
                allowedRoles={["admin", "patient", "teacher", "psychologist"]}
                userRoles={userData}
              />
            ) : (
              <LoadingSpinner />
            )
          }
        />
      
        <Route path="/AuditLogs" element={<AuditLogs />} />
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
