import {React, useState, useEffect } from 'react';
import axios from "axios";
import "../Styles/CSS/Modulos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Popup from "../Components/PopUp.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModulosForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    <div style={{width:'90%'}}>
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
    </div>
  );
}

export default ModulosForm;
