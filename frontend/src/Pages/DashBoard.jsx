import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";

import Popup from "../Components/PopUp";
import NavigationB from "../Components/Navbar"
import SectionCard from "../Components/Card";
import { loadModules } from "../Utilities/course-services";

function DashBoard() {
  const [displayedModules, setModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [state, setState] = useState(false);
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({});

  useEffect(() => {
    updateModuleList();
  }, []);
  const updateModuleList = () => {
    async function fetchData() {
      setModules(await loadModules());
    }
    fetchData();
  };
  return (
    <div className="dashboard-container">
      <NavigationB/>
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h1 className="dashboard-titulo">Bienvenido {localStorage.getItem("name_user")}!</h1>
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
            <h1>Todos los Módulos</h1>
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
