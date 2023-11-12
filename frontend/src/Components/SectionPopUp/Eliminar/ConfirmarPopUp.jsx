import "../../../Styles/CSS/SectionPopUp/Eliminar/eliminarConfirmarPopUp.css";
import { deleteSection } from "../../../Utilities/section-services";
import propsTypes from "prop-types";
import { Button } from "react-bootstrap";

function SuccessPopUp({ isOpen, onClose, onConfirm, sectionId }) {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    justifyContent: "space-between",
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
          <div className="button-container-eliminar" style={buttonContainerStyle}>
            <Button
              className="confirmar-eliminar"
              onClick={handleConfirm}
            >
              Sí, estoy seguro
            </Button>
            <Button className="cancelar-eliminar" onClick={onClose}>
              Cancelar
            </Button>
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
  sectionId: propsTypes.number,
};
