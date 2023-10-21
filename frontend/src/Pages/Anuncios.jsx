import { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import "../Styles/CSS/Anuncios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPencil,
  faSquarePlus,
  faTrashCan,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  DeleteAnnounces,
  loadAnnounces,
} from "../Utilities/announces-services";
import NavigationB from "../Components/Navbar";
import AnuncioModal from "../Components/AnuncioModal";

function SearchBar() {
  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="anuncios-search-icon"
        />
      </button>
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

  return (
    <div className="anuncios-container">
      <NavigationB />
      <Modal isOpen={modalEliminar.estado} style={{position: "absolute", top: "10%", left: "50%", transform: "translate(-50%,-50%)", width: "90%",}} backdrop={true} keyboard={true}>
        <div>
          <span>
            Seguro que deseas eliminar este anuncio? <br />
            <button onClick={() => {eliminarAnuncio("si")}} >
              Si
            </button>
            <button onClick={() => {eliminarAnuncio("no")}} >
              No
            </button>
          </span>
        </div>
      </Modal>
      {modalCrear.abierto && (
        <AnuncioModal onClose={() => {abrirModal(0, "create")}} />
      )}
      <div className="anuncios-container-box">
        <div className="flex flex-col  sm:flex-row items-center sm:justify-between">
          <SearchBar />
          <button
            className="anuncios-crear-button lg:mt-2 sm:mt-0 ml-0 sm:ml-4"
            onClick={() => {abrirModal(0, "create")}}
          >
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="anuncios-crear-icon"
            />
          </button>
        </div>
        <div className="overflow-hidden mt-4 mr-4 ml-4 mb-2">
          {announces.map((announce) => (
            <div
              className="anuncio-item-box bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-md flex items-center space-x-4"
              key={announce.AnnounceId}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="anuncio-icon-persona h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="anuncio-item-2 min-w-0 flex-auto">
                <span className="anuncio-titulo text-sm font-semibold leading-5 text-gray-900">
                  {announce.Title}
                </span>
                <p className="anuncio-descripcion text-xs text-gray-500 line-clamp-2">
                  {announce.Message}
                </p>
              </div>
              <div className="anuncio-item-3 flex flex-row items-end md:flex-col">
                <div className="anuncios-group-button mr-3">
                  <button className="announce-edit-button">
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="anuncio-icon-button"
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
                <div className="anuncio-div-span hidden md:block lg:block">
                  <span className="text-sm leading-1 text-gray-900 font-semibold mr-1">
                    Publicado:
                  </span>
                  <a
                    className="text-sm md:text-lg lg:text-2xl"
                    style={{ whiteSpace: "nowrap" }}
                  >{`${formatDate(announce.Date)}`}</a>
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
