import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { deleteSection } from "../Utilities/section-services";
import "../Styles/CSS/PopUpDelete.css";
import {
  DeleteAnnounces,
  loadAnnounces,
} from "../Utilities/announces-services";

const PopUpDelete = ({
  isOpen,
  onCancel,
  onConfirm,
  itemName,
  pageName,
  moduleId,
  announceId,
}) => {
  async function handleDelete() {
    try {
      if (pageName === "modulos") {
        const response = await deleteSection(moduleId);
      }

      if (pageName === "anuncios") {
        await DeleteAnnounces(announceId);

        onConfirm();
      }

      if (response.status === 200) {
        console.log("La sección se eliminó correctamente.");
        onConfirm();
      } else {
        console.error("Error al eliminar la sección");
      }
    } catch (error) {
      console.error("Error al eliminar la sección:", error);
    }
  }

  return (
    <Modal
      show={isOpen}
      onHide={onCancel}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title style={{ fontSize: "1.5rem", textAlign: "center" }}>
          {pageName === "modulo"
            ? `Eliminar módulo: ${itemName}`
            : pageName === "seccion"
            ? `Eliminar sección: ${itemName}`
            : pageName === "anuncios"
            ? `¿Eliminar: ${itemName}?`
            : "ERROR"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: "1.3rem", textAlign: "center" }}>
          {pageName === "modulo"
            ? "¿Está seguro que desea eliminar el módulo?"
            : "¿Está seguro que desea eliminar la sección?"
            ? "Esta acción no puede ser retrocedida."
            : { itemName }}
        </p>
      </Modal.Body>
      <Modal.Footer className="buttons-container">
        <Button
          className="confirm-button"
          variant="danger"
          style={{ backgroundColor: "#c6161c" }}
          onClick={() => handleDelete()}
        >
          Eliminar
        </Button>
        <Button
          className="cancel-button"
          variant="secondary-outlined"
          style={{ border: "2px solid #5c636a" }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PopUpDelete.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  itemName: PropTypes.string,
  moduleId: PropTypes.number,
  pageName: PropTypes.string,
};

export default PopUpDelete;
