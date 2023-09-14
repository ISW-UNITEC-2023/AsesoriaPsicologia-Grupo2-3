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
              placeholder={credentials.id_account}
              value={credentials.id_account}
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
              <option value="" disabled>
                {user.active}
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
              defaultValue={credentials.role} // Establece el valor predeterminado
            >
              <option value="" disabled>
                {user.role}
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
              await Services.updateUser(
                credentials.id_account,
                credentials.role,
                credentials.active
              );

              if (credentials.role === "" || credentials.active === null) {
                console.log("No puede dejar ningun campo vacio.");
              } else {
                borrarStorage();
                console.log("El usuario se modifico exitosamente");
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
