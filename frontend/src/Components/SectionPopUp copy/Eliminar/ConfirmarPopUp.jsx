import "../../../Styles/CSS/modulePopUp/Eliminar/eliminarConfirmarPopUp.css";
import { deletemodule } from "../../../Utilities/module-services";
import propsTypes from "prop-types";

function SuccessPopUp({ isOpen, onClose, onConfirm, moduleId }) {
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
      await deletemodule(moduleId);
      onConfirm();
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>¿Está seguro que desea eliminar la sección {moduleId}?</h2>{" "}
          {/* Usa moduleId en el mensaje */}
          <div style={buttonContainerStyle}>
            <button
              className="btn btn-danger"
              onClick={handleConfirm}
              style={{
                backgroundColor: "green",
                color: "white",
                borderBlockColor: "green",
                marginRight: "10px",
              }} // Llama a handleConfirm en lugar de onClose
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
}

export default SuccessPopUp;

SuccessPopUp.propsTypes = {
  isOpen: propsTypes.bool,
  onClose: propsTypes.func,
  onConfirm: propsTypes.func,
  moduleId: propsTypes.number,
};
