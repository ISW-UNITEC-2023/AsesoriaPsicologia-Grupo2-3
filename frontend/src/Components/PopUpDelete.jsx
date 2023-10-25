import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { deleteSection } from "../Utilities/section-services";
import "../Styles/CSS/PopUpDelete.css";

const PopUpDelete = ({
  isOpen,
  onCancel,
  onConfirm,
  itemName,
  pageName,
  moduleId,
}) => {
  async function handleDelete() {
    try {
      const response = await deleteSection(moduleId);
      if (response.status === 200) {
        console.log("La sección se eliminó correctamente.");
        onConfirm();
      } else {
        console.error("Error al eliminar la sección");
      }
    } catch (error) {
      console.error("Error al eliminar la sección:", error.message);
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
        <Modal.Title>
          {pageName === "modulo"
            ? `Eliminar módulo: ${itemName}`
            : pageName === "seccion"
            ? `Eliminar sección: ${itemName}`
            : "ERROR!"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea eliminar{" "}
          {pageName === "modulo" ? "el módulo" : "la sección"}: {itemName}?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleDelete()}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={onCancel}>
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
