import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/CSS/Modulos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD:portal-administrativo/frontend/asesoria-psicologica/src/pages/Modulos/Modulos.jsx
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faAdd, faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";

import Popup from "../../components/PopUp/PopUp";
import PopUpDelete from "../../components/DeletePopUp/PopUpDelete"
import PopUpDeleted from "../../components/DeletePopUp/PopUpDeleted"
=======
// import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faAdd, faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
>>>>>>> Organizacion-Nueva:frontend/src/Pages/Modulos.jsx

import Popup from "../Components/PopUp";
import PopUpDelete from "../Components/PopUpDelete";
import PopUpDeleted from "../Components/PopUpDeleted";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModulosForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminar
  const [isDeletedPopUpOpen, setIsDeletedPopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminado
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({});
  const [modules, setModules] = useState([]);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = () => {
    axios
      .get("http://localhost:3001/modulos/all")
      .then((response) => {
        setModules(response.data);
        
      })
      .catch((error) => {
        console.error("Error al obtener los módulos:", error);
      });
  };

  const handleEntrarClick = (e, buttonInfo) => {
    e.preventDefault();
    setSelectedButtonInfo(buttonInfo);
    setIsPopupOpen(true);
  };

<<<<<<< HEAD:portal-administrativo/frontend/asesoria-psicologica/src/pages/Modulos/Modulos.jsx
  const handleDeleteClick = (e, buttonInfo) => { // Función para abrir la ventana emergente de confirmación
    e.preventDefault(); // Evita que la página se recargue
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
=======
  const handleDeleteClick = (e, buttonInfo) => {
    e.preventDefault();
    setIsDeletePopUpOpen(true);
    setSelectedButtonInfo(buttonInfo);
  };

  const handleCancelDeletePopup = () => {
    setIsDeletePopUpOpen(false);
  };

  const handleConfirmDeletePopup = () => {
    setIsDeletePopUpOpen(false);
    setIsDeletedPopUpOpen(true);
  };

  const handleCloseDeletedPopup = () => {
    setIsDeletedPopUpOpen(false);
>>>>>>> Organizacion-Nueva:frontend/src/Pages/Modulos.jsx
  };

  const cardElements = modules.map((module) => (
    
    <Col lg={4} md={6} xs={12}>
      
      <div className="card">
        <div
          className="color-box"
          style={{ backgroundColor: module.color }}
        ></div>
        <div className="card-body">
          <h5 className="card-title">{module.name}</h5>
          <p className="card-text">{module.description}</p>
          <div className="button-container">
            <a
              href="#"
              className="btn btn-entry"
              onClick={(e) => handleEntrarClick(e, module)}
            >
              Entrar
            </a>

            {/*Botón para abrir la ventana emergente de confirmación de editar*/}
            <a href="#" className="btn btn-edit">
              <FontAwesomeIcon icon={faPen} />
            </a>
            {/*Botón para abrir la ventana emergente de confirmación de eliminar*/}
<<<<<<< HEAD:portal-administrativo/frontend/asesoria-psicologica/src/pages/Modulos/Modulos.jsx
            <a href="#" className="btn btn-delete" onClick={(e) => handleDeleteClick(e, module)}>  
=======
            <a
              href="#"
              className="btn btn-delete"
              onClick={(e) => handleDeleteClick(e, module)}
            >
>>>>>>> Organizacion-Nueva:frontend/src/Pages/Modulos.jsx
              <FontAwesomeIcon icon={faTrashCan} />
            </a>

            <a href="#" className="btn btn-announcement">
              <FontAwesomeIcon icon={faAdd} />
            </a>
          </div>
        </div>
      </div>
    </Col>
  ));

  // Función para actualizar la lista de módulos después de crear uno nuevo
  const updateModuleList = () => {
    loadModules();
  };

  return (
<<<<<<< HEAD:portal-administrativo/frontend/asesoria-psicologica/src/pages/Modulos/Modulos.jsx
    <div style={{ width: '90%' }}>
=======
    <div style={{ width: "90%" }}>
>>>>>>> Organizacion-Nueva:frontend/src/Pages/Modulos.jsx
      <div className="container-header">
        <h1 className="title-modulo">Módulos</h1>
        <a
          href="#"
          className="button-create"
          onClick={() => setIsPopupOpen(true)}
        >
          Nuevo módulo
        </a>
      </div>
      <Container>{cardElements}</Container>

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          selectedButtonInfo={selectedButtonInfo}
          onUpdateModuleList={updateModuleList} // Pasa la función de actualización al Popup
        />
      )}

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

export default ModulosForm;