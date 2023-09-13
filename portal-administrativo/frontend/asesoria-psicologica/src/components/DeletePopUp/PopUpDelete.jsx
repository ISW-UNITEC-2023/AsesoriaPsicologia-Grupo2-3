import React from "react";
import "./style.css";

const PopUpDelete = ({ isOpen, onCancel, onConfirm, itemName, pageName }) => { // Se recibe la información del módulo o seccion seleccionado y la función de confirmación
    return (
        <div className="popup-overlay" style={overlayStyle}> 
            <div className={`popup ${isOpen ? "open" : ""}`}>
                <div className="popup">
                    {pageName === "modulo" ? (
                        <p className="textarea">{`¿Está seguro que desea eliminar el modulo: "${itemName}"?`}</p> 
                    ) : pageName === "seccion" ? (
                        <p className="textarea">{`¿Está seguro que desea eliminar la seccion: "${itemName}"?`}</p>
                    ) : (
                        <p className="textarea">{"ERROR!"}</p>
                    )}

                    <div>
                        <button className="confirm-button" onClick={onConfirm}>
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