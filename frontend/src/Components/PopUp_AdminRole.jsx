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

  const [newRoles, setNewRoles] = useState({
    current: roles.length > 0 ? roles[0].id_role : null,
    new: [],
  });
  const [removedRoles, setRemovedRoles] = useState({
    current: user.roles.length > 0 ? user.roles[0][0] : null,
    removed: [],
  });

  function handleAddRole() {

  }

  function handleRemoveRole() {
    let infoRoles = removedRoles.removed;
    infoRoles.push(removedRoles.current);
    for (let i = 0 ; i < user.roles.length ; i++) {
      if (user.roles[i][0] === removedRoles.current) {
        user.roles.splice(i, 1);
        break;
      }
    }
    // setRemovedRoles({
    //   removed: infoRoles,
    //   current: user.roles.length > 0 ? user.roles[0][0] : null,
    // });
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
            <label>Current {removedRoles.current}</label>
            <div>
              <select
                className="select-box-rol"
                onChange={(e) => {
                  setRemovedRoles({
                    ...removedRoles,
                    current: e.target.value,
                  });
                }}
              >
                {user.roles.length > 0 ? (
                  user.roles.map((item) => {
                    return <option value={item[0]}>{item[1]}</option>;
                  })
                ) : (
                  <option>Ninguno</option>
                )}
              </select>
              {user.roles.length > 0 ? (
                <button
                  className="eliminar-rol-user"
                  onClick={() => {
                    handleRemoveRole();
                  }}
                >
                  Eliminar Rol
                  <FontAwesomeIcon icon={faTrash} className="admin-rol-icon" />
                </button>
              ) : (
                <button className="eliminar-rol-user" disabled>
                  Eliminar Rol
                  <FontAwesomeIcon icon={faTrash} className="admin-rol-icon" />
                </button>
              )}
            </div>
          </div>
          <div className="row-rol-disponibles">
            <label className="label-select-box">Roles disponibles</label>
            <label>
              Current {newRoles.current}
            </label>
            <div>
              <select
                className="select-box-rol"
                onChange={(e) => {
                  setNewRoles({
                    ...newRoles,
                    current: e.target.value,
                  });
                }}
              >
                {roles
                  .filter(
                    (role) =>
                      !user.roles.some(
                        (userRole) => userRole[0] === role.id_role
                      )
                  )
                  .map((item) => {
                    return (
                      <option value={item.id_role}>{item.name_role}</option>
                    );
                  })}
              </select>
              <button
                className="agregar-rol-user"
                onClick={() => {
                  handleAddRole();
                }}
              >
                Agregar Rol
                <FontAwesomeIcon icon={faPlus} className="admin-rol-icon" />
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
