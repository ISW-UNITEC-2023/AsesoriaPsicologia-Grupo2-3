import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"; // Importar Link
import Popup from "../SectionPopUp/PopUp";
import { MDBBadge } from "mdb-react-ui-kit";
import PopUpDelete from "../../components/DeletePopUp/PopUpDelete"
import PopUpDeleted from "../../components/DeletePopUp/PopUpDeleted"
import "./Card.css";


function MyCard(props) {
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

  const handleDeleteClick = (e, buttonInfo) => { // Función para abrir la ventana emergente de confirmación
    setIsDeletePopUpOpen(true); // Abre la ventana emergente de confirmación
    setSelectedButtonInfo(buttonInfo); // Guarda la información del módulo seleccionado
  };

  const handleCancelDeletePopup = () => { // Función para cerrar la ventana emergente de confirmación
    setIsDeletePopUpOpen(false);  // Cierra la ventana emergente cuando el usuario cancela
  };

  const handleConfirmDeletePopup = () => { // Función para cerrar la ventana emergente de confirmación
    setIsDeletePopUpOpen(false); // Cierra la ventana emergente cuando el usuario confirma
    setIsDeletedPopUpOpen(true); // Abre la ventana emergente de confirmación
  };

  const handleCloseDeletedPopup = () => {  // Función para cerrar la ventana emergente de confirmación
    setIsDeletedPopUpOpen(false); // Cierra la ventana emergente cuando el usuario cancela
  };
  
  return (
    <div>
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://img.freepik.com/free-vector/flat-back-school-background-with-school-supplies_23-2149452368.jpg"
        alt="School Supplies"
      />

      <Card.Body>
        <Card.Title>
          {/* Usar Link para redireccionar a /sections/ con CourseId */}
          <Link to={`/sections/${props.id}`}>{props.name}</Link>
        </Card.Title>

        <Card.Text>
          <strong>Id:</strong> {props.id}
          <br />
          <strong>Description:</strong> {props.description}
          <br />
        </Card.Text>

        <div>
          <div className="tab-container">
          <button
                  type="button"
                  className="bi bi-pencil"
                  style={{ backgroundColor: 'green', color: 'black',marginRight: "10px" }}
                  onClick={() => toggleModify(currentSectionId)}
                ></button>
          <button
                  type="button"
                  className="bi bi-trash"
                  onClick={(e) => handleDeleteClick(e, props)}
                  style={{backgroundColor: 'red', color: 'black'}}
                ></button>
          </div>
          <div className="tab-container">
            <Button
              className="tab-button"
              style={{marginLeft: '105px'}}
              onClick={() => togglePopup(props.name, props.id)}
            >
              +
            </Button>
            <Popup
              isOpen={isPopupOpen}
              onClose={() => togglePopup("", "")}
              selectedButtonInfo={selectedButtonInfo}
            />
          </div>
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
