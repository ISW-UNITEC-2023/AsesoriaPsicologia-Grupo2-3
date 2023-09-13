import React from "react";
import "./Style.css";

const PopUpDeleted = ({ isOpen, onClose, pageName }) => { // Se recibe la información del módulo o seccion seleccionado y la función de confirmación
    return (
        <div className="popup-overlay" style={overlayStyle}>
            <div className={`popup ${isOpen ? "open" : ""}`}>
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