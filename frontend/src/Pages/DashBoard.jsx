import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";
//import Popup from "../Components/PopUp";
import NavigationB from "../Components/Navbar";
//import SectionCard from "../Components/Card";
import { loadModules } from "../Utilities/course-services";
import { Button, Accordion } from "react-bootstrap";
import DashboardLayout from "../Layout/DashboardLayout";


function DashBoard(props) {
  const [displayedModules, setModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [state, setState] = useState(false);
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({});
  const [cookies, setCookies] = useState({});
  const [cookiesLoaded, setCookiesLoaded] = useState(false);
  const nameUser=localStorage.getItem("name_user")


  useEffect(() => {
    updateModuleList();
  }, []);
  const updateModuleList = () => {
    async function fetchData() {
      const course = await loadModules();
      setModules(course.coursesInfo);
    }

    fetchData();
    
  };

  return (
    <DashboardLayout id="dashboard" pagina="Dashboard">
      <div className="dashboard-container">
        <NavigationB userData={props.userData} />
        <div className="dashboard-box">
          <div className="dashboard-header flex flex-col md:flex-row justify-between">
            <h1 className="dashboard-titulo">{`Bienvenido ${nameUser}`}</h1>
            <div className="dashboard-buttons flex flex-row gap-2 justify-end mb-2 lg:mb-0">
              <Button
                id="dashboard_nueva_clase_btn"
                className="button-create"
                onClick={() => setIsPopupOpen(true)}
                variant={"outline-primary"}
              >
                Nueva clase
              </Button>
            </div>
            {/*
                        <Popup
                            isOpen={isPopupOpen}
                            onClose={() => setIsPopupOpen(false)}
                            selectedButtonInfo={selectedButtonInfo}
                            onUpdateModuleList={updateModuleList}
                        />
                        */}
          </div>
          <div className="dashboard-body" disabled>
            <div className="information-container">
              <p className="information">
                Puede ver las secciones del curso dando click a "Entrar a Curso"
                de cualquier tarjeta o dando click en el nombre del curso.
              </p>

              <br />
              <br />
              <div
                id="dashboard_seccion_card_container"
                className="section-card-container flex flex-row flex-wrap gap-3 center"
              >
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashBoard;
