import React from "react";
import "./ConfirmarPopUp.css";

const ModificarConfirmPopUp = ({ isOpen, onClose, onConfirm, sectionId }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>¿Está seguro que desea modificar la sección {sectionId}?</h2>
          <div style={buttonContainerStyle}>
            <button
              className="btn btn-danger"
              onClick={() => {
                // Aquí llamamos a la función onConfirm para ejecutar handleConfirm en SectionsPage
                onConfirm();
              }}
              style={{ marginRight: "10px" }}
            >
              Sí, deseo modificar la sección {sectionId}
            </button>
            <button className="btn btn-danger" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarConfirmPopUp;
