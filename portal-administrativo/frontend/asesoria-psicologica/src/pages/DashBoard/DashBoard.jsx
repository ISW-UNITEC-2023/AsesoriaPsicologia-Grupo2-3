import Container from "react-bootstrap/Container";
import SideVar from "../../components/SideBar/SideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DashBoard.css";
import { useEffect, useState } from "react";

import Popup from "../../components/PopUp/PopUp";
import SectionCard from "../../components/Card/Card";
import { loadModules } from "../../Services/course";
import PopUpDelete from "../../components/DeletePopUp/PopUpDelete"
import PopUpDeleted from "../../components/DeletePopUp/PopUpDeleted"

function DashBoard() {
  const [displayedModules, setModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminar
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
                <SectionCard {...module} />
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
