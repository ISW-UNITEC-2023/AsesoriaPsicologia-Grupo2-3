import "../../../Styles/CSS/SectionPopUp/Modificar/ConfirmarPopUp.css";
import propsTypes from "prop-types";

const ModificarConfirmPopUp = ({ isOpen, onClose, onConfirm, sectionId }) => {
  const overlayStyle = {
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <div className="popup-content">
          <h2>¿Está seguro que desea modificar la sección {sectionId}?</h2>
          <div style={buttonContainerStyle}>
            <button
              className="btn btn-danger"
              onClick={() => {
                // Aquí llamamos a la función onConfirm para ejecutar handleConfirm en SectionsPage
                onConfirm();
              }}
              style={{ marginRight: "10px" }}
            >
              Sí, deseo modificar sección {sectionId}
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

export default ModificarConfirmPopUp;

ModificarConfirmPopUp.propsTypes = {
  isOpen: propsTypes.bool,
  onClose: propsTypes.func,
  onConfirm: propsTypes.func,
  sectionId: propsTypes.number,
};
