import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"; // Importar Link
import Popup from "./PopUp.jsx";
import PopUpDelete from "../Components/PopUpDelete.jsx";
import PopUpDeleted from "../Components/PopUpDeleted.jsx";
import { deleteModule } from "../Utilities/course-services.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Styles/CSS/Card.css";

function MyCard({ props, handleReload }) {
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
          variant="top"
          className="card-image-module"
          src="https://img.freepik.com/free-vector/flat-back-school-background-with-school-supplies_23-2149452368.jpg"
          alt="School Supplies"
        />
        <Card.Body>
          <Card.Title>
            <Link className="card-title-module" to={`/Secciones?course_id=${props.id}`}>{props.name}</Link>
          </Card.Title>
          <Card.Text>
            <strong>Id:</strong> {props.id}
            <br />
            <strong>Description:</strong> {props.description}
            <br />
          </Card.Text>
          <div>
            <div className="tab-container" style={{ display: "flex" }}>
              <button
                type="button"
                className="bi bi-pencil"
                onClick={() => toggleModify(currentSectionId)}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                type="button"
                className="bi bi-trash"
                onClick={(e) => handleDeleteClick(e, props)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
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
