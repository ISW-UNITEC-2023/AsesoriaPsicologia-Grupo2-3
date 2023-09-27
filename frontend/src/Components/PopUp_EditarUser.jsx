import React, { useState } from "react";
import "../Styles/CSS/PopUp_EditarUser.css";
import "font-awesome/css/font-awesome.css";
import Services from "../Utilities/login-services.js";

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
    <div className="popup-overlay" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>EDITAR USUARIO</h2>
        <div className="grid-container">
          <div className="form-group">
            <label htmlFor="usuario">ID Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder={user.id_account}
              value={user.id_account}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder={user.nombre}
              value={user.nombre}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="text"
              className="form-control"
              id="correo"
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
                type="password"
                className="form-control"
                id="contraseña"
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
              className="form-control"
              id="estado"
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
              className="form-control"
              id="rol"
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
