import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";
import NavigationB from "../Components/Navbar";
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
  const [selectedFile, setSelectedFile] = useState(null);


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
          </div>
          <div className="information-container">
            <div className="information">
          
            </div>
            <div>
              <div className="quick-access-text">Acceso rápido al contenido</div>
              <div className="dashed-line"></div>
              <div className="button-container">
                <button className="quick-access-button">Botón 1</button>
                <button className="quick-access-button">Botón 2</button>
                <div className="dropdown">
                  <button className="quick-access-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Opción 1</a>
                    <a className="dropdown-item" href="#">Opción 2</a>
                    <a className="dropdown-item" href="#">Opción 3</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

  

export default DashBoard;
