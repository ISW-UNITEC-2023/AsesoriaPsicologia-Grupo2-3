//Functions
import { useEffect, useState } from "react";
import rolesServices from "../Utilities/roles-services";

//Styles and Icons
import "../Styles/CSS/RoleAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const RoleAdmin = ({ isOpen, onClose, roles }) => {
  const [privileges, setPrivileges] = useState([]);
  const [rolesPrivileges, setRolesPrivileges] = useState({
    id_role: [],
    current: roles.length ? roles[0].id_role : null,
    privileges: [],
  });
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const evaluatePrivileges = (id, idRol) => {
    for (
      let i = 0;
      i <
      rolesPrivileges.privileges[rolesPrivileges.id_role.indexOf(idRol)].length;
      i++
    ) {
      if (
        rolesPrivileges.privileges[rolesPrivileges.id_role.indexOf(idRol)][i]
          .id_privilege === id
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    async function getPrivileges() {
      const data = await rolesServices.getAllPrivileges();
      setPrivileges(data);
      const rolesprivileges = [];
      const id_roles = [];
      for (let i = 0; i < roles.length; i++) {
        const data2 = await rolesServices.getAllRolesPrivileges(
          roles[i].id_role
        );
        rolesprivileges.push(data2.roleInfo);
        id_roles.push(roles[i].id_role);
      }
      setRolesPrivileges({
        current: roles[0].id_role,
        id_role: id_roles,
        privileges: rolesprivileges,
      });
    }
    getPrivileges();
  }, []);

  return (
    <div className="popup-overlay-ra" style={overlayStyle}>
      <div className="popup-ra" style={popupStyle}>
        <div className="form-header-ra">
          <h2 className="form-title-ra">Administración de Roles</h2>
          <FontAwesomeIcon
            className="close-icon-ra"
            icon={faRightFromBracket}
            onClick={onClose}
          />
        </div>
        <div className="form-body-ra">
          <div className="column-ra-1">
            <h2 className="title-columns-ra">Roles Disponibles</h2>
            <select
              className="select-roles-box"
              value={rolesPrivileges.current}
              onChange={(e) => {
                setRolesPrivileges({
                  ...rolesPrivileges,
                  current: parseInt(e.target.value),
                });
              }}
            >
              {roles.length > 0 ? (
                roles.map((role) => (
                  <option value={role.id_role}>{role.name_role}</option>
                ))
              ) : (
                <option value="0">No hay roles</option>
              )}
            </select>
            <h2 className="title-descripcion-ra">Descripción de Rol</h2>
            <span className="span-descripcion-ra">
              {
                roles.find((role) => role.id_role === rolesPrivileges.current)
                  ?.description_role
              }
            </span>
          </div>
          <div className="column-ra-2">
            <h2 className="title-columns-ra">Privilegios</h2>
            <div className="privilege-container-ra">
              {privileges.map((privilege) => (
                <div className="row-privilege-ra">
                  {rolesPrivileges.id_role.map(
                    (id_role) =>
                      id_role === rolesPrivileges.current && (
                        <input
                          type="checkbox"
                          name="privilege"
                          className="privilege-checkbox-ra"
                          value={privilege.id_privilege}
                          checked={evaluatePrivileges(
                            privilege.id_privilege,
                            id_role
                          )}
                        />
                      )
                  )}
                  <label className="privilege-crud">
                    {privilege.privilege === 1
                      ? "C"
                      : privilege.privilege === 2
                      ? "R"
                      : privilege.privilege === 3
                      ? "U"
                      : "D"}
                  </label>
                  <label>{privilege.id_elemento}</label>
                </div>
              ))}
            </div>
            <h2 className="title-columns-ra">Permisos</h2>
            <div className="crud-titles">
              <label className="crud-data">C | Crear</label>
              <label className="crud-data">R | Acceder</label>
              <label className="crud-data">U | actualizar</label>
              <label className="crud-data">D | Borrar</label>
            </div>
          </div>
        </div>
        <div className="form-footer-ra">
          <div className="crud-botones-roles">
            <label className="editar-rol-label-ra">
              Crear Rol
              <FontAwesomeIcon className="editar-rol-pencil-ra" icon={faPlus} />
            </label>
            <label className="editar-rol-label-ra">
              Editar Rol
              <FontAwesomeIcon
                className="editar-rol-pencil-ra"
                icon={faPencil}
              />
            </label>
            <label className="editar-rol-label-ra">
              Eliminar Rol
              <FontAwesomeIcon
                className="editar-rol-pencil-ra"
                icon={faTrash}
              />
            </label>
          </div>
          <button className="ra-cancelar-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="ra-guardar-button">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default RoleAdmin;
