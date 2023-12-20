import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
import Anuncios from "./Pages/Anuncios";
import Accounts from "./Pages/Accounts";
import AuditLogs from "./Pages/AuditLogs";
import RoleAdmin from "./Pages/RoleAdmin";
import { getCookies } from "./Utilities/login-services";
import MyZoomPat from "./Components/Zoom/zoomPat";
import MyZoom from "./Components/Zoom/Zoom";
import { Citas } from "./Pages/Citas";
import Registro from "./Pages/Registro";
import Calendar from "./Pages/Calendar";
import ProtectedRoute from "./Utilities/ProtectedRoute";
import Chequeos from "./Pages/Chequeo";
import Estadisticas from "./Pages/Estadisticas";
import Reportes from "./Pages/Reportes";
import { getVerify } from "./Utilities/user-services";

import Documentos from "./Pages/Documents";
import LoadingSpinner from "./Pages/LoadingStyle";

function App() {
  const verifyRef = useRef(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  async function fetchData() {
    try {
      const data = await getCookies();
      setUserDataLoaded(true);
      setUserData(data);
      // console.log("Si se manda a llamar la info data1", data);
      const data2 = await getVerify(data.user_data.id_user);
      verifyRef.current = data2;
      // console.log("Si se manda a llamar la info data2", data2);
    } catch (error) {
      console.error("Error al obtener cookies:", error);
    }
  }

  const handleLoginSuccess = (e) => {
    e.preventDefault();
    setInitialRender(false);
    fetchData();
    window.location.href = "/Dashboard";
  };

  useEffect(() => {
    setInitialRender(false);
    fetchData();
  }, []);

  if (initialRender || !userDataLoaded || userData === null) {
    return null;
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage {...homedata} />} />
        <Route path='/Inicio' element={<LandingPage {...homedata} />} />
        <Route
          path='/ResetPassword'
          element={<ForgotPassword {...forgotData} />}
        />

        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Anuncios'
            element={<Anuncios userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Modulos'
            element={<Modulos userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Expedientes'
            element={<Vistas userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='Secciones'
            element={<Sections userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Sesiones'
            element={<Sesiones userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Pacientes'
            element={<Pacientes userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Roles'
            element={<RoleAdmin userData={userData} verifyRef={verifyRef} />}
          />
        </Route>

        <Route
          path='/InicioSesion'
          element={
            <Login
              {...loginData}
              onLoginSuccess={handleLoginSuccess}
              setUserDataLoaded={setUserDataLoaded}
            />
          }
        />
        <Route path='/error' element={<LoadingSpinner />} />

        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Dashboard'
            element={<DashBoard userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Estadisticas'
            element={<Estadisticas userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Reportes'
            element={<Reportes userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/citas'
            element={<Citas userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Cuentas'
            element={<Accounts userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/AuditLogs'
            element={<AuditLogs userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/ZoomC'
            element={<MyZoom userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/ZoomV'
            element={<MyZoomPat userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Calendar'
            element={<Calendar userData={userData} verifyRef={verifyRef} />}
          />
        </Route>
        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route
            path='/Chequeo'
            element={<Chequeos userData={userData} verifyRef={verifyRef} />}
          />
        </Route>

        <Route element={<ProtectedRoute cookies={userData} />}>
          <Route path='/Documentos' element={<Documentos />} />
        </Route>
        <Route path='/SobreNosotros' element={<AboutUs {...aboutData} />} />
        <Route path='/Registro' element={<Registro {...aboutData} />} />
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
