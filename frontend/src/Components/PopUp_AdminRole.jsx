import React, { useState } from "react";
import "../Styles/CSS/PopUp_AdminRole.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const PopUpAdminRole = ({ isOpen, onClose, user, roles }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [newRoles, setNewRoles] = useState([])
  const [removedRoles, setRemovedRoles] = useState([])

  function handleAddRole(){

  }

  function handleRemoveRole(){

  }

  async function guardarRoles() {
    onClose();
  }

  return (
    <div className="popup-overlay-ar" style={overlayStyle}>
      <div className="popup-ar" style={popupStyle}>
        <div className="form-header-ar">
          <h2 className="form-title-ar">Administración de Roles</h2>
          <FontAwesomeIcon
            className="close-icon-ar"
            icon={faRightFromBracket}
            onClick={onClose}
          />
        </div>
        <div className="form-body-ar">
          <div className="row-rol-usuario">
            <label className="label-select-box">Roles de Usuario</label>
            <div>
              <select className="select-box-rol">
                {user.roles.length > 0 ? (
                  user.roles.map((item) => {
                    return <option value={item[0]}>{item[1]}</option>;
                  })
                ) : (
                  <option>Ninguno</option>
                )}
              </select>
              {user.roles.length > 0 ? (
                <button className="eliminar-rol-user">
                  Eliminar Rol
                  <FontAwesomeIcon icon={faTrash} className="admin-rol-icon"/>
                </button>
              ):(
                <button className="eliminar-rol-user" disabled>
                  Eliminar Rol
                  <FontAwesomeIcon icon={faTrash} className="admin-rol-icon"/>
                </button>
              )}
            </div>
          </div>
          <div className="row-rol-disponibles">
            <label className="label-select-box">Roles disponibles</label>
            <div>
              <select className="select-box-rol">
                {roles.map((item) => {
                  return <option value={item.id_role}>{item.name_role}</option>;
                })}
              </select>
              <button className="agregar-rol-user">
                Agregar Rol
                <FontAwesomeIcon icon={faPlus} className="admin-rol-icon"/>
              </button>
            </div>
          </div>
          <div className="form-buttons-ar">
            <button className="form-cancel-ar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpAdminRole;
