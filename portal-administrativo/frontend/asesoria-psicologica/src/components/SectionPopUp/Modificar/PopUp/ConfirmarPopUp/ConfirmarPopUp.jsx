import React from "react";
import "./ConfirmarPopUp.css";

import {
  updateTeacher,
  updateQuarter,
  updateYear,
} from "../../../../../Services/sections";

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

  const handleConfirm = async () => {
    try {
      if (selectedOption === "teacher_id") {
        await updateTeacher(sectionId, selectedTeacherOption);
      } else if (selectedOption === "year") {
        await updateYear(sectionId, selectedYearOption);
      } else if (selectedOption === "quarter") {
        await updateQuarter(sectionId, selectedQuarterOption);
      }
      onConfirm();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>¿Está seguro que desea modificar la sección {sectionId}?</h2>
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
