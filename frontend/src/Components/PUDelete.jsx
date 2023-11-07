import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { deleteModule } from "../Utilities/course-services";
import "../Styles/CSS/PopUpDelete.css";

const PUDelete = ({
  isOpen,
  onCancel,
  itemName,
  moduleId,
  onConfirm,
  pageName,
}) => {
  const [isDeleted, setDeleted] = useState(false);

  async function handleDelete() {
    try {
      const response = await deleteModule(moduleId);

      if (response && response.status === 200) {
        // Set the deleted state to true
        setDeleted(true);

        // Display a confirmation alert
        const userConfirmed = window.confirm(
          "Módulo eliminado exitosamente. ¿Desea recargar la página?"
        );

        if (userConfirmed) {
          // Refresh the page or call loadModules here
          window.location.reload();
        }
      } else {
        console.error("Error al eliminar el módulo");
      }
    } catch (error) {
      console.error("Error al eliminar el módulo:", error.message);
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
          {`Eliminar módulo: ${itemName}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: "1.3rem", textAlign: "center" }}>
          {`¿Está seguro que desea eliminar el módulo?`}
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

      {/* Conditional rendering of the alert */}
      {isDeleted && (
        <div className="alert alert-success" role="alert">
          Módulo eliminado exitosamente.
        </div>
      )}
    </Modal>
  );
};

PUDelete.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  itemName: PropTypes.string,
  moduleId: PropTypes.number,
  onConfirm: PropTypes.func,
  pageName: PropTypes.string,
};

export default PUDelete;
