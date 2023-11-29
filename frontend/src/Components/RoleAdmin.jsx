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

const RoleAdmin = ({ isOpen, onClose, dataRoles }) => {
  const [privileges, setPrivileges] = useState([]);
  const [roles, setRoles] = useState(dataRoles);
  const [rolesPrivileges, setRolesPrivileges] = useState({
    id_role: [],
    current: roles.length ? roles[0].id_role : null,
    privileges: [],
    checkedPrivileges: [],
    originalChecks: [],
  });
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };
  const [openCreate, setOpenCreate] = useState({
    open: 0,
    name: "",
    description: "",
  });

  const evaluatePrivileges = (rolesprivileges, id_roles, idPriv, idRole) => {
    for (let i = 0; i < rolesprivileges[id_roles.indexOf(idRole)].length; i++) {
      if (
        rolesprivileges[id_roles.indexOf(idRole)][i].id_privilege === idPriv
      ) {
        return true;
      }
    }
    return false;
  };

  const getCheckedPrivilege = (idPriv, idRole) => {
    for (
      let i = 0;
      i <
      rolesPrivileges.privileges[rolesPrivileges.id_role.indexOf(idRole)]
        .length;
      i++
    ) {
      if (
        rolesPrivileges.privileges[rolesPrivileges.id_role.indexOf(idRole)][i]
          .id_privilege === idPriv
      ) {
        return rolesPrivileges.privileges[
          rolesPrivileges.id_role.indexOf(idRole)
        ][i].privilege;
      }
    }
  };

  const handleCheck = (e) => {
    const idPriv = parseInt(e.target.value);
    const idRole = parseInt(e.target.name);
    const checks = rolesPrivileges.checkedPrivileges;
    const id_roles = rolesPrivileges.id_role;
    const privileges = rolesPrivileges.privileges;
    const index = id_roles.indexOf(idRole);
    const index2 = privileges[index].findIndex(
      (privilege) => privilege.id_privilege === idPriv
    );

    if (e.target.checked) {
      if (index2 === -1) {
        privileges[index].push({
          id_privilege: idPriv,
          privilege: 1,
        });
      } else {
        privileges[index][index2].privilege = 1;
      }
    } else {
      if (index2 === -1) {
        privileges[index].push({
          id_privilege: idPriv,
          privilege: 0,
        });
      } else {
        privileges[index][index2].privilege = 0;
      }
    }
    checks[index] = privileges[index].map((privilege) => privilege.privilege);
    setRolesPrivileges({
      ...rolesPrivileges,
      checkedPrivileges: checks,
      privileges: privileges,
    });
  };

  async function refreshPrivileges(rolesData) {
    const rolesprivileges = [];
    const id_roles = [];
    const checks = [];

    for (let i = 0; i < rolesData.length; i++) {
      const data2 = await rolesServices.getAllRolesPrivileges(
        rolesData[i].id_role
      );
      rolesprivileges.push(data2.roleInfo);
      id_roles.push(rolesData[i].id_role);
    }

    rolesData.map((role) => {
      const check = [];
      privileges.map((privilege) => {
        check.push(
          evaluatePrivileges(
            rolesprivileges,
            id_roles,
            privilege.id_privilege,
            role.id_role
          )
        );
      });
      checks.push(check);
    });

    setRolesPrivileges({
      current: rolesData[0].id_role,
      id_role: id_roles,
      privileges: rolesprivileges,
      checkedPrivileges: checks,
      originalChecks: checks,
    });
  }

  async function createRole() {
    await rolesServices.createRole(openCreate.name, openCreate.description);
    const data = await rolesServices.getAllRoles();
    setRoles(data);
    await refreshPrivileges(data);
    setOpenCreate({
      open: 0,
      name: "",
      description: "",
    });
  }

  useEffect(() => {
    async function extractData() {
      const data = await rolesServices.getAllPrivileges();
      setPrivileges(data);
    }
    extractData();
  }, []);

  useEffect(() => {
    async function getPrivileges() {
      const rolesprivileges = [];
      const id_roles = [];
      const checks = [];

      for (let i = 0; i < roles.length; i++) {
        const data2 = await rolesServices.getAllRolesPrivileges(
          roles[i].id_role
        );
        rolesprivileges.push(data2.roleInfo);
        id_roles.push(roles[i].id_role);
      }

      roles.map((role) => {
        const check = [];
        privileges.map((privilege) => {
          check.push(
            evaluatePrivileges(
              rolesprivileges,
              id_roles,
              privilege.id_privilege,
              role.id_role
            )
          );
        });
        checks.push(check);
      });

      setRolesPrivileges({
        current: roles[0].id_role,
        id_role: id_roles,
        privileges: rolesprivileges,
        checkedPrivileges: checks,
        originalChecks: checks,
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
          <div className="column-row-ra">
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
              {openCreate.open === 1 ? (
                <div className="create-role-form">
                  <h2 className="title-descripcion-ra">Crear nuevo Rol</h2>
                  <label className="label-create-ra">Nombre de Rol</label>
                  <input
                    required
                    className="create-role-input"
                    type="text"
                    value={openCreate.name}
                    onChange={(e) => {
                      setOpenCreate({
                        ...openCreate,
                        name: e.target.value,
                      });
                    }}
                  />
                  <label className="label-create-ra">Descripción de Rol</label>
                  <textarea
                    required
                    className="create-role-area"
                    type="text"
                    value={openCreate.description}
                    onChange={(e) => {
                      setOpenCreate({
                        ...openCreate,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              ) : null}
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
                            name={id_role}
                            className="privilege-checkbox-ra"
                            value={privilege.id_privilege}
                            checked={getCheckedPrivilege(
                              privilege.id_privilege,
                              id_role
                            )}
                            onChange={(e) => handleCheck(e)}
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
            {openCreate.open === 0 ? (
              <div className="crud-botones-roles">
                <label
                  className="editar-rol-label-ra"
                  onClick={() => {
                    setOpenCreate({
                      ...openCreate,
                      open: 1,
                    });
                  }}
                >
                  Crear Rol
                  <FontAwesomeIcon
                    className="editar-rol-pencil-ra"
                    icon={faPlus}
                  />
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
            ) : (
              <div className="botones-crear-role">
                <button
                  className="crear-role-ra"
                  onClick={() => {
                    createRole();
                  }}
                >
                  Crear
                </button>
                <button
                  className="cancelar-role-ra"
                  onClick={() => {
                    setOpenCreate({
                      open: 0,
                      name: "",
                      description: "",
                    });
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
            {openCreate.open === 0 ? (
              <>
                <button className="ra-cancelar-button" onClick={onClose}>
                  Cancelar
                </button>
                <button className="ra-guardar-button">Guardar</button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleAdmin;
