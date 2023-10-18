import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "../Styles/CSS/Anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {loadAnnounces ,DeleteAnnounces} from "../Utilities/announces-services"
import NavigationB from "../Components/Navbar"

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

  const handleCreateClick = () => {
    localStorage.setItem("Title","");
    localStorage.clear();

    navigate("/Crearanuncios");
    console.log("Crear anuncio");
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
    localStorage.setItem("Title","");

    async function fetchData() {
      setAnnounces(await loadAnnounces());
    }
    fetchData();
  };

  return (
    <div className="anuncios-container">
      <NavigationB/>
      <div className="anuncios-container-box">
        <div className="anuncios-container-header">
          <h1 className="anuncios-title-pacientes">Anuncios</h1>
          <a
            className="anuncios-button-create"
            onClick={() => {handleCreateClick();}}
          >
            + Anuncios
          </a>
        </div>
        <div className="anuncios-container-controls">
          <Row>
            <Col md={4} lg={5}>
              <ComboBox />
            </Col>
            <Col md={4} lg={7}>
              <SearchBar />
            </Col>
          </Row>
        </div>
        <div style={{marginTop:'3vh'}}>
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
                      <span className="anuncio-titulo">{announce.Title}</span>
                      <p className="anuncio-descripcion">{announce.Message}</p>
                    </div>
                    <div
                      className="ml-auto"
                      style={{ alignSelf: "flex-end", marginLeft: "auto" }}
                    >
                    <DropdownButton id="anuncios-dropdown-item-button">
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
      </div>
    </div>
  );
}

export default Anuncios;
