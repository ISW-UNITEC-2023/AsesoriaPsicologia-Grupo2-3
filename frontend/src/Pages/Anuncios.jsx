import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "../Styles/CSS/Anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  loadAnnounces,
  DeleteAnnounces,
} from "../Utilities/announces-services";
import NavigationB from "../Components/Navbar";
import { Modal } from "react-bootstrap";
import AnunciosCrear from "./AnunciosCrear";

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
    localStorage.setItem("Title", "");
    localStorage.clear();

    navigate("/Crearanuncios");
    console.log("Crear anuncio");
  };

  async function handleEditClick2(id) {
    try {
      //console.log(id);
      await DeleteAnnounces(id);
      // como refrescar la pantalla luego de eliminar un anuncio
    } catch (error) {
      console.log(error);
    }
  }

  const [announces, setAnnounces] = useState([]);

  useEffect(() => {
    updateAnnounlist();
  }, []);

  const updateAnnounlist = () => {
    localStorage.setItem("Title", "");
    async function fetchData() {
      setAnnounces(await loadAnnounces());
    }
    fetchData();
  };

  const formatDate = (announceDate) => {
    var date = new Date(announceDate);
    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    var formattedDate = date.toLocaleString('es-ES', options);
    return formattedDate;
  }

  return (
    <div className="anuncios-container">
      <NavigationB />
      <div className="anuncios-container-box">
        <div className="anuncios-container-controls">
          <SearchBar />
        </div>
        <div className="anuncios-show-box">
          {announces.map((announce) => (
              
              <div className="anuncio-item-box">
                <FontAwesomeIcon icon={faUserCircle} className="anuncio-icon-persona" />
                <div className="anuncio-item-2">
                  <span className="anuncio-titulo">{announce.Title}</span>
                  <p className="anuncio-descripcion">{announce.Message}</p>
                </div>
                <div className="anuncio-item-3">
                  <div className="anuncios-group-button">
                    <button className="announce-edit-button">
                      <FontAwesomeIcon icon={faPencil} className="anuncio-icon-button" />
                    </button>
                    <button className="announce-edit-button">
                      <FontAwesomeIcon icon={faTrashCan} className="anuncio-icon-button" />
                    </button>
                  </div>
                  <div className="anuncio-div-span">
                    <span>Publicado el:</span>
                    <a>{formatDate(announce.Date)}</a>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Anuncios;
