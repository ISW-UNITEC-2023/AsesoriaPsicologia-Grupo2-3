import React, { useState } from "react";
import "../Styles/CSS/PopUp_CrearUser.css";
import "font-awesome/css/font-awesome.css";
import Services from "../Utilities/login-services";
import PropTypes from "prop-types";

const CrearUser = ({ isOpen, onClose, onUpdatePacientesList }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    id_account: null,
    role: "",
    name: "",
    email: "",
    password: "",
    active: null,
  });

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
              onChange={(event) => {
                setCredentials({
                  id_account: event.target.value,
                  role: credentials.role,
                  name: credentials.name,
                  email: credentials.email,
                  password: credentials.password,
                  active: credentials.active,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese el nombre completo"
              onChange={(event) => {
                setCredentials({
                  id_account: credentials.id_account,
                  role: credentials.role,
                  name: event.target.value,
                  email: credentials.email,
                  password: credentials.password,
                  active: credentials.active,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="text"
              className="form-control"
              id="correo"
              placeholder="Ingrese el correo electrónico"
              onChange={(event) => {
                setCredentials({
                  id_account: credentials.id_account,
                  role: credentials.role,
                  name: credentials.name,
                  email: event.target.value,
                  password: credentials.password,
                  active: credentials.active,
                });
              }}
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
                onChange={(event) => {
                  setCredentials({
                    id_account: credentials.id_account,
                    role: credentials.role,
                    name: credentials.name,
                    email: credentials.email,
                    password: event.target.value,
                    active: credentials.active,
                  });
                }}
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
            <select
              className="form-control"
              id="estado"
              defaultValue=""
              onChange={(event) => {
                let valor = -1;
                if (event.target.value === "opcion1") {
                  valor = 1;
                } else if (event.target.value === "opcion2") {
                  valor = 0;
                }

                setCredentials({
                  id_account: credentials.id_account,
                  role: credentials.role,
                  name: credentials.name,
                  email: credentials.email,
                  password: credentials.password,
                  active: valor,
                });
              }}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="opcion1">Activo</option>
              <option value="opcion2">Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Rol">Rol</label>
            <select
              className="form-control"
              id="rol"
              defaultValue=""
              onChange={(event) => {
                let valor = "";
                if (event.target.value === "opcion1") {
                  valor = "ADMIN";
                } else if (event.target.value === "opcion2") {
                  valor = "DOCENTE";
                } else if (event.target.value === "opcion3") {
                  valor = "ESTUDIANTE";
                } else if (event.target.value === "opcion4") {
                  valor = "PACIENTE";
                }

                setCredentials({
                  id_account: credentials.id_account,
                  role: valor,
                  name: credentials.name,
                  email: credentials.email,
                  password: credentials.password,
                  active: credentials.active,
                });
              }}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="opcion1">Administrador</option>
              <option value="opcion2">Docente</option>
              <option value="opcion3">Estudiante</option>
              <option value="opcion4">Paciente</option>
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
          <button
            className="btn btn-success"
            onClick={async () => {
              const response = await Services.registerUser(
                credentials.id_account,
                credentials.role,
                credentials.name,
                credentials.email,
                credentials.password,
                credentials.active
              );

              if (
                credentials.id_account === null ||
                credentials.role === "" ||
                credentials.name === "" ||
                credentials.email === "" ||
                credentials.password === "" ||
                credentials.active === null
              ) {
                // Aquí puedes mostrar una notificación o mensaje de error
                console.log("No puede dejar ningun campo vacio.");
              } else if (!!response.message) {
                // Aquí puedes mostrar una notificación o mensaje de error
                console.log("Un campo no es valido.");
              } else {
                // Aquí va un popup de creación exitosa
                console.log("El usuario se creó exitosamente");

                // Llama a la función de actualización para agregar el nuevo paciente a la lista
                onUpdatePacientesList({
                  nombre: credentials.name,
                  email: credentials.email,
                });

                // Cierra el popup después de crear el usuario exitosamente
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

export default CrearUser;

CrearUser.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdatePacientesList: PropTypes.func,
};