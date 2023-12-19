import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import "../Styles/CSS/PopUpEditarAnuncio.css";
import "../Styles/CSS/PopUpCrearAnuncio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateAnnounce } from "../Utilities/announces-services";
import servicios from "../Utilities/clinics-services";

const PopUpCrearAnuncio = ({ show, onHide }) => {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [clinic, setClinic] = useState(0);
  const [user_id, setUserID] = useState(null);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    obtainClinics();
  }, []);

  async function obtainClinics() {
    const fetchData = async () => {
      try {
        const clinicsResponse = await servicios.getClinics(); //Obtener secciones para el usuario especifico
        console.log(clinicsResponse)
        const clinics = clinicsResponse.clinicsInfo.map((section) => ({
          clinicId: section.id_clinic,
          CourseName: section.name_course,
        }));

        setOpciones(clinics);
      } catch (error) {
        console.error("Error al obtener las clinicas:", error);
      }
    };

    fetchData();
  }

  async function publicarAnuncio(_clinic) {
    setClinic(_clinic);
    console.log("CLINICA"+clinic)
    const data = {
      message: texto,
      title: titulo,
      clinic: _clinic,
      creator: 13,
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
      <Modal.Header className="justify-content-center header-anuncios">
        <Modal.Title placeholder="Titulo de Anuncio Nuevo: ">
          Crear Anuncio
          <p className="titulo"> {titulo}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <Form.Group
            controlId="formTitulo"
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Label className="titulos">Titulo de Anuncio</Form.Label>

            <Form.Control
              type="text"
              placeholder="Escribe el título del anuncio"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>
        </div>

        <div>
          <Form.Group
            controlId="formTexto"
            className="form-group-descripcion "
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Label className="titulos">Descripción de Anuncio</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={texto}
              placeholder="Escribe el texto del anuncio"
              style={{ height: "10rem" }}
              onChange={(e) => setTexto(e.target.value)}
            />
          </Form.Group>
        </div>

        <Modal.Footer className="footer-anuncios">
          <Button
            variant="danger"
            onClick={handleClose}
            className="cancelar-button"
          >
            Cancelar
          </Button>
          <Dropdown className="publicar-button-container">
            <Dropdown.Toggle className="publicar-button">
              Publicar
            </Dropdown.Toggle>

            <Dropdown.Menu className="publicar-menu">
              {opciones.map((opcion, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => publicarAnuncio(opcion.clinicId)}
                >
                  {opcion.clinicId} - {opcion.CourseName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpCrearAnuncio;
