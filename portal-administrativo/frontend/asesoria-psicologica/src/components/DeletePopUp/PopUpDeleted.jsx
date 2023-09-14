import React from "react";
import "./Style.css";

const PopUpDeleted = ({ isOpen, onClose, pageName }) => { // Se recibe la información del módulo o seccion seleccionado y la función de confirmación
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
                    {pageName === "modulo" ? (
                        <p className="textarea">{"Modulo eliminado correctamente!"}</p>
                    ) : pageName === "seccion" ? (
                        <p className="textarea">{"Seccion eliminada correctamente!"}</p>
                    ) : (
                        <p className="textarea">{"ERROR!"}</p>
                    )}
                    <div>
                        <button className="close-button" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpDeleted;