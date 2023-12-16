//Components
import React, { useEffect, useState } from "react";
import NavigationB from "../Components/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Services from "../Utilities/documents-services";
import PopupViewer from "../Components/PopupViewer";
import { toast, ToastContainer } from "react-toastify";

//Items
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEye,
  faTrash,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Toast } from "react-bootstrap";

//Styles
import "../Styles/CSS/Documents.css";

function Documents(props) {
  const location = useLocation();
  const { id_file, userData } = useLocation().state;
  const [allArchivos, setAllArchivos] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPreviews, setSelectedPreviews] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadFile, setUploadFile] = useState(false);

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
    const filteredArchivos = archivosToFilter.filter((file) =>
      file.document_name.toLowerCase().includes(term.toLowerCase())
    );
    setArchivos(filteredArchivos);
  };

  //Manejo subir archivo
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const previews = [...selectedPreviews]

    if (selectedFiles.length + files.length > 5) {
      toast.warn("Solo se permiten como máximo 5 archivos", {
        position: "top-center",
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
          const file = {
            id_document: null,
            document_name: files[i].name,
            document_size: files[i].size,
            document_type: files[i].type,
            document_url: reader.result,
          };
          previews.push(reader.result)
          setSelectedPreviews(previews)
          setSelectedFiles(prevFiles => [...prevFiles, file]);
        };
        reader.readAsDataURL(files[i]);
      }
    
  };

  const removeFile = (file) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const uniqueSelectedFiles = files.filter(
      (file) =>
        !selectedFiles.some((selectedFile) => selectedFile.name === file.name)
    );
    setSelectedFiles([...selectedFiles, ...uniqueSelectedFiles]);
  };

  const subirArchivo = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("id_file", id_file);
      formData.append("id_user", userData.user_data.id_user);
      await Services.uploadDocument(formData);
      cargarArchivos();
      setUploadFile(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Ocurrió un error al intentar subir el archivo:", error);
    }
  };

  //cambiar nombre
  const editarNombre = async (file, extension) => {
    try {
      const nuevoNombre = prompt(
        "Ingrese el nuevo nombre:",
        file.document_name
      );

      if (nuevoNombre !== null) {
        const nuevaRuta = `${nuevoNombre}.${extension}`;
        await Services.updateDocumentName(
          file.id_document,
          nuevaRuta,
          userData.user_data.id_user
        );
        cargarArchivos();
      }
    } catch (error) {
      console.error("Ocurrió un error al intentar editar el nombre:", error);
    }
  };
  //eliminar archivo
  const eliminarArchivo = async (file) => {
    const confirmarEliminacion = window.confirm(
      "¿Está seguro de que desea eliminar este archivo?"
    );

    if (confirmarEliminacion) {
      await Services.deleteDocument(file.id_document);
      cargarArchivos();
      alert("¡Archivo eliminado exitosamente!");
    }
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
          <button
            onClick={() => {
              setUploadFile(true);
            }}
            className="upload-file-button"
          >
            Subir Archivo
          </button>
        </div>
        <div className="visualization-container">
          <div className="archivo-visualizador-container">
            <ListGroup className="archivo-visualizador-title-list">
              {archivos.map((file) => {
                const partesNombreArchivo = file.document_name.split(".");
                const extension =
                  partesNombreArchivo[partesNombreArchivo.length - 1];

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
                        Tamaño: {convertSize(file.document_size)}
                      </span>
                    </div>
                    <div className="archivo-actions">
                      <FontAwesomeIcon
                        className="archivo-visualizador-button"
                        icon={faEye}
                        onClick={() => {
                          setSelectedFile(file);
                        }}
                      />
                      <FontAwesomeIcon
                        className="archivo-visualizador-button"
                        icon={faPencil}
                        onClick={() => editarNombre(file, extension)}
                      />
                      <FontAwesomeIcon
                        className="archivo-visualizador-button"
                        icon={faTrash}
                        onClick={() => eliminarArchivo(file)}
                      />
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            {selectedFile && (
              <PopupViewer
                file={selectedFile}
                onClose={() => setSelectedFile(null)}
              />
            )}
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
              <div
                className="custom-file-upload"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <label
                  for="file-upload"
                  className="label-file-box"
                  onDragOver={handleDragOver}
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
                  <input
                    type="file"
                    accept={["application/pdf", "image/*", ".doc", ".docx"]}
                    multiple={true}
                    max={5}
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                  <div className="preview-file-container">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="file-preview">
                        <span className="file-name">{file.document_name}</span>
                        <button
                          type="button"
                          className="file-remove-button"
                          onClick={() => {
                            removeFile(file);
                          }}
                        >
                        </button>
                      </div>
                    ))}
                  </div>
                </label>
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Documents;
