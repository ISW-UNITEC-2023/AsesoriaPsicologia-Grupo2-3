import React from "react";
import { Row, Col } from "react-bootstrap";
import "./anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function ComboBox() {
  return <select className="custom-combobox">{}</select>;
}

function SearchBar() {
  return (
    <input type="text" placeholder="Buscar..." className="custom-searchbar" />
  );
}

function Anuncios() {
  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-pacientes">Anuncios</h1>
        <a
          href="#"
          className="button-create"
          onClick={"Colocar el link a la creacion de anuncios aqui"}
        >
          + Anuncios
        </a>
      </div>
      <div className="container-controls">
        <Row>
          <Col md={4} lg={5}>
            <ComboBox />
          </Col>
          <Col md={4} lg={6}>
            <SearchBar />
          </Col>
        </Row>
      </div>
      <ul>
        <li>
          <div className="nombre-box">
            <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
            <div>
              <span className="titulo">{"Titulo"}</span>
              <p className="descripcion">{"Descriprcion del anuncio"}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Anuncios;
