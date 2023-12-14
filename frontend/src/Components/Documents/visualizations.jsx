import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Services from "../../Utilities/documents-services";
import PopupViewer from "./PopupViewer";
import "../../Styles/CSS/Visualizations.css";

function ArchivoVisualizador(props) {
  const [allArchivos, setAllArchivos] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [archivo, setArchivo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    cargarArchivos();
  }, []);

  useEffect(() => {
    filtrarArchivos(allArchivos, searchTerm);
  }, [searchTerm, allArchivos]);
  //obtener los nombres de los archivos
  const cargarArchivos = async () => {
    try {
      const response = await Services.getDocumentId(props.id_file);

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

  //filtro para buscar archivo por nombre
  const filtrarArchivos = (archivosToFilter, term) => {
    const filteredArchivos = archivosToFilter.filter((file) =>
      file.document_name.toLowerCase().includes(term.toLowerCase())
    );
    setArchivos(filteredArchivos);
  };

  const manejarCambioArchivo = (event) => {
    setArchivo(event.target.files[0]);
  };
  //subir archivo a base de datos
  const subirArchivo = async () => {
    if (!archivo) return alert("No hay archivo para subir");

    try {
      const formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("user_creator", props.userData.user_data.id_user);
      formData.append("id_file", props.id_file);
      await Services.uploadFile(formData);

      cargarArchivos();
      alert("¡Archivo cargado exitosamente!");
      setArchivo(null);
    } catch (error) {
      console.error("Error al subir el archivo", error);
    }
  };

  const openPopup = (file) => {
    setSelectedFile(file);
  };

  const inputFileRef = React.createRef();

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
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
          props.userData.user_data.id_user
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

  return (
    <div>
      <div className="upload-section">
        <label className="custom-file-input">
          <input
            type="file"
            onChange={manejarCambioArchivo}
            ref={inputFileRef}
            style={{ display: "none" }}
          />
        </label>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button onClick={handleClick}>Cargar Archivo</button>
        <button onClick={subirArchivo}>Subir Archivo</button>

        <div>
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
                    </div>
                    <div className="archivo-actions">
                      <Button
                        className="archivo-visualizador-button"
                        onClick={() => openPopup(file)}
                      >
                        Ver Archivo
                      </Button>
                      <Button
                        className="archivo-visualizador-button"
                        onClick={() => editarNombre(file, extension)}
                      >
                        Editar Nombre
                      </Button>
                      <Button
                        className="archivo-visualizador-button"
                        onClick={() => eliminarArchivo(file)}
                      >
                        Eliminar
                      </Button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchivoVisualizador;