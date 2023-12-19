import React, { useEffect, useState } from "react";
import "../Styles/CSS/PopUp_AdminRole.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import userServices from "../Utilities/user-services";

const PopUpAdminRole = ({ isOpen, onClose, user, roles, creator }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [newRoles, setNewRoles] = useState({
    current:
      roles.length > 0
        ? roles.filter((element) => {
            return !user.roles.some((item) => {
              return item[0] === element.id_role;
            });
          })[0].id_role
        : null,
  });

  const [removedRoles, setRemovedRoles] = useState({
    current: user.roles.length > 0 ? user.roles[0][0] : null,
  });

  const [defaultData, setDefaultData] = useState({
    userRoles:
      user.roles.length > 0
        ? user.roles.map((item) => {
            return { id_role: item[0], name_role: item[1] };
          }, [])
        : [],
    availableRoles:
      roles.length > 0
        ? roles.filter((element) => {
            return !user.roles.some((item) => {
              return item[0] === element.id_role;
            });
          })
        : [],
  });

  function handleAddRole() {
    let newRole = defaultData.availableRoles.filter((element) => {
      return element.id_role === newRoles.current;
    });
    let newAvailableRoles = defaultData.availableRoles.filter((element) => {
      return element.id_role !== newRoles.current;
    });
    let newUserRoles = [
      ...defaultData.userRoles,
      { id_role: newRole[0].id_role, name_role: newRole[0].name_role },
    ];
    setDefaultData({
      ...defaultData,
      userRoles: newUserRoles,
      availableRoles: newAvailableRoles,
    });
    setNewRoles({
      current:
        newAvailableRoles.length > 0 ? newAvailableRoles[0].id_role : null,
    });
    setRemovedRoles({
      current: newUserRoles.length > 0 ? newUserRoles[0].id_role : null,
    });
  }

  function handleRemoveRole() {
    let removedRole = roles.filter((element) => {
      return element.id_role === removedRoles.current;
    });
    let newUserRoles = defaultData.userRoles.filter((element) => {
      return element.id_role !== removedRoles.current;
    });
    let newAvailableRoles = [
      ...defaultData.availableRoles,
      {
        id_role: removedRole[0].id_role,
        name_role: removedRole[0].name_role,
      },
    ];
    setDefaultData({
      ...defaultData,
      userRoles: newUserRoles,
      availableRoles: newAvailableRoles,
    });
    setRemovedRoles({
      current: newUserRoles.length > 0 ? newUserRoles[0].id_role : null,
    });
    setNewRoles({
      current:
        newAvailableRoles.length > 0 ? newAvailableRoles[0].id_role : null,
    });
  }

  async function guardarRoles() {
    let userRolesData =
      user.roles.length > 0
        ? user.roles.map((item) => {
            return { id_role: item[0], name_role: item[1] };
          }, [])
        : [];
    let toAdd = defaultData.userRoles.filter((element) => {
      return !userRolesData.some((item) => {
        return item.id_role === element.id_role;
      });
    });
    let toRemove = userRolesData.filter((element) => {
      return !defaultData.userRoles.some((item) => {
        return item.id_role === element.id_role;
      });
    });
    //Asignar y Remover Roles
    for (let i = 0; i < toAdd.length; i++) {
      console.log(creator);
      await userServices.assignRole({
        id: user.id_user,
        role: toAdd[i].id_role,
        creator: creator,
      });
    }
    for (let i = 0; i < toRemove.length; i++) {
      await userServices.removeRole({
        id: user.id_user,
        role: toRemove[i].id_role,
      });
    }
    onClose();
  }

  return (
    <div className='popup-overlay-ar' style={overlayStyle}>
      <div className='popup-ar' style={popupStyle}>
        <div className='form-header-ar'>
          <h2 className='form-title-ar'>Administración de Roles</h2>
          <FontAwesomeIcon
            className='close-icon-ar'
            icon={faRightFromBracket}
            onClick={onClose}
          />
        </div>
        <div className='form-body-ar'>
          <div className='row-rol-usuario'>
            <label className='label-select-box'>Roles de Usuario</label>
            <div className='row-select-button'>
              <select
                className='select-box-rol'
                value={removedRoles.current}
                onChange={(e) => {
                  setRemovedRoles({
                    ...removedRoles,
                    current: parseInt(e.target.value),
                  });
                }}
              >
                {defaultData.userRoles.length > 0 ? (
                  defaultData.userRoles.map((item) => {
                    return (
                      <option value={item.id_role}>{item.name_role}</option>
                    );
                  })
                ) : (
                  <option>Ninguno</option>
                )}
              </select>
              {defaultData.userRoles.length > 0 ? (
                <button
                  className='eliminar-rol-user'
                  onClick={() => {
                    handleRemoveRole();
                  }}
                >
                  Eliminar Rol
                  <FontAwesomeIcon icon={faTrash} className='admin-rol-icon' />
                </button>
              ) : (
                <button className='eliminar-rol-user' disabled>
                  Eliminar Rol
                  <FontAwesomeIcon icon={faTrash} className='admin-rol-icon' />
                </button>
              )}
            </div>
          </div>
          <div className='row-rol-disponibles'>
            <label className='label-select-box'>Roles disponibles</label>
            <div className='row-select-button'>
              <select
                value={newRoles.current}
                className='select-box-rol'
                onChange={(e) => {
                  setNewRoles({
                    ...newRoles,
                    current: parseInt(e.target.value),
                  });
                }}
              >
                {defaultData.availableRoles.length > 0 ? (
                  defaultData.availableRoles.map((item) => {
                    return (
                      <option key={item.id_role} value={item.id_role}>
                        {item.name_role}
                      </option>
                    );
                  })
                ) : (
                  <option>Ninguno</option>
                )}
              </select>
              {defaultData.availableRoles.length > 0 ? (
                <button className='agregar-rol-user' onClick={handleAddRole}>
                  Agregar Rol
                  <FontAwesomeIcon icon={faPlus} className='admin-rol-icon' />
                </button>
              ) : (
                <button className='agregar-rol-user' disabled>
                  Agregar Rol
                  <FontAwesomeIcon icon={faPlus} className='admin-rol-icon' />
                </button>
              )}
            </div>
          </div>
          <div className='form-buttons-ar'>
            <button className='form-cancel-ar' onClick={onClose}>
              Cancelar
            </button>
            <button className='form-guardar-ar' onClick={guardarRoles}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpAdminRole;
