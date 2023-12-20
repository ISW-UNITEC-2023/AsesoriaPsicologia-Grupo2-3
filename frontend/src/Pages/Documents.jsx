//Components
import React, { useEffect, useState } from "react";
import NavigationB from "../Components/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Services from "../Utilities/documents-services";
import PopupViewer from "../Components/PopupViewer";
import { toast, ToastContainer } from "react-toastify";
import { OverlayTrigger, Tooltip as BootstrapTooltip } from "react-bootstrap";

//Items
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEye,
  faTrash,
  faCloudArrowUp,
  faFileLines,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

//Styles
import "../Styles/CSS/Documents.css";
import imgNotFound from "../Styles/Images/Filing-system.gif"

function Documents(props) {
  function havePrivilege(privilege) {
    if (privilege) {
      return props.verifyRef.current.privileges.includes(privilege);
    } else {
      return false;
    }
  }
  const { id_file, userData } = useLocation().state;
  const [allArchivos, setAllArchivos] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPreviews, setSelectedPreviews] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadFile, setUploadFile] = useState(false);
  const [openModal, setOpenModal] = useState({
    open: false,
    file: null,
    type: "",
  });

  //Cargar archivos
  useEffect(() => {
    cargarArchivos();
  }, []);

  const cargarArchivos = async () => {
    try {
      const response = await Services.getDocumentId(id_file);

      if (Array.isArray(response)) {
        setAllArchivos(response);
      } else {
        console.error(
          'La propiedad "archivos" no está presente en la respuesta:',
          response
        );
      }
    } catch (error) {
      console.error("Error al cargar la lista de archivos", error);
    }
  };

  //Filtrar archivos
  useEffect(() => {
    filtrarArchivos(allArchivos, searchTerm);
  }, [searchTerm, allArchivos]);

  const filtrarArchivos = (archivosToFilter, term) => {
    const filteredArchivos = archivosToFilter.filter((file) => {
      const matchesSearchTerm = file.document_name
        .toLowerCase()
        .includes(term.toLowerCase());
      return matchesSearchTerm;
    });

    setArchivos(filteredArchivos);
  };

  //Manejo subir archivo
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const previews = [...selectedPreviews];

    if (selectedFiles.length + files.length > 5) {
      toast.warn("Solo se permiten como máximo 5 archivos", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = Uint8Array.from(
          atob(reader.result.split(",")[1]),
          (c) => c.charCodeAt(0)
        ).buffer;

        const blob = new Blob([arrayBuffer], { type: files[i].type });
        const file = {
          id_document: null,
          document_name: files[i].name,
          document_size: files[i].size,
          document_type: files[i].type,
          buffer: blob,
        };

        previews.push(reader.result);
        setSelectedPreviews(previews);
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const previews = [...selectedPreviews];

    if (selectedFiles.length + files.length > 5) {
      toast.warn("Solo se permiten como máximo 5 archivos", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = Uint8Array.from(
          atob(reader.result.split(",")[1]),
          (c) => c.charCodeAt(0)
        ).buffer;

        const blob = new Blob([arrayBuffer], { type: files[i].type });
        const file = {
          id_document: null,
          document_name: files[i].name,
          document_size: files[i].size,
          document_type: files[i].type,
          buffer: blob,
        };

        previews.push(reader.result);
        setSelectedPreviews(previews);
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const removeFile = (file) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
  };

  const subirArchivo = async () => {
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append("id_file", id_file);
        formData.append("user_creator", userData.user_data.id_user);
        formData.append("id_document", selectedFiles[i].id_document);
        formData.append("document_name", selectedFiles[i].document_name);
        formData.append("document_size", selectedFiles[i].document_size);
        formData.append("document_type", selectedFiles[i].document_type);
        formData.append("archivo", selectedFiles[i].buffer);
        await Services.uploadFile(formData);
      }

      setUploadFile(false);
      setSelectedFiles([]);
      cargarArchivos();
      toast.success("¡Archivos subidos exitosamente!", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error al subir los archivos:", error);
      toast.error("¡Hubo un error al subir los archivos!", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //cambiar nombre
  const editarNombre = async (file, nuevoNombre) => {
    try {
      const extension = file.document_type.split("/")[1];
      const nuevaRuta = `${nuevoNombre}.${extension}`;
      await Services.updateDocumentName(
        file.id_document,
        nuevaRuta,
        userData.user_data.id_user
      );
      cargarArchivos();
    } catch (error) {
      console.error("Ocurrió un error al intentar editar el nombre:", error);
    }
  };

  //eliminar archivo
  const eliminarArchivo = async (file) => {
    await Services.deleteDocument(file.id_document);
    cargarArchivos();
  };

  const ModalDelEdit = () => {
    const { open, file, type } = openModal;
    const [nombre, setNombre] = useState("");
    const handleEdit = (e) => {
      const nuevoNombre = e.target.value;
      setNombre(nuevoNombre);
    };
    if (type === "edit") {
      const partesNombreArchivo = file.document_name.split(".");
      const extension = partesNombreArchivo[partesNombreArchivo.length - 1];
      const nombreSinExtension = file.document_name.replace(
        `.${extension}`,
        ""
      );
      if (nombre === "") {
        setNombre(nombreSinExtension);
      }
    }

    return (
      <Modal
        show={open}
        onHide={() => {
          setOpenModal({
            open: false,
          });
        }}
        dialogClassName="modal-delete-file"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {type === "delete"
              ? "Eliminar Archivo"
              : "Editar Nombre de Archivo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === "delete" ? (
            <p>¿Está seguro de que desea eliminar este archivo?</p>
          ) : (
            <div className="edit-doc-modal">
              <p>Ingrese un nuevo nombre</p>
              <input value={nombre} onChange={(e) => handleEdit(e)}></input>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {type === "delete" ? (
            <button
              onClick={() => {
                eliminarArchivo(file);
                setOpenModal({
                  open: false,
                });
              }}
              className="confirm-delete-button"
            >
              Eliminar
            </button>
          ) : (
            <button
              onClick={() => {
                editarNombre(file, nombre);
                setOpenModal({
                  open: false,
                });
              }}
              className="confirm-delete-button"
            >
              Editar
            </button>
          )}
          <button
            onClick={() => {
              setOpenModal({
                open: false,
              });
            }}
            className="cancel-delete-button"
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    );
  };
  //Convertir size del archivo
  const convertSize = (size) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (size === 0) {
      return "0 Byte";
    }
    const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
    return Math.round(size / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  //Formato fecha
  const formatDate = (filedate) => {
    const date = new Date(filedate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("es-ES", options);
  };

  return (
    <div className="document-db-container">
      <NavigationB userData={props.userData} />
      <div className="document-list-box">
        <div className="visualization-header">
          <h1 className="document-title">Documentos</h1>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {
            havePrivilege(65) &&
            <button
              onClick={() => {
                setUploadFile(true);
              }}
              className="upload-file-button"
            >
              Subir Archivo
            </button>
          }
        </div>
        <div className="visualization-container">
          {
            havePrivilege(66) ?
              <div className="archivo-visualizador-container">
                {archivos.length > 0 ? (
                  <ListGroup className="archivo-visualizador-title-list">
                    {archivos.map((file) => {
                      return (
                        <ListGroup.Item
                          key={file.id_document}
                          className="archivo-box"
                        >
                          <div className="archivo-info">
                            <span className="archivo-visualizador-title">
                              {file.document_name}
                            </span>
                            <span className="archivo-visualizador-size">
                              Fecha de creación: {formatDate(file.creation_date)}
                            </span>
                            <span className="archivo-visualizador-size">
                              Tamaño: {convertSize(file.document_size)}
                            </span>
                          </div>
                          <div className="archivo-actions">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <BootstrapTooltip
                                  id={`view-tooltip-${file.id_document}`}
                                >
                                  Ver archivo
                                </BootstrapTooltip>
                              }
                            >
                              <FontAwesomeIcon
                                className="archivo-visualizador-button"
                                icon={faEye}
                                onClick={() => {
                                  setSelectedFile(file);
                                }}
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <BootstrapTooltip
                                  id={`edit-tooltip-${file.id_document}`}
                                >
                                  Editar Nombre de Archivo
                                </BootstrapTooltip>
                              }
                            >
                              <FontAwesomeIcon
                                className="archivo-visualizador-button"
                                icon={faPencil}
                                onClick={() =>
                                  setOpenModal({
                                    open: true,
                                    type: "edit",
                                    file: file,
                                  })
                                }
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <BootstrapTooltip
                                  id={`delete-tooltip-${file.id_document}`}
                                >
                                  Borrar archivo
                                </BootstrapTooltip>
                              }
                            >
                              <FontAwesomeIcon
                                className="archivo-visualizador-button"
                                icon={faTrash}
                                onClick={() =>
                                  setOpenModal({
                                    open: true,
                                    type: "delete",
                                    file: file,
                                  })
                                }
                              />
                            </OverlayTrigger>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <div className="no-files-found">
                    <img src={imgNotFound} alt="No se encontraron archivos" />
                    <span>No se encontraron archivos</span>
                  </div>
                )}
                {selectedFile && (
                  <PopupViewer
                    file={selectedFile}
                    onClose={() => setSelectedFile(null)}
                  />
                )}
                <ModalDelEdit />
                <Modal
                  show={uploadFile}
                  onClose={() => {
                    setUploadFile(false);
                    setArchivos(null);
                  }}
                  dialogClassName="modal-upload-file"
                >
                  <div className="modal-upload-header">
                    <h2 className="modal-upload-title">Cargar archivos</h2>
                  </div>
                  <div className="custom-file-upload">
                    <label
                      className="label-file-box"
                      onDragOver={(e) => {
                        handleDragOver(e);
                      }}
                      onDrop={(e) => {
                        handleDrop(e);
                      }}
                    >
                      <FontAwesomeIcon
                        className="cloud-upload-icon"
                        icon={faCloudArrowUp}
                      />
                      <span className="drop-title">
                        Arrastra archivos a esta zona
                      </span>
                      o
                      <label className="select-files-label" for="file-upload">
                        Selecciona archivos
                        <input
                          id="file-upload"
                          type="file"
                          accept={[
                            "application/pdf",
                            "image/*",
                            "text/*",
                            ".docx",
                            ".doc",
                          ]}
                          multiple={true}
                          max={5}
                          className="file-upload-input"
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                        />
                      </label>
                    </label>
                  </div>
                  <label className="preview-file-title">
                    Archivos Seleccionados {selectedFiles.length} / 5
                  </label>
                  <div className="preview-file-container">
                    {selectedFiles.length === 0 && (
                      <span className="no-files-selected">
                        No se han seleccionado archivos
                      </span>
                    )}
                    {selectedFiles.length > 0 &&
                      selectedFiles.map((file, index) => (
                        <div key={index} className="file-preview">
                          {file.document_type === "image/png" ||
                            file.document_type === "image/jpg" ||
                            file.document_type === "image/jpeg" ||
                            file.document_type === "image/webp" ||
                            file.document_type === "image/svg" ||
                            file.document_type === "image/gif" ? (
                            <FontAwesomeIcon
                              className="preview-file-icon"
                              icon={faFileImage}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="preview-file-icon"
                              icon={faFileLines}
                            />
                          )}
                          <span className="preview-file-name">
                            {file.document_name}
                          </span>
                          <button
                            className="preview-file-remove"
                            onClick={() => {
                              removeFile(file);
                            }}
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="footer-upload-buttons">
                    <button
                      onClick={() => {
                        setUploadFile(false);
                        setSelectedFiles([]);
                      }}
                      className="close-upload-button"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={subirArchivo}
                      className="confirm-upload-button"
                    >
                      Subir
                    </button>
                  </div>
                </Modal>
              </div>
              :
              <div className="archivo-visualizador-container">
                <ListGroup className="archivo-visualizador-title-list">
                  <ListGroup.Item
                    className="archivo-box"
                  >
                    <div className="archivo-info">
                      <span className="archivo-visualizador-title" style={{ color: 'red' }}>
                        No se muestran los documentos debido a que no tiene los permisos necesarios.
                      </span>
                    </div>
                  </ListGroup.Item>

                </ListGroup>
              </div>
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Documents;
