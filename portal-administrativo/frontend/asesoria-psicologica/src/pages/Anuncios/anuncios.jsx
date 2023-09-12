import React from "react";
import { Row, Col } from "react-bootstrap";
import "./anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ComboBox() {
  return <select className="custom-combobox">{}</select>;
}

function SearchBar() {
  return (
    <input type="text" placeholder="Buscar..." className="custom-searchbar" />
  );
}

function Anuncios() {
  // Función para manejar el clic en "Editar anuncio"
  const handleEditClick = () => {
    // Coloca aquí la lógica para editar el anuncio
    console.log("Editar anuncio");
  };

  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-pacientes">Anuncios</h1>
        <a
          href="#"
          className="button-create"
          onClick={() => {
            // Coloca aquí el enlace a la creación de anuncios
            console.log("Redireccionar a la creación de anuncios");
          }}
        >
          + Anuncios
        </a>
      </div>
      <div className="container-controls">
        <Row>
          <Col md={4} lg={5}>
            <ComboBox />
          </Col>
          <Col md={4} lg={7}>
            <SearchBar />
          </Col>
        </Row>
      </div>
      <ul>
        <li>
          <div
            className="nombre-box"
            style={{
              display: "flex",
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
            <div>
              <span className="titulo">{"Titulo"}</span>
              <p className="descripcion">{"Descripción del anuncio"}</p>
            </div>
            <div
              className="ml-auto"
              style={{ alignSelf: "flex-end", marginLeft: "auto" }}
            >
              <DropdownButton id="dropdown-item-button">
                <Dropdown.Item as="button">Editar</Dropdown.Item>
                <Dropdown.Item as="button">Eliminar</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Anuncios;
