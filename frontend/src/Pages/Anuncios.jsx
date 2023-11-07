import { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import "../Styles/CSS/Anuncios.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopUpDelete from "../Components/PopUpDelete.jsx";
import PopUpDeleted from "../Components/PopUpDeleted.jsx";
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
    <div className="pt-1 relative mx-auto text-gray-600">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style={{ enableBackground: "new 0 0 56.966 56.966" }}
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
       
    </div>
  );
}

function Anuncios() {
  /**DELETE */
  const [title, setTitle] = "";
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminar
  const [isDeletedPopUpOpen, setIsDeletedPopUpOpen] = useState(false); // Estado para abrir la ventana emergente de confirmación de eliminado
  const [announces, setAnnounces] = useState([]);

  const handleCancelDeletePopup = () => {
    // Función para cerrar la ventana emergente de confirmación
    setIsDeletePopUpOpen(false); // Cierra la ventana emergente cuando el usuario cancela
  };

  const handleConfirmDeletePopup = async () => {
    try {
      handleCancelDeletePopup();
      updatedAnnounces.splice(
        updatedAnnounces.findIndex(
          (announce) => announce.id_announcement === modalEliminar.id
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
  };

  useEffect(() => {
    const updateAnnounlist = async () => {
      setAnnounces((await loadAnnounces()).announcementsInfo);
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

  const updateAnnounlist = async () => {
    try {
      setAnnounces((await loadAnnounces()).announcementsInfo);
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
    id_announcement: "",
    title_announcement: "",
    message_announcement: "",
  });

  const handleShowModalEditar = (announce) => {
    setSelectedAnnounce({
      id_announcement: announce.id_announcement,
      title_announcement: announce.title_announcement,
      message_announcement: announce.message_announcement,
    });
    setShowModalEditar(true);
  };

  const handleShowModalEliminar = (announce) => {
    setSelectedAnnounce({
      id_announcement: announce.id_announcement,
      title_announcement: announce.title_announcement,
      message_announcement: announce.message_announcement,
    });

    setIsDeletePopUpOpen(true);
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
        {}
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
      <div className="anuncios-container-box ">
        <div
          className="flex lg:flex-row items-center "
          style={{
            backgroundColor: "#ffffff",
            height: "7rem",
            justifyContent: "space-between",
          }}
        >
          <h1 className="title-anuncios">Anuncios</h1>
          {/**  <SearchBar />*/}
          <button
            className="anuncios-crear-button"
            onClick={handleShowModalCrear}
          >
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="anuncios-crear-icon"
            />
            <p>Crear Anuncio</p>
          </button>
          <PopUpCrearAnuncio
            show={showModalCrear}
            onHide={handleCloseModalCrear}
          />
        </div>
        <div className="overflow-hidden mt-4 mr-4 ml-4 mb-2">
          {console.log("anuncios ",announces)}
          {Array.isArray(announces) ? announces.map((announce) => (
            <div
              className="anuncio-item-box bg-white mt-2 rounded-lg p-4 sm:p-6 lg:p-8 shadow-md flex items-center"
              key={announce.id_announcement}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="anuncio-icon-persona h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="anuncio-item-2 min-w-0 flex-auto">
                <span className="anuncio-titulo font-semibold leading-5 text-gray-900">
                  {announce.title_announcement}
                </span>
                <p className="anuncio-descripcion text-gray-500 ">
                  {announce.message_announcement}
                </p>
                <span className="text-sm leading-1 text-gray-400 font-semibold">
                  Publicado: 
                  <a style={{ whiteSpace: "nowrap", color: "#9ca3af" }}>
                    {` ${formatDate(announce.creation_date)}`}
                  </a>
                </span>
              </div>
              <div className="anuncio-item-3 flex  md:flex-col lg:flex-col justify-center">
                <div className="anuncios-group-button">
                  <DropdownButton
                    align="end"
                    title="Más acciones"
                    id="dropdown-menu-align-end"
                  >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => {
                        handleShowModalEditar(announce);
                      }}
                      className="dropdown-editar"
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="anuncio-icon-button"
                      />{" "}
                      Editar Anuncio
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      eventKey="4"
                      className="dropdown-eliminar"
                      type="button"
                      onClick={(e) => handleShowModalEliminar(announce)}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="anuncio-icon-button"
                      />{" "}
                      Eliminar Anuncio
                    </Dropdown.Item>
                  </DropdownButton>

                  <button></button>
                </div>
                <div className="anuncio-div-span hidden md:block lg:block"></div>
              </div>
            </div>
          )) :
          (<>No hay anuncios para mostrar</>)
          }

          <PopUpEditarAnuncio
            show={showModalEditar}
            onHide={handleCloseModalEditar}
            announce_id={selectedAnnounce.id_announcement}
            title={selectedAnnounce.title_announcement}
            description={selectedAnnounce.message_announcement}
          />

          <PopUpDelete
            isOpen={isDeletePopUpOpen}
            onCancel={handleCancelDeletePopup}
            pageName="anuncios"
            announceId={selectedAnnounce.id_announcement}
            itemName={selectedAnnounce.title_announcement}
            onConfirm={handleConfirmDeletePopup}
          />
        </div>
      </div>

      {isDeletedPopUpOpen && (
        // Pasa la información del módulo seleccionado y la función de confirmación al PopUp
        <PopUpDeleted isOpen={isDeletedPopUpOpen} pageName="anuncios" />
      )}
    </div>
  );
}

export default Anuncios;
