import React, { useState, useEffect } from "react";
import "./PopUp_EditarUser.css";
import "font-awesome/css/font-awesome.css";
import Services from "../../../utils/services";

const EditarUser = ({ isOpen, onClose, user }) => {
    const overlayStyle = {
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
    };

    const popupStyle = {
        transform: isOpen ? "scale(1)" : "scale(0.8)",
    };

    const [credentials, setCredentials] = useState({
        id_account: user.id_account || "", // Utiliza user.id_accout como valor por defecto
        role: user.role || "", // Utiliza user.role como valor por defecto
        active: user.active || "", // Utiliza user.active como valor por defecto
    });

    return (
        <div id="popup_editar_usuario" className="popup-overlay" style={overlayStyle}>
            <div className="popup" style={popupStyle}>
                <button id="popup_editar_usuario_close_btn" className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>EDITAR USUARIO</h2>
                <div className="grid-container">
                    <div className="form-group">
                        <label htmlFor="usuario">ID Usuario</label>
                        <input
                            id="popup_editar_usuario_id_usuario"
                            type="text"
                            className="form-control"
                            placeholder={user.id_account}
                            value={user.id_account}
                            readOnly={true}
                            disabled={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input
                            id="popup_editar_usuario_nombre_usuario"
                            type="text"
                            className="form-control"
                            placeholder={user.nombre}
                            value={user.nombre}
                            readOnly={true}
                            disabled={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input
                            id="popup_editar_usuario_correo_usuario"
                            type="text"
                            className="form-control"
                            placeholder={user.email}
                            value={user.email}
                            readOnly={true}
                            disabled={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña</label>
                        <div className="password-input">
                            <input
                                id="popup_editar_usuario_contraseña_usuario"
                                type="password"
                                className="form-control"
                                placeholder=""
                                readOnly={true}
                                disabled={true}
                            />
                            <span className="password-toggle fa fa-eye-slash"></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Rol">Estado</label>
                        <select
                            id="popup_editar_usuario_id_usuario_estado"
                            className="form-control"
                            defaultValue={credentials.active} // Establece el valor predeterminado
                        >
                            <option value="">
                                {user.active}
                            </option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Rol">Rol</label>
                        <select
                            id="popup_editar_usuario_id_usuario_rol"
                            className="form-control"
                            defaultValue={credentials.role} // Establece el valor predeterminado
                        >
                            <option value="">
                                {user.role}
                            </option>
                            <option value="ADMIN">Administrador</option>
                            <option value="DOCENTE">Docente</option>
                            <option value="ESTUDIANTE">Estudiante</option>
                            <option value="PACIENTE">Paciente</option>
                        </select>
                    </div>
                </div>
                <div className="buttons">
                    <button
                        id="popup_editar_usuario_cancelar_btn"
                        className="btn btn-danger"
                        onClick={() => {
                            onClose();
                            borrarStorage();
                        }}
                        style={{ marginRight: "10px" }}
                    >
                        Cancelar
                    </button>
                    <button
                        id="popup_editar_usuario_guardar_btn"
                        className="btn btn-success"
                        onClick={async () => {
                            console.log(document.getElementById("estado").value)
                            console.log(document.getElementById("rol").value)
                            await Services.updateUser(
                                user.id_account,
                                document.getElementById("rol").value,
                                document.getElementById("estado").value
                            );

                            if (document.getElementById("rol").value === "" || document.getElementById("estado").value === null) {
                                console.log("No puede dejar ningun campo vacio.");
                            } else {
                                localStorage.clear();
                                console.log("El usuario se modifico exitosamente");
                                onClose();
                            }
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditarUser;
