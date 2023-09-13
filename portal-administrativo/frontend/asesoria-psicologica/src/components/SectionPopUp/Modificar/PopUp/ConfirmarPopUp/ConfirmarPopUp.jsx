import React from "react";
import "./ConfirmarPopUp.css";

const ConfirmarPopUp = ({
  isOpen,
  onClose,
  onConfirm,
  sectionId,
  selectedOption,
  selectedQuarterOption,
  selectedTeacherOption,
  selectedYearOption,
}) => {
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

  // Función onConfirm que te lleva al PopUp de éxito
  const handleConfirm = () => {
    console.log(sectionId);
    if (selectedOption === "teacher_id") {
      console.log(`Teacher ID seleccionado: ${selectedTeacherOption}`);
    } else if (selectedOption === "year") {
      console.log(`Año seleccionado: ${selectedYearOption}`);
    } else if (selectedOption === "quarter") {
      console.log(`Trimestre seleccionado: Q${selectedQuarterOption}`);
    }
    onConfirm(); // Llamar a la función onConfirm cuando se confirma la modificación
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>¿Está seguro que desea modificar la sección {sectionId}?</h2>{" "}
          <div style={buttonContainerStyle}>
            <button
              className="btn btn-danger"
              onClick={handleConfirm}
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

export default ConfirmarPopUp;
