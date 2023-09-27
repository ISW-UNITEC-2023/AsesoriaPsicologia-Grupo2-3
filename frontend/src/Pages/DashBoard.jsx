 import Container from "react-bootstrap/Container";
// import SideVar from "../Components/SideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";

import Popup from "../Components/PopUp";
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
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-modulo">Módulos</h1>
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
      <Container>
        <div style={{}}>
          <h1>TABLERO</h1>
          <Row>
            {displayedModules.map((module) => (
              <Col lg>
                <br></br>
                <SectionCard props={module} handleReload={() => setState(true)} />
                <br></br>
                
              </Col>
            ))}
          </Row>

        </div>
      </Container>
    </div>
  );
}

export default DashBoard;
