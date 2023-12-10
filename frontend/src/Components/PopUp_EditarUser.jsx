import React, { useState } from "react";
import "../Styles/CSS/PopUp_EditarUser.css";
import userServices from "../Utilities/user-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const EditarUser = ({ isOpen, onClose, user }) => {
    const overlayStyle = {
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
    };

    const popupStyle = {
        transform: isOpen ? "scale(1)" : "scale(0.8)",
    };

    const [toggleEdits, setToggleEdits] = useState({
        editName: false,
        editEmail: false,
        editPhone: false,
        editActive: false,
    });

    const [credentials, setCredentials] = useState({
        name: user.name_user,
        email: user.email_user,
        phone: user.number_user,
        active: user.active_user,
    });

    async function actualizarUsuario() {
        if (credentials.name !== user.user_name) {
            await userServices.editName({ id: user.id_user, name: credentials.name, editor: user.id_user });
        }
        if (credentials.email !== user.email_user) {
            await userServices.editEmail({ id: user.id_user, email: credentials.email, editor: user.id_user });
        }
        if (credentials.phone !== user.number_user) {
            await userServices.editPhone({ id: user.id_user, phone: credentials.phone, editor: user.id_user });
        }
        if (credentials.active !== user.active_user) {
            await userServices.editActive({ id: user.id_user, active: credentials.active, editor: user.id_user });
        }
        onClose();
    }

    return (
        <div id="popup_editar_usuario" className="popup-overlay-eu" style={overlayStyle}>
            <div className="popup-eu" style={popupStyle}>
                <div className="form-header-eu">
                    <h2 className="form-title-eu">Datos del usuario {user.name_user}</h2>
                    <FontAwesomeIcon
                        id="popup_editar_usuario_close"
                        className="close-icon-eu"
                        icon={faRightFromBracket}
                        onClick={onClose}
                    />
                </div>
                <div className="form-body-eu">
                    <div className="form-group-eu">
                        <label className="form-label-eu">Nombre Completo</label>
                        {toggleEdits.editName ? (
                            <input
                                id="popup_editar_usuario_nombre_usuario"
                                type="text"
                                className="form-active-input-eu"
                                required
                                value={credentials.name}
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        name: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <div className="form-div-input-eu">
                                <input
                                    id="popup_editar_usuario_nombre_credeciales_usuario"
                                    type="text"
                                    className="form-input-eu"
                                    disabled
                                    value={credentials.name}
                                />
                                <FontAwesomeIcon
                                    id="popup_editar_usuario_editar_nombre_credeciales_usuario"
                                    className="pencil-icon-eu"
                                    icon={faPencil}
                                    onClick={() =>
                                        setToggleEdits({
                                            ...toggleEdits,
                                            editName: toggleEdits.editName ? false : true,
                                        })
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="form-group-eu">
                        <label className="form-label-eu">Correo Eléctronico</label>
                        {toggleEdits.editEmail ? (
                            <input
                                id="popup_editar_usuario_correo_usuario"
                                type="email"
                                className="form-active-input-eu"
                                required
                                value={credentials.email}
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        email: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <div className="form-div-input-eu">
                                <input
                                    id="popup_editar_usuario_correo_credenciales_usuario"
                                    type="text"
                                    className="form-input-eu"
                                    disabled
                                    value={credentials.email}
                                />
                                <FontAwesomeIcon
                                    id="popup_editar_usuario_editar_correo_credenciales_usuario"
                                    className="pencil-icon-eu"
                                    icon={faPencil}
                                    onClick={() =>
                                        setToggleEdits({
                                            ...toggleEdits,
                                            editEmail: toggleEdits.editEmail ? false : true,
                                        })
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="form-group-double-eu">
                        <div className="form-group-eu">
                            <label className="form-label-eu">Numero Teléfonico</label>
                            {toggleEdits.editPhone ? (
                                <input
                                    id="popup_editar_usuario_telefono_usuario"
                                    type="text"
                                    required
                                    value={credentials.phone}
                                    className="form-active-input-eu"
                                    onChange={(event) =>
                                        setCredentials({
                                            ...credentials,
                                            phone: event.target.value,
                                        })
                                    }
                                />
                            ) : (
                                <div className="form-div-input-eu">
                                    <input
                                        id="popup_editar_usuario_telefono_credenciales_usuario"
                                        type="text"
                                        className="form-input-eu"
                                        disabled
                                        value={credentials.phone}
                                    />
                                    <FontAwesomeIcon
                                        id="popup_editar_usuario_editar_telefono_credenciales_usuario"
                                        className="pencil-icon-eu"
                                        icon={faPencil}
                                        onClick={() =>
                                            setToggleEdits({
                                                ...toggleEdits,
                                                editPhone: toggleEdits.editPhone ? false : true,
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-group-eu">
                            <label className="form-label-eu">Estado</label>
                            {toggleEdits.editActive ? (
                                <select
                                    id="popup_editar_usuario_estado_usuario"
                                    className="form-control-eu"
                                    required
                                    onChange={(event) =>
                                        setCredentials({
                                            ...credentials,
                                            active: event.target.value,
                                        })
                                    }
                                >
                                    <option value={0}>Inactivo</option>
                                    <option value={1}>Activo</option>
                                </select>
                            ) : (
                                <div className="form-div-input-eu">
                                    <input
                                        id="popup_editar_usuario_estado_credenciales_usuario"
                                        type="text"
                                        className="form-input-eu"
                                        disabled
                                        value={credentials.active === 1 ? "Activo" : "Inactivo"}
                                    />
                                    <FontAwesomeIcon
                                        id="popup_editar_usuario_editar_estado_credenciales_usuario"
                                        className="pencil-icon-eu"
                                        icon={faPencil}
                                        onClick={() =>
                                            setToggleEdits({
                                                ...toggleEdits,
                                                editActive: toggleEdits.editActive ? false : true,
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-buttons-eu">
                        <button id="popup_editar_usuario_cancelar-btn" className="form-cancel-eu" onClick={onClose}>
                            Cancelar
                        </button>
                        <button id="popup_editar_usuario_actualizar-btn" className="form-actualizar-eu" onClick={() => { actualizarUsuario() }}>Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default EditarUser;
