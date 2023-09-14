import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {loadAnnounces ,DeleteAnnounces} from "../../Services/announces"

function ComboBox() {
  return <select className="custom-combobox">{}</select>;
}

function SearchBar() {
  return (
    <input type="text" placeholder="Buscar..." className="custom-searchbar" />
  );
}

function Anuncios() {
  const navigate = useNavigate();
  // Función para manejar el clic en "Editar anuncio"
  const handleEditClick = (title, message) => {
    localStorage.setItem("Title", title);
    localStorage.setItem("Message", message);

    navigate("/Crearanuncios");
    console.log("Editar anuncio");
  };

  async function handleEditClick2  (id)  {
    try {
      //console.log(id);
      await DeleteAnnounces(id);
      // como refrescar la pantalla luego de eliminar un anuncio
    } catch (error) {
      console.log(error);
    }
    
  };

  const [announces, setAnnounces] = useState([]);

  useEffect(() => {
    updateAnnounlist();
    
  }, []);

  const updateAnnounlist = () => {
    async function fetchData() {
      setAnnounces(await loadAnnounces());
    }
    fetchData();
  };

  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-pacientes">Anuncios</h1>
        <a
          href="/Crearanuncios"
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
        {announces.map((announce) => (
          <>
              <li>
                <div
                  className="nombre-box"
                  style={{
                    display: "flex",
                  }}
                >
                  <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />

                <div>
                  <span className="titulo">{announce.Title}</span>
                  <p className="descripcion">{announce.Message}</p>
                </div>
                <div
                  className="ml-auto"
                  style={{ alignSelf: "flex-end", marginLeft: "auto" }}
                >
                <DropdownButton id="dropdown-item-button">
                  
                    <Dropdown.Item  as="button" href="/Crearanuncios" onClick={() => {
                      handleEditClick(`${announce.Title}`, `${announce.Message}`);
                      }}   >Editar</Dropdown.Item>
                  
                  <Dropdown.Item as="button"onClick={() => {
                      handleEditClick2(`${announce.AnnounceId}`);
                      
                      }}  >Eliminar</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </li>
          </>
        ))}
        
      </ul>
    </div>
  );
}

export default Anuncios;
