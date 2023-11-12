import "../../../Styles/CSS/SectionPopUp/Eliminar/eliminarSuccessPopUp.css";
import propsTypes from "prop-types"
import { Button } from "react-bootstrap";

const Popup = ({ isOpen, onClose, sectionId }) => {
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
          <h2>Sección {sectionId} eliminada con éxito</h2>
          <Button 
            className="cancelar-sus-elim "
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

Popup.propsTypes = {
  isOpen: propsTypes.bool.isRequired,
  onClose: propsTypes.func.isRequired,
  sectionId: propsTypes.number.isRequired,
};