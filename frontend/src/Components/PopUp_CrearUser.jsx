import React, { useState } from "react";
import "../Styles/CSS/PopUp_CrearUser.css";
import userServices from "../Utilities/user-services";
import validatorServices from "../Utilities/validator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const CrearUser = ({ isOpen, onClose, refreshUsers }) => {
    const overlayStyle = {
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
    };

    const popupStyle = {
        transform: isOpen ? "scale(1)" : "scale(0.8)",
    };

    const [showPassword, setShowPassword] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        type: "",
        active: 1,
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();
        if (validatorServices.isPassword(credentials.password) === false) {
            setValidPassword(false)
        } else {
            setValidPassword(true)
        }
        if (validatorServices.isEmail(credentials.email) === false) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
        if (validatorServices.isPassword(credentials.password) && validatorServices.isEmail(credentials.email)) {
            const response = await userServices.createUser(credentials);
            refreshUsers();
            onClose();
        }
    };

    return (
        <div id="popup_crear_usuario" className="popup-overlay-cu" style={overlayStyle}>
            <div className="popup-cu" style={popupStyle}>
                <div className="form-header-cu">
                    <h2>CREAR NUEVO USUARIO</h2>
                    <FontAwesomeIcon
                        id="popup_crear_usuario_close_btn"
                        style={{ cursor: "pointer" }}
                        icon={faRightFromBracket}
                        onClick={onClose}
                    />
                </div>
                <div className="form-body-cu">
                    <div className="form-group-cu">
                        <label className="form-label-cu">Nombre Completo</label>
                        <input
                            id="popup_crear_usuario_nombre_usuario"
                            type="text"
                            className="form-control-cu"
                            required
                            onChange={(event) =>
                                setCredentials({
                                    ...credentials,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-group-cu">
                        <label className="form-label-cu">Correo Eléctronico</label>
                        <input
                            id="popup_crear_usuario_correo_usuario"
                            type="email"
                            className="form-control-cu"
                            required
                            onChange={(event) =>
                                setCredentials({
                                    ...credentials,
                                    email: event.target.value,
                                })
                            }
                        />
                        {validEmail === false && <span className="error-crear-popup">El correo ingresado no es valido</span>}
                    </div>
                    <div className="form-group-cu">
                        <label className="form-label-cu">Contraseña</label>
                        <div className="form-div-password-cu">
                            <input
                                id="popup_crear_usuario_contraseña_usuario"
                                type={showPassword ? "text" : "password"}
                                className="form-input-password-cu"
                                required
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        password: event.target.value,
                                    })
                                }
                            />
                            {showPassword ? (
                                <FontAwesomeIcon
                                    id="popup_crear_usuario_mostrar_contraseña_usuario"
                                    className="eye-icon-cu"
                                    icon={faEye}
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    id="popup_crear_usuario_mostrar_contraseña_usuario"
                                    className="eye-icon-cu"
                                    icon={faEyeSlash}
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                        {validPassword === false && <span className="error-crear-popup">La contraseña ingresada no es valida</span>}
                    </div>
                    <div className="form-group-double-cu">
                        <div className="form-group-cu">
                            <label className="form-label-cu">Teléfono</label>
                            <input
                                id="popup_crear_usuario_telefono_usuario"
                                type="text"
                                className="form-control-cu"
                                required
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        phone: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group-cu">
                            <label className="form-label-cu">Estado</label>
                            <select
                                id="popup_crear_usuario_estado_usuario"
                                className="form-control-cu"
                                required
                                onChange={(event) =>
                                    setCredentials({
                                        ...credentials,
                                        active: event.target.value,
                                    })
                                }
                            >
                                <option value={1}>Activo</option>
                                <option value={0}>Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-buttons-cu">
                        <button id="popup_crear_usuario_cancelar_btn" className="form-cancel-cu" onClick={onClose}>
                            Cancelar
                        </button>
                        <button id="popup_crear_usuario_crear_btn" className="form-create-cu" onClick={handleCreateUser}>
                            Crear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearUser;
