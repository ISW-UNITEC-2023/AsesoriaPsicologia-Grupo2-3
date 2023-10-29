import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom"; // Importar Link
import Popup from "./PopUp.jsx";
import PopUpDelete from "../Components/PopUpDelete.jsx";
import PopUpDeleted from "../Components/PopUpDeleted.jsx";
import { deleteModule } from "../Utilities/course-services.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "../Styles/CSS/Card.css";

function MyCard({ props, handleReload }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Use the navigate function to navigate to the specified URL.
    navigate(`/Secciones?course_id=${props.id}`);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminar
  const [isDeletedPopUpOpen, setIsDeletedPopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminado
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({
    CourseName: "",
    SectionId: "",
    CourseId: "",
    TeacherId: "",
  });

  const togglePopup = (CourseName, CourseId) => {
    setSelectedButtonInfo({ CourseName, CourseId });
    setPopupOpen(!isPopupOpen);
  };

  const handleDeleteClick = (e, buttonInfo) => {
    // Función para abrir la ventana emergente de confirmación
    setIsDeletePopUpOpen(true); // Abre la ventana emergente de confirmación
    setSelectedButtonInfo(buttonInfo); // Guarda la información del módulo seleccionado
  };

  const handleCancelDeletePopup = () => {
    // Función para cerrar la ventana emergente de confirmación
    setIsDeletePopUpOpen(false); // Cierra la ventana emergente cuando el usuario cancela
  };

  const handleConfirmDeletePopup = async (moduleId) => {
    try {
      await deleteModule(moduleId);
      setIsDeletePopUpOpen(false); // Cierra la ventana emergente cuando el usuario confirma
      setIsDeletedPopUpOpen(true); // Abre la ventana emergente de confirmación
    } catch (error) {
      console.error("Error deleting Module:", error);
    }
  };

  const handleCloseDeletedPopup = () => {
    // Función para cerrar la ventana emergente de confirmación
    setIsDeletedPopUpOpen(false); // Cierra la ventana emergente cuando el usuario cancela
    handleReload();
  };

  return (
    <div>
      <Card className="modulo-card">
        <Card.Img
          variant="center"
          className="card-image-module"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHCAgIBgcGBgcHCAoHBgYHBg8ICRAKFREWFhURExMYHCggGBolJx8TITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NFQ0NDisdHxkrKzcrKysrKysrKystKy0tKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQMG/8QAFRABAQAAAAAAAAAAAAAAAAAAAAH/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAgMBBQcG/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AORAfnX2UABAFRyoAuIogNIilRUXE0RUXEURUaRFAFxNEBpEUAUkAAAAAAAAAAAAAAABuA8N6wACAKjlQBcRUAaRFKgLiaItRpEURUXEUAaRFQBcRQBTgAAAAAAAAAAAAAAADcB4b1gAEAVE1AFxNQBpEVAGkRRFRcRSoqLiaAVpEVAFxFAFOAAAAAAAAAAAAAAAANwHhvWEVKABVxNQBcRUAaRNQBcRRAXEUAaRKFCriKgDSIoA64AAAAAAAAAAAAAAAA3AeG9YSqlAKJVxNAFxFQBpEVAFxNKio0iKCC4ihQaRNQBcRQB1wAAAAAAAAAAAAAAABuA8N6wioQEqouJoUGkRUAq4ioAuJqANIiiAuIoA0iagC4igDrgAAAAAAAAAAAAAAADcB4b1hFQgIqLiaAjSIoUKuIqANIioA0iKgC4miKi4igC4kAdcAAAAAAAAAAAAAAAAbgPDesIqOxwRUXE0RUXEUKDSJqFBcRUAaRFQBcTRFRpEUAXEgA4AAAAAAAAAAAAAAAA3AeG9YQHY4IqLiaIqNIiiKi4mgC4ioA0iKgC4mlRajSIoAuIAAAAAAAAAAAAAAAAAAbgPDeslCjscEVFxNEVGkRRFRcRQCtImoAuIqALiKVFqNImgC4gAAAAAAAAAAAAAAAAABuA8N6yUB2OVKA0iaIC4iiAuIoINIigguIoA0iaIC4igC0gAAAAAAAAAAAAAAAAAP//Z"
          alt="Card background"
        />
        <Card.Body>
          <Card.Title>
            <Link to={`/Secciones?course_id=${props.id}`}>{props.name}</Link>
          </Card.Title>
          <Card.Text className="text-container-dashboard">
            <p>
              <strong>Id:</strong> {props.id}
            </p>
            <p>
              <strong>Description:</strong> {props.description}
            </p>
          </Card.Text>
          <div>
            <div
              className="cta-container"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Dropdown as={ButtonGroup}>
                <Button
                  className="entrar-curso-btn"
                  variant="success"
                  onClick={(e) => handleButtonClick()}
                >
                  Entrar a Curso
                </Button>

                <Dropdown.Toggle
                  split
                  variant="success"
                  id="dropdown-split-basic"
                  title={"Más acciones"}
                  className="dropdown-curso"
                />

                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="1"
                    type="button"
                    className="dropdown-editar"
                    onClick={() => toggleModify(currentSectionId)}
                  >
                    <FontAwesomeIcon icon={faPencil} /> Editar Curso
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="1"> Crear Sección</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="4"
                    type="button"
                    className="dropdown-eliminar"
                    onClick={(e) => handleDeleteClick(e, props)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar Curso
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* <div className="tab-container">
              <Button
                className="tab-button"
                style={{ marginLeft: "80px", width: "40%" }}
                onClick={() => togglePopup(props.name, props.id)}
              >
                +
              </Button>
              <Popup
                isOpen={isPopupOpen}
                onClose={() => togglePopup("", "")}
                selectedButtonInfo={selectedButtonInfo}
              />
            </div> */}
          </div>
        </Card.Body>
      </Card>

      {isDeletePopUpOpen && (
        // Pasa la información del módulo seleccionado y la función de confirmación al PopUp
        <PopUpDelete
          isOpen={isDeletePopUpOpen}
          onConfirm={handleConfirmDeletePopup}
          onCancel={handleCancelDeletePopup}
          itemName={selectedButtonInfo.name}
          moduleId={selectedButtonInfo.id}
          pageName="modulo"
        />
      )}

      {isDeletedPopUpOpen && (
        // Pasa la información del módulo seleccionado y la función de confirmación al PopUp
        <PopUpDeleted
          isOpen={isDeletedPopUpOpen}
          onClose={handleCloseDeletedPopup}
          pageName="modulo"
        />
      )}
    </div>
  );
}

export default MyCard;
