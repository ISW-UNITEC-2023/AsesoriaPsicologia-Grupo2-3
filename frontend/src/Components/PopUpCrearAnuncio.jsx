import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import "../Styles/CSS/PopUpEditarAnuncio.css";
import { CreateAnnounce } from "../Utilities/announces-services";
import { GetSections } from "../Utilities/section-services";

const PopUpCrearAnuncio = ({ show, onHide }) => {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [seccion, setSeccion] = useState(null);
  const [user_id, setUserID] = useState(null);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    obtenerSecciones();
  }, []);

  async function obtenerSecciones() {
    const fetchData = async () => {
      try {
        const seccionesResponse = await GetSections(); //Obtener secciones para el usuario especifico
        const secciones = seccionesResponse.map((section) => ({
          SectionId: section.SectionId,
          CourseName: section.CourseName,
        }));

        setOpciones(secciones);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };

    fetchData();
  }

  async function publicarAnuncio(_seccion) {
    setSeccion(_seccion);
    const data = {
      message: texto,
      title: titulo,
      section_id: seccion,
      user_id: user_id,
    };
    try {
      await CreateAnnounce(data);
      handleClose();
    } catch (error) {
      console.error("Error al publicar el anuncio:", error);
    }
  }

  const handleClose = () => {
    setTitulo("");
    setTexto("");
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Nuevo Anuncio: {titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <Form.Group controlId="formTitulo" style={{ marginBottom: "20px" }}>
            <Form.Control
              type="text"
              placeholder="Escribe el título del anuncio"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="form-group">
          <Form.Group controlId="formTexto">
            <textarea
              rows="3"
              value={texto}
              placeholder="Escribe el texto del anuncio"
              onChange={(e) => setTexto(e.target.value)}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            style={{ backgroundColor: "#002659", border: "none" }}
          >
            Publicar
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {opciones.map((opcion, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => publicarAnuncio(opcion.SectionId)}
              >
                {opcion.SectionId} - {opcion.CourseName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpCrearAnuncio;
