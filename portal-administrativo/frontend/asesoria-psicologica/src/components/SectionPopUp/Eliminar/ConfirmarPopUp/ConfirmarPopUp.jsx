import React from "react";
import "./ConfirmarPopUp.css";
import { deleteSection } from "../../../../Services/sections";
const Popup = ({ isOpen, onClose, onConfirm, sectionId }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between", // Para colocar los botones uno al lado del otro
  };

  // Función onConfirm que te lleva al PopUp de éxito
  const handleConfirm = async () => {
    try {
      await deleteSection(sectionId);
      onConfirm();
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
        
          <h2>¿Está seguro que desea eliminar la sección {sectionId}?</h2>{" "}
          {/* Usa sectionId en el mensaje */}
          <div style={buttonContainerStyle}>
            <button
              className="btn btn-danger"
              onClick={handleConfirm}
              style={{backgroundColor: 'green', color: 'white', borderBlockColor:'green',marginRight: "10px" }} // Llama a handleConfirm en lugar de onClose
            >
              
              Sí, estoy seguro
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

export default Popup;
