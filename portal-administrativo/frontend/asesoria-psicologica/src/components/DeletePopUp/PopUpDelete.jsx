import React from "react";
import "./style.css";

const PopUpDelete = ({ isOpen, onCancel, onConfirm, itemName, pageName, moduleId }) => { // Se recibe la información del módulo o seccion seleccionado y la función de confirmación
    const overlayStyle = {
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
    };

    const popupStyle = {
        transform: isOpen ? "scale(1)" : "scale(0.8)",
    };

    return (
        <div className="popup-overlay" style={overlayStyle}>
            <div className="popup" style={popupStyle}>
                <div className="popup">
                    <div>
                        {console.log(moduleId)}
                        {pageName === "modulo" ? (
                            <p className="textarea">{`¿Está seguro que desea eliminar el modulo: "${itemName}"?`}</p>
                        ) : pageName === "seccion" ? (
                            <p className="textarea">{`¿Está seguro que desea eliminar la seccion: "${itemName}"?`}</p>
                        ) : (
                            <p className="textarea">{"ERROR!"}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <button className="confirm-button" onClick={(e) => onConfirm(moduleId)}>
                            Eliminar
                        </button>
                        
                        <button className="cancel-button" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpDelete;