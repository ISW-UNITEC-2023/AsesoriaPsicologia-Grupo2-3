import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/CSS/Anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPencil,
  faSquarePlus,
  faTrashCan,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  DeleteAnnounces,
  loadAnnounces,
} from "../Utilities/announces-services";
import NavigationB from "../Components/Navbar";
import ModalAnuncios from "../Components/ModalAnuncios";
import { GetSections } from "../Utilities/section-services";

function SearchBar() {
  return (
    <div className="custom-searchbar">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="anuncio-icon-button"
      />
      <input
        type="text"
        placeholder="Buscar ..."
        className="input-search-box"
      />
    </div>
  );
}

function Anuncios() {
  const modalStyle = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "90%",
  };

  const [announces, setAnnounces] = useState([]);

  useEffect(() => {
    const updateAnnounlist = async () => {
      setAnnounces(await loadAnnounces());
    };
    updateAnnounlist();
  }, []);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function getSections() {
      try {
        const response = await GetSections();
        setSections(response);
      } catch (error) {
        console.log(error);
      }
    }
    getSections();
  }, []);

  const formatDate = (announceDate) => {
    var date = new Date(announceDate);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    var formattedDate = date.toLocaleString("es-ES", options);
    return formattedDate;
  };

  const [estadoModals, setEstadoModals] = useState({
    id: null,
    eliminar: false,
    editar: false,
    crear: false,
    title: "",
    message: "",
    mode: "",
    sections: [],
    section_id: 0,
  });

  const abrirModal = (id_anuncio, title, message, tipo) => {
    let estadoModal = false;
    if (tipo === "delete") {
      estadoModal = estadoModals.eliminar;
      setEstadoModals({
        eliminar: !estadoModal,
        id: id_anuncio,
      });
    } else if (tipo === "create") {
      estadoModal = estadoModals.crear;
      setEstadoModals({
        crear: !estadoModal,
        mode: "create",
        title: "",
        message: "",
        sections: sections,
      });
    } else if (tipo === "update") {
      estadoModal = estadoModals.editar;
      setEstadoModals({
        editar: !estadoModal,
        mode: "update",
        id: id_anuncio,
        title: title,
        message: message,
        sections: sections,
      });
    }
  };

  async function eliminarAnuncio(sel) {
    if (sel === "si") {
      try {
        await DeleteAnnounces(estadoModals.id);
        const updatedAnnounces = await loadAnnounces();
        updatedAnnounces.splice(
          updatedAnnounces.findIndex(
            (announce) => announce.AnnounceId === estadoModals.id
          ),
          1
        );
        setAnnounces(updatedAnnounces); // Update state with updated list
        setEstadoModals({
          eliminar: false,
          id: "",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setEstadoModals({
        eliminar: false,
        id: "",
      });
    }
  }

  return (
    <div className="anuncios-container">
      <NavigationB />
      <Modal isOpen={estadoModals.eliminar} style={modalStyle} backdrop={true} keyboard={true} >
        <ModalHeader closeButton>
          <h3>Eliminar Anuncio</h3>
        </ModalHeader>
        <ModalBody>
          <p>¿Está seguro que desea eliminar el anuncio?</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => {eliminarAnuncio("si")}}>
            Sí
          </button>
          <button className="btn btn-secondary" onClick={() => eliminarAnuncio("no")}>
            No
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModals.crear} style={modalStyle} backdrop={true} keyboard={true}>
        <ModalAnuncios {...estadoModals}/>
      </Modal>
      <Modal isOpen={estadoModals.editar} style={modalStyle} backdrop={true} keyboard={true} >
        <ModalAnuncios {...estadoModals} />
      </Modal>
      <div className="anuncios-container-box">
        <div className="anuncios-container-controls">
          <SearchBar />
          <button
            className="anuncios-crear-button"
            onClick={() => {
              abrirModal(0, "", "", "create");
            }}
          >
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="anuncios-crear-icon"
            />
          </button>
        </div>
        <div className="anuncios-show-box">
          {announces.map((announce) => (
            <div className="anuncio-item-box" key={announce.AnnounceId}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="anuncio-icon-persona"
              />
              <div className="anuncio-item-2">
                <span className="anuncio-titulo">{announce.Title}</span>
                <p className="anuncio-descripcion">{announce.Message}</p>
              </div>
              <div className="anuncio-item-3">
                <div className="anuncios-group-button">
                  <button className="announce-edit-button">
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="anuncio-icon-button"
                      onClick={() => {
                        abrirModal(announce.AnnounceId, announce.Title, announce.Message, "update");
                      }}
                    />
                  </button>
                  <button
                    className="announce-edit-button"
                    onClick={() => {
                      abrirModal(announce.AnnounceId, "", "", "delete");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="anuncio-icon-button"
                    />
                  </button>
                </div>
                <div className="anuncio-div-span">
                  <span className="text-sm">Publicado:</span>
                  <a className="text-sm">{`${formatDate(announce.Date)}`}</a>
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
