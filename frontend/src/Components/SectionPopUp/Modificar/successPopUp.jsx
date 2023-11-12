import "../../../Styles/CSS/SectionPopUp/Modificar/successPopUp.css";
import propsTypes from "prop-types";
import { Button } from "react-bootstrap";

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
          <h2  style={{ marginBottom:'20px' }}>Sección {sectionId} modificada con éxito.</h2>
          <Button 
            className="cancelar-sus "
            onClick={onClose}
          >
            Cerrar
          </Button>
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
