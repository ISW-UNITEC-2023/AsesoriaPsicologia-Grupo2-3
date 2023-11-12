import React, { useState } from "react";
import "../Styles/CSS/PopUp_CrearUser.css";
import userServices from "../Utilities/user-services";
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

  const handleCreateUser = (event) => {
    event.preventDefault();
    userServices.createUser(credentials)
    refreshUsers();
    onClose();
  };

  return (
    <div className="popup-overlay-cu" style={overlayStyle}>
      <div className="popup-cu" style={popupStyle}>
        <div className="form-header-cu">
          <h2>CREAR NUEVO USUARIO</h2>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faRightFromBracket}
            onClick={onClose}
          />
        </div>
        <div className="form-body-cu">
          <div className="form-group-cu">
            <label className="form-label-cu">Nombre Completo</label>
            <input
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
          </div>
          <div className="form-group-cu">
            <label className="form-label-cu">Contraseña</label>
            <div className="form-div-password-cu">
              <input
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
                  className="eye-icon-cu"
                  icon={faEye}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  className="eye-icon-cu"
                  icon={faEyeSlash}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="form-group-double-cu">
            <div className="form-group-cu">
              <label className="form-label-cu">Teléfono</label>
              <input
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
            <button className="form-cancel-cu" onClick={onClose}>
              Cancelar
            </button>
            <button className="form-create-cu" onClick={handleCreateUser}>
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearUser;
