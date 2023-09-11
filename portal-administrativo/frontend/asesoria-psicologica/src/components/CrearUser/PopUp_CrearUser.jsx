import React, { useState } from "react";
import "./PopUp_CrearUser.css";
import "font-awesome/css/font-awesome.css";

const CrearUser = ({ isOpen, onClose }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="popup-overlay" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>CREAR NUEVO USUARIO</h2>
        <div className="grid-container">
          <div className="form-group">
            <label htmlFor="usuario">ID Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="Ingrese el ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese el nombre completo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="text"
              className="form-control"
              id="correo"
              placeholder="Ingrese el correo electrónico"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="contraseña"
                placeholder="Ingrese la contraseña"
              />
              <span
                className={`password-toggle ${
                  showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                }`}
                onClick={togglePasswordVisibility}
              ></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Rol">Estado</label>
            <select className="form-control" id="estado" defaultValue="">
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="opcion1">Activo</option>
              <option value="opcion2">Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Rol">Rol</label>
            <select className="form-control" id="rol" defaultValue="">
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="opcion1">Administrador</option>
              <option value="opcion2">Docente</option>
              <option value="opcion3">Estudiante</option>
            </select>
          </div>
        </div>
        <div className="buttons">
          <button
            className="btn btn-danger"
            onClick={onClose}
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </button>
          <button className="btn btn-success">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default CrearUser;
