import React from "react";
import PropTypes from "prop-types";

const Popup = ({ isOpen, onClose, onConfirm, sectionId }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2 style={{ marginBottom: "20px" }}>
            Sección {sectionId} modificada con éxito
          </h2>
          <button
            className="btn btn-danger"
            onClick={onClose}
            style={{
              backgroundColor: "green",
              color: "white",
              borderBlockColor: "green",
              marginRight: "10px",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  sectionId: PropTypes.number,
};

export default Popup;
