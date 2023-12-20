//Components
import Navbar from "../Components/Navbar";
import { Modal } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";

//Functions
import { useEffect, useState } from "react";
import rolesServices from "../Utilities/roles-services";

//Styles and Icons
import "../Styles/CSS/RoleAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import rolesImg from "../Styles/Images/rolesimg.png";

const RoleAdmin = (props) => {
  function havePrivilege(privilege) {
    // console.log("Esto es lo que voy a comparar", props.verifyRef);
    if (privilege) {
      return props.verifyRef.current.privileges.includes(privilege);
    } else {
      return false;
    }
  }

  const [privileges, setPrivileges] = useState([]);
  const [roles, setRoles] = useState([]);

  const [rolesPrivileges, setRolesPrivileges] = useState({
    id_role: [],
    current: roles.length ? roles[0].id_role : null,
    currentPriv: privileges.length ? privileges[0].id_privilege : null,
    privileges: [],
    checkedPrivileges: [],
  });

  const [dataOriginal, setDataOriginal] = useState({
    data: [],
    filled: 0,
  });

  const [openCreate, setOpenCreate] = useState({
    open: 0,
    name: "",
    description: "",
  });

  const [modalOpen, setModalOpen] = useState({
    type: "",
    open: 0,
  });

  const abrirModal = (columna) => {
    setModalOpen({
      type: columna,
      open: 1,
    });
  };

  useEffect(() => {
    async function fetchInfo() {
      const data1 = await rolesServices.getAllPrivileges();
      setPrivileges(data1);
      const data2 = await rolesServices.getAllRoles();
      setRoles(data2);
      await refreshPrivileges(data2, data1);
    }
    fetchInfo();
  }, []);

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
    if (rolesPrivileges.privileges.length === 0) {
      return null;
    }

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
        ][i];
      }
    }
  };

  const handleCheck = (idP, idR, index2) => {
    const idPriv = idP;
    const idRole = idR;
    const checks = rolesPrivileges.checkedPrivileges;
    const id_roles = rolesPrivileges.id_role;
    const privs = rolesPrivileges.privileges;
    const index = id_roles.indexOf(idRole);

    if (checks[index][index2] === true) {
      checks[index][index2] = false;
      privs[index] = privs[index].filter(
        (privilege) => privilege.id_privilege !== idPriv
      );
    } else {
      checks[index][index2] = true;
      privs[index].push({
        id_privilege: idPriv,
        privilege: 1,
      });
    }
    setRolesPrivileges({
      ...rolesPrivileges,
      checkedPrivileges: checks,
      privileges: privs,
    });
    console.log("Checks", checks[index]);
    console.log("Dataorigin", dataOriginal.data[index]);
  };

  async function refreshPrivileges(rolesData, privilegesData) {
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
      privilegesData.map((privilege) => {
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
      currentPriv: privilegesData[0].id_privilege,
      id_role: id_roles,
      privileges: rolesprivileges,
      checkedPrivileges: checks,
    });
    if (dataOriginal.filled === 0) {
      setDataOriginal({
        data: checks,
        filled: 1,
      });
    }
  }

  async function createRole() {
    if (openCreate.name === "" || openCreate.description === "") {
      toast.error("Debe llenar todos los campos!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    await rolesServices.createRole(openCreate.name, openCreate.description);
    const data = await rolesServices.getAllRoles();
    setRoles(data);
    const data2 = await rolesServices.getAllPrivileges();
    setPrivileges(data2);
    await refreshPrivileges(data, data2);
    toast.success("Rol creado exitosamente!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    setOpenCreate({
      open: 0,
      name: "",
      description: "",
    });
  }

  async function guardarCambios() {
    const rolesData = rolesPrivileges.id_role;
    const checks = rolesPrivileges.checkedPrivileges;
    const data = dataOriginal.data;
    const id_roles = rolesPrivileges.id_role;

    console.log("rolesData", rolesData);
    console.log("id_roles", id_roles);
    console.log("checks", checks);
    console.log("data", data);

    for (let i = 0; i < rolesData.length; i++) {
      for (let j = 0; j < checks[i].length; j++) {
        if (checks[i][j] == true) {
          await rolesServices.assignPrivilegesToRole(
            id_roles[i],
            privileges[j].id_privilege
          );
        } else {
          await rolesServices.removePrivilegeFromRole(
            id_roles[i],
            privileges[j].id_privilege
          );
        }
      }
    }
  }

  async function eliminarRol() {
    const req = await rolesServices.deleteRole(rolesPrivileges.current);
    console.log(req);
    const data = await rolesServices.getAllRoles();
    setRoles(data);
    const data2 = await rolesServices.getAllPrivileges();
    setPrivileges(data2);
    await refreshPrivileges(data, data2);
    setModalOpen({
      type: "",
      open: 0,
    });
  }

  if (havePrivilege(78))
    return (
      <div className='role-admin-page'>
        <Navbar userData={props.userData} />
        <Modal
          isOpen={modalOpen.open}
          backdrop={true}
          keyboard={true}
          style={{
            position: "absolute",
            top: modalOpen.type === "eliminar" ? "35%" : "10%",
            left: modalOpen.type === "eliminar" ? "35%" : "25%",
            width: "100%",
            maxWidth: modalOpen.type === "eliminar" ? "30%" : "50%",
          }}
        >
          <div className='modal-container-ra'>
            {modalOpen.type === "eliminar" ? (
              <>
                <div>
                  <h2 className='modal-title'>
                    ¿Seguro que desea eliminar este rol ?
                  </h2>
                </div>
                <div className='modal-div-ra'>
                  <button
                    className='confirmar-modal-ra'
                    onClick={() => {
                      eliminarRol();
                    }}
                  >
                    Confirmar
                  </button>
                  <button
                    className='cancelar-modal-ra'
                    onClick={() => {
                      setModalOpen({
                        type: "",
                        open: 0,
                      });
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='modal-div-ra'>
                  <h2 className='title-privileges-container'>
                    Seleccionar un Elemento
                  </h2>
                  <select
                    className='select-privileges-box'
                    value={rolesPrivileges.currentPriv}
                    onChange={(e) => {
                      setRolesPrivileges({
                        ...rolesPrivileges,
                        currentPriv: parseInt(e.target.value),
                      });
                    }}
                  >
                    {privileges.length > 0 ? (
                      privileges
                        .filter((element, index, self) => {
                          return (
                            index ===
                            self.findIndex(
                              (e) => e.id_elemento === element.id_elemento
                            )
                          );
                        })
                        .map((element) => (
                          <option
                            key={element.id_privilege}
                            value={element.id_privilege}
                          >
                            {element.id_elemento}
                          </option>
                        ))
                    ) : (
                      <option value='0'>No hay privilegios</option>
                    )}
                  </select>
                  <span className='span-descripcion-ra'>
                    Marca las casillas correspondientes a los privilegios que
                    deseas asignar a este rol. Asegúrate de revisar
                    detenidamente cada privilegio para garantizar una asignación
                    precisa.
                  </span>
                  <div className='editar-privilegios-ra'>
                    <button
                      className='botones-editar-privilegio'
                      onClick={() => {
                        guardarCambios();
                        setModalOpen({
                          type: "",
                          open: 0,
                        });
                      }}
                    >
                      Confirmar
                    </button>
                    <button
                      className='botones-editar-privilegio'
                      onClick={() => {
                        setModalOpen({
                          type: "",
                          open: 0,
                        });
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
                <div className='modal-div-ra'>
                  <h2 className='title-privileges-container'>Permisos</h2>
                  <div className='privilege-container-ra'>
                    {privileges.map((privilege) => (
                      <>
                        {rolesPrivileges.id_role.map(
                          (id_role) =>
                            id_role === rolesPrivileges.current &&
                            privileges.find(
                              (element) =>
                                element.id_privilege ===
                                rolesPrivileges.currentPriv
                            ).id_elemento === privilege.id_elemento && (
                              <div className='row-privilege-ra'>
                                <input
                                  type='checkbox'
                                  className='privilege-checkbox-ra'
                                  checked={getCheckedPrivilege(
                                    privilege.id_privilege,
                                    id_role
                                  )}
                                  onChange={() =>
                                    handleCheck(
                                      privilege.id_privilege,
                                      id_role,
                                      privileges.indexOf(privilege)
                                    )
                                  }
                                />
                                <label className='privilege-label-ra'>
                                  {privilege.description}
                                </label>
                              </div>
                            )
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
        <div className='role-admin-box'>
          <div className='form-header-ra'>
            <div column='column-header-ra'>
              <h2 className='form-title-ra'>Administración de Roles</h2>
              <span className='span-descripcion-ra'>
                Todos los que trabajen en tu página pueden tener un rol distinto
                según en lo que deban trabajar.
              </span>
            </div>
            <div className='column-header-ra'>
              <img src={rolesImg} alt='' className='roles-admin-img' />
            </div>
          </div>
          <div className='form-body-ra'>
            <h2 className='title-columns-ra'>Roles Disponibles</h2>
            <div className='roles-container-box'>
              {roles.length > 0 ? (
                roles.map((role) => (
                  <div
                    key={role.id_role}
                    value={role.id_role}
                    className='card-box-role'
                  >
                    <label>{role.name_role}</label>
                    <div className='botones-role-box'>
                      <button
                        className='boton-editar-role'
                        onClick={() => {
                          abrirModal("editar");
                          setRolesPrivileges({
                            ...rolesPrivileges,
                            current: role.id_role,
                          });
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          abrirModal("eliminar"),
                            setRolesPrivileges({
                              ...rolesPrivileges,
                              current: role.id_role,
                            });
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='card-box-role'>
                  <label>No hay roles creados</label>
                </div>
              )}
            </div>
            <h2 className='title-columns-ra'>Crear un rol de página</h2>
            <div className='container-crear-rol'>
              <div className='input-group-crear-rol'>
                <input
                  className='nombre-crear-rol'
                  placeholder='Escribe un nombre'
                  required
                  value={openCreate.name}
                  onChange={(e) => {
                    setOpenCreate({
                      ...openCreate,
                      name: e.target.value,
                    });
                  }}
                ></input>
                <textarea
                  className='descripcion-crear-rol'
                  placeholder='Escribe una descripción'
                  required
                  value={openCreate.description}
                  onChange={(e) => {
                    setOpenCreate({
                      ...openCreate,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <button
                className='boton-crear-rol'
                onClick={() => {
                  createRole();
                }}
              >
                Crear Rol
              </button>
            </div>
          </div>
        </div>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    );
  else {
    return (
      <div className='flex justify-center items-center h-screen'>
        No tienes permisos para ver los roles
      </div>
    );
  }
};

export default RoleAdmin;
