import React from "react";
import "./successPopUp.css";

const Popup = ({ isOpen, onClose, sectionId }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const handleClose = () => {
    onClose();
    window.location.reload(); // Recargar la página después de cerrar
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>Sección {sectionId} eliminada con éxito</h2>
          <button
            className="btn btn-danger"
            onClick={handleClose}
            style={{ marginRight: "10px" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
