import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/CSS/PopUpEditarAnuncio.css";
import {
  UpdateAnnouncesTitle,
  UpdateAnnouncesDecription,
} from "../../frontend/src/Utilities/announces-services";

const PopUpEditarAnuncio = ({
  show,
  onHide,
  announce_id,
  title,
  description,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    setIsTitleChanged(true);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
    setIsDescriptionChanged(true);
  };

  const handleUpdate = async () => {
    if (isTitleChanged && title !== newTitle) {
      await actualizarTituloAnuncio(newTitle);
    }

    if (isDescriptionChanged && description !== newDescription) {
      await actualizarDescripcionAnuncio(newDescription);
    }

    onHide();
  };

  async function actualizarTituloAnuncio(newTitle) {
    try {
      const data = {
        id: announce_id,
        title: newTitle,
      };
      await UpdateAnnouncesTitle(data.id, data.title);
    } catch (error) {
      console.error("Error al actualizar el título del anuncio:", error);
    }
  }

  async function actualizarDescripcionAnuncio(newDescription) {
    try {
      const data = {
        id: announce_id,
        description: newDescription,
      };
      await UpdateAnnouncesDecription(data.id, data.description);
    } catch (error) {
      console.error("Error al actualizar la descripcion del anuncio:", error);
    }
  }

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
  }, [title, description]);

  const handleClose = () => {
    setNewTitle(title);
    setNewDescription(description);
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
      <Modal.Header className="justify-content-center modal-header-editar">
        <Modal.Title className="text-center">
          Editar Anuncio <p className="titulo"> {newTitle}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="editar-modal-body">
        <div
          className="form-group"
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label class="form-label titulos">Titulo del anuncio: </label>
          <input
            type="text"
            className="form-control"
            value={newTitle}
            placeholder="Escribe el título del anuncio"
            onChange={(e) => handleTitleChange(e)}
          />
        </div>
        <div className="form-group">
          <Form.Group
            controlId="formTexto"
            style={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label class="form-label titulos">Descripcion del anuncio: </label>
            <Form.Control
              as="textarea"
              rows="3"
              value={newDescription}
              style={{ height: "10rem" }}
              placeholder="Escribe el texto del anuncio"
              onChange={(e) => handleDescriptionChange(e)}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer className="footer-anuncios editar-anuncio">
        {" "}
        <Button
          variant="danger"
          onClick={handleClose}
          className="cancelar-button-editar"
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdate}
          style={{ backgroundColor: "#002659", border: "none" }}
          className="actualizar-button"
        >
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpEditarAnuncio;
