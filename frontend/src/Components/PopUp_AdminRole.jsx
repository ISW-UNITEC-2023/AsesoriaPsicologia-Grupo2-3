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
  const [defaultData, setDefaultData] = useState({
    userRoles: user.roles.length > 0 ? user.roles : null,
    availableRoles: roles.length > 0 ? roles : null,
  });

  function handleAddRole() {
    let newRole = defaultData.availableRoles.find((element)=>{
      return element.id_role === newRoles.current;
    })
    let newAvailableRoles = defaultData.availableRoles.filter((element)=>{
      return element.id_role !== newRoles.current;
    })
    setDefaultData({
      ...defaultData,
      userRoles: [...defaultData.userRoles, newRole],
      availableRoles: newAvailableRoles
    })
    setNewRoles({
      ...newRoles,
      current: newAvailableRoles.length > 0 ? newAvailableRoles[0].id_role : null,
      new: [...newRoles.new, newRole]
    })
  }

  function handleRemoveRole() {}

  async function guardarRoles() {
    console.log(newRoles.new)
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
            <div className="row-select-button">
              <select className="select-box-rol">
                {defaultData.userRoles > 0 ? (
                  defaultData.userRoles.map((item) => {
                    return (
                      <option
                        onSelect={setNewRoles({
                          current: item,
                        })}
                        value={item[0]}
                      >
                        {item[1]}
                      </option>
                    );
                  })
                ) : (
                  <option>Ninguno</option>
                )}
              </select>
              {defaultData.userRoles > 0 ? (
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
            <div className="row-select-button">
              <select
                value={newRoles.current}
                className="select-box-rol"
                onChange={(e) => {
                  setNewRoles({
                    ...newRoles,
                    current: parseInt(e.target.value),
                  });
                }}
              >
                {defaultData.availableRoles.map((item) => {
                  return (
                    <option key={item.id_role} value={item.id_role}>
                      {item.name_role}
                    </option>
                  );
                })}
              </select>
              {defaultData.availableRoles.length > 0 ? (
                <button className="agregar-rol-user" onClick={handleAddRole}>
                  Agregar Rol
                  <FontAwesomeIcon icon={faPlus} className="admin-rol-icon" />
                </button>
              ) : (
                <button className="agregar-rol-user" disabled>
                  Agregar Rol
                  <FontAwesomeIcon icon={faPlus} className="admin-rol-icon" />
                </button>
              )}
            </div>
          </div>
          <div className="form-buttons-ar">
            <button className="form-cancel-ar" onClick={onClose}>
              Cancelar
            </button>
            <button className="form-submit-ar" onClick={guardarRoles}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpAdminRole;
