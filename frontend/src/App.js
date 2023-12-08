import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
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
import Accounts from "./Pages/Accounts";
import AuditLogs from "./Pages/AuditLogs";
import {getCookies} from "./Utilities/login-services";
import MyZoomPat from "./Components/Zoom/zoomPat";
import MyZoom from "./Components/Zoom/Zoom";
import {Citas} from "./Pages/Citas";


function App() {
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const verifyRef = useRef(null);
    const getUserData = async () => {
        try {
            const data = await getCookies();
            setUserDataLoaded(true);
            verifyRef.current = data;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const handleLoginSuccess = (e) => {
        const fetchData = async () => {
            try {
                e.preventDefault();
                await getUserData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage {...homedata} />}/>
                <Route path="/Inicio" element={<LandingPage {...homedata} />}/>
                <Route
                    path="/ResetPassword"
                    element={<ForgotPassword {...forgotData} />}
                />


                {userDataLoaded && (
                    <Route path="/Anuncios" element={<Anuncios userData={verifyRef.current}/>}/>
                )}
                {userDataLoaded && (
                    <Route path="/Modulos" element={<Modulos userData={verifyRef.current}/>}/>
                )}
                {userDataLoaded && (
                    <Route path="/Expedientes" element={<Vistas userData={verifyRef.current}/>}/>
                )}

                {userDataLoaded && (
                    <Route path="Secciones" element={<Sections userData={verifyRef.current}/>}/>
                )}
                {userDataLoaded && (
                    <Route path="/Sesiones" element={<Sesiones userData={verifyRef.current}/>}/>
                )}
                {userDataLoaded && (
                    <Route path="/Pacientes" element={<Pacientes userData={verifyRef.current}/>}/>
                )}

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
                {userDataLoaded && (
                    <Route
                        path="/Dashboard"
                        element={<DashBoard userData={verifyRef.current}/>}
                    />
                )}

                {userDataLoaded && (
                    <Route path="/citas" element={<Citas userData={verifyRef.current}/>}/>
                )}


                <Route path="/SobreNosotros" element={<AboutUs {...aboutData} />}/>
                <Route path="/Cuestionario" element={<Wizard {...wizardData} />}/>


                {userDataLoaded && (
                    <Route path="/Cuentas" element={<Accounts userData={verifyRef.current}/>}/>
                )}
                {/* <Route
          path="/Profiles"

                element={<ProfilesPage />}

        /> */}
                {userDataLoaded && (
                    <Route path="/AuditLogs" element={<AuditLogs userData={verifyRef.current}/>}/>
                )}

                {userDataLoaded && (
                    <Route path="/ZoomC" element={<MyZoom userData={verifyRef.current}/>}/>
                )}

                {/* <Route path="/ZoomV" element={<MyZoomPat/>}/> */}


                {userDataLoaded && (
                    <Route path="/ZoomV" element={<MyZoomPat userData={verifyRef.current}/>}/>
                )}
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
