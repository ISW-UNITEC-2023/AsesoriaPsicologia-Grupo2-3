import React, { useState, useEffect } from "react";
import "./PopUp_EditarUser.css";
import "font-awesome/css/font-awesome.css";
import Services from '../../../utils/services';

const EditarUser = ({ isOpen, onClose }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [credentials, setCredentials] = useState({
    id_account: localStorage.getItem("id_account"),
    role: localStorage.getItem("role"),
    active: localStorage.getItem("active"),
  })

  const borrarStorage = () => {
    localStorage.removeItem("id_account");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("active");
    localStorage.removeItem("role");
  };
  
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
              placeholder={localStorage.getItem("id_account")}
              value={localStorage.getItem("id_account")}
              readOnly={true}
              disabled={true} // Deshabilitar la caja de texto
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder={localStorage.getItem("name")}
              value={localStorage.getItem("name")}
              // onChange={(event) => {
              //   setCredentials({
              //     id_account: credentials.id_account,
              //     role: credentials.role,
              //     name: event.target.value,
              //     active: credentials.active,
              //   })
              // }}
              readOnly={true}
              disabled={true} // Deshabilitar la caja de texto
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="text"
              className="form-control"
              id="correo"
              placeholder={localStorage.getItem("email")}
              value={localStorage.getItem("email")}
              readOnly={true}
              disabled={true} // Deshabilitar la caja de texto
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <div className="password-input">
              <input
                type="password" // Cambia el tipo a "password"
                className="form-control"
                id="contraseña"
                placeholder=""
                readOnly={true}
                disabled={true} // Deshabilitar la caja de texto
              />
              <span className="password-toggle fa fa-eye-slash"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Rol">Estado</label>
            <select className="form-control" id="estado" defaultValue=""
            onChange={(event) => {
              let valor = -1;
              if(event.target.value === "opcion1"){
                valor = 1;
              }else if(event.target.value === "opcion2"){
                valor = 0;
              }

              setCredentials({
                id_account: credentials.id_account,
                role: credentials.role,
                active: valor,
              })
            }}>
              <option value="" disabled>
              {localStorage.getItem("active")}
              </option>
              <option value="opcion1">Activo</option>
              <option value="opcion2">Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Rol">Rol</label>
            <select className="form-control" id="rol" defaultValue=""
             onChange={(event) => {
              let valor = "";
              if(event.target.value === "opcion1"){
                valor = "ADMIN";
              }else if(event.target.value === "opcion2"){
                valor = "DOCENTE";
              }else if(event.target.value === "opcion3"){
                valor = "ESTUDIANTE"
              }else if(event.target.value === "opcion4"){
                valor = "PACIENTE"
              }

              setCredentials({
                id_account: credentials.id_account,
                role: valor,
                active: credentials.active,
              })
            }}>
              <option value="" disabled>
              {localStorage.getItem("role")}
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
            onClick={ () =>{
              onClose();
              borrarStorage();
              
            }}
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </button>
          <button className="btn btn-success"
          onClick={async () => {
            await Services.updateUser(credentials.id_account, credentials.role, credentials.active);

            if(credentials.role === "" || credentials.active === null){
              //aqui pop up si dejo vacio algun campo
              console.log("No puede dejar ningun campo vacio.")
            }else{
              borrarStorage();
              //aqui va el popup con mensaje de modificacion exitosa
              console.log("El usuario se modifico exitosamente")
            }
            
          }}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarUser;