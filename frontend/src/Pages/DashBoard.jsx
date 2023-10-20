import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";

import Popup from "../Components/PopUp";
import NavigationB from "../Components/Navbar";
import SectionCard from "../Components/Card";
import { loadModules } from "../Utilities/course-services";
import { getCookies } from "../Utilities/login-services.js";

function DashBoard() {
  const [displayedModules, setModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [state, setState] = useState(false);
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({});
  const [cookies, setCookies] = useState({});
  const [cookiesLoaded, setCookiesLoaded] = useState(false);
  useEffect(() => {
    updateModuleList();
    if (cookiesLoaded) {
      console.log("Cookies:", cookies);
    }
  }, [cookies, cookiesLoaded]);
  const updateModuleList = () => {
    async function fetchData() {
      setModules(await loadModules());
      if (!cookiesLoaded) {
        const obtainedCookies = await getCookies();
        setCookies(obtainedCookies);
        setCookiesLoaded(true);
      }
    }
    fetchData();
  };

  return (
    <div className="dashboard-container">
      <NavigationB />
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h1 className="dashboard-titulo">Todos los Módulos</h1>
          <a
            href="#"
            className="button-create"
            onClick={() => setIsPopupOpen(true)}
          >
            Nuevo módulo
          </a>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            selectedButtonInfo={selectedButtonInfo}
            onUpdateModuleList={updateModuleList}
          />
        </div>
        <div className="dashboard-body">
          <div style={{}}>
            <h1>TABLERO</h1>
            <div className="section-card-container">
              {displayedModules.map((module) => (
                <SectionCard
                  props={module}
                  handleReload={() => setState(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
