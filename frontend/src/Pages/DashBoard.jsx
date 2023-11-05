import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";
import Popup from "../Components/PopUp";
import SectionPopUp from "../Components/SectionPopUp";
import NavigationB from "../Components/Navbar";
import SectionCard from "../Components/Card";
import { loadModules } from "../Utilities/course-services";
import { Button, Accordion } from "react-bootstrap";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookies } from "../Utilities/login-services.js";

function DashBoard() {
  const [displayedModules, setModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSectionPopupOpen, setIsSectionPopupOpen] = useState(false);
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

  const toggleSectionPopup = (CourseName, CourseId) => {
    setSelectedButtonInfo({ CourseName, CourseId });
    setSectionPopupOpen(!isSectionPopupOpen);
  };

  return (
    <div className="dashboard-container">
      <NavigationB />
      <div className="dashboard-box">
        <div className="dashboard-header flex flex-col md:flex-row justify-between">
          <h1 className="dashboard-titulo">Bienvenido !</h1>
          <div className="dashboard-buttons flex flex-row gap-2 justify-end mb-2 lg:mb-0">
            <Button
              className="button-create"
              onClick={() => setIsPopupOpen(true)}
              variant={"outline-primary"}
            >
              Nueva clase
            </Button>
          </div>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            selectedButtonInfo={selectedButtonInfo}
            onUpdateModuleList={updateModuleList}
          />
        </div>
        <div className="dashboard-body" disabled>
          <div className="information-container">
            <p className="information">
              Puede ver las secciones del curso dando click a "Entrar a Curso"
              de cualquier tarjeta o dando click en el nombre del curso.
            </p>

            <br />
            <br />
            <div className="section-card-container flex flex-row flex-wrap gap-3 center">
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
