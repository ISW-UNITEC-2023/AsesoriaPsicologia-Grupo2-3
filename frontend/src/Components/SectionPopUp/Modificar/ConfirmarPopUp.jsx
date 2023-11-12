import "../../../Styles/CSS/SectionPopUp/Modificar/ConfirmarPopUp.css";
import propsTypes from "prop-types";
import { Button } from "react-bootstrap";

const ModificarConfirmPopUp = ({ isOpen, onClose, onConfirm, sectionId }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    width: '100%',
    marginTop: '10%'
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>¿Está seguro que desea modificar la sección {sectionId}?</h2>
          <div className="buttonContainerStyle">
            <Button
              className="confirmar-popup"
              onClick={onConfirm}
              style={{ marginRight: "10px" }}
            >
              Sí, deseo modificar sección {sectionId}
            </Button>
            <Button className="cancelar-popup" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarConfirmPopUp;

ModificarConfirmPopUp.propsTypes = {
  isOpen: propsTypes.bool,
  onClose: propsTypes.func,
  onConfirm: propsTypes.func,
  sectionId: propsTypes.number,
};
