import { useEffect, useState } from "react";
import { Modal } from "reactstrap";
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
import AnuncioModal from "../Components/AnuncioModal";
import ModalAnuncios from "../Components/ModalAnuncios";
import PopUpCrearAnuncio from "../Components/PopUpCrearAnuncio";
import PopUpEditarAnuncio from "../Components/PopUpEditarAnuncio";

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
  const [announces, setAnnounces] = useState([]);

  useEffect(() => {
    const updateAnnounlist = async () => {
      setAnnounces(await loadAnnounces());
    };
    updateAnnounlist();
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

  const [modalEliminar, setModalEliminar] = useState({
    estado: false,
    id: "",
  });

  const [modalEditar, setModalEditar] = useState({
    abierto: false,
  });

  const [modalCrear, setModalCrear] = useState({
    abierto: false,
  });

  const abrirModal = (id_anuncio, tipo) => {
    let estadoModal = false;
    if (tipo === "delete") {
      estadoModal = modalEliminar.estado;
      setModalEliminar({
        estado: !estadoModal,
        id: id_anuncio,
      });
    } else if (tipo === "create") {
      estadoModal = modalCrear.abierto;
      setModalCrear({
        abierto: !estadoModal,
      });
      console.log(modalCrear.abierto);
    } else if (tipo === "update") {
      estadoModal = modalEditar.abierto;
      setModalEditar({
        abierto: !estadoModal,
      });
    }
  };

  async function eliminarAnuncio(sel) {
    if (sel === "si") {
      try {
        await DeleteAnnounces(modalEliminar.id);
        const updatedAnnounces = await loadAnnounces();
        updatedAnnounces.splice(
          updatedAnnounces.findIndex(
            (announce) => announce.AnnounceId === modalEliminar.id
          ),
          1
        );
        setAnnounces(updatedAnnounces); // Update state with updated list
        setModalEliminar({
          estado: false,
          id: "",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setModalEliminar({
        estado: false,
        id: "",
      });
    }
  }

  const updateAnnounlist = async () => {
    try {
      const updatedAnnounces = await loadAnnounces();
      setAnnounces(updatedAnnounces);
      updateAnnounlist(updatedAnnounces);
    } catch (error) {
      console.log(error);
    }
  };

  const [showModalCrear, setShowModalCrear] = useState(false);

  const handleShowModalCrear = () => {
    setShowModalCrear(true);
  };

  const handleCloseModalCrear = () => {
    setShowModalCrear(false);
    updateAnnounlist();
  };

  const [showModalEditar, setShowModalEditar] = useState(false);

  const [selectedAnnounce, setSelectedAnnounce] = useState({
    id: "",
    title: "",
    description: "",
  });

  const handleShowModalEditar = (announce) => {
    setSelectedAnnounce({
      id: announce.AnnounceId,
      title: announce.Title,
      description: announce.Message,
    });
    setShowModalEditar(true);
  };

  const handleCloseModalEditar = () => {
    setShowModalEditar(false);
    updateAnnounlist();
  };

  return (
    <div className="anuncios-container">
      <NavigationB />
      <Modal
        isOpen={modalEliminar.estado}
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "90%",
        }}
        backdrop={true}
        keyboard={true}
      >
        <div>
          <span>
            Seguro que deseas eliminar este anuncio? <br />
            <button
              onClick={() => {
                eliminarAnuncio("si");
              }}
            >
              Si
            </button>
            <button
              onClick={() => {
                eliminarAnuncio("no");
              }}
            >
              No
            </button>
          </span>
        </div>
      </Modal>
      <Modal
        isOpen={modalCrear.abierto}
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "90%",
        }}
        backdrop={true}
        keyboard={true}
      >
        <div>
          <span>modalCrear</span>
        </div>
      </Modal>
      <div className="anuncios-container-box">
        <div className="anuncios-container-controls">
          <SearchBar />
          <button
            className="anuncios-crear-button"
            onClick={handleShowModalCrear}
          >
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="anuncios-crear-icon"
            />
          </button>
          <PopUpCrearAnuncio
            show={showModalCrear}
            onHide={handleCloseModalCrear}
          />
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
                        handleShowModalEditar(announce);
                      }}
                    />
                  </button>
                  <button
                    className="announce-edit-button"
                    onClick={() => {
                      abrirModal(announce.AnnounceId, "delete");
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

          <PopUpEditarAnuncio
            show={showModalEditar}
            onHide={handleCloseModalEditar}
            announce_id={selectedAnnounce.id}
            title={selectedAnnounce.title}
            description={selectedAnnounce.description}
          />
        </div>
      </div>
    </div>
  );
}

export default Anuncios;
