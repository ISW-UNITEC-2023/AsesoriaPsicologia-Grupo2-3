//Components
import Navbar from "../Components/Navbar";
import PopUpCrearUser from "../Components/PopUp_CrearUser";
import PopUpEditUser from "../Components/PopUp_EditarUser";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PopUpAdminRole from "../Components/PopUp_AdminRole";

//Functions
import { useEffect, useState } from "react";
import user_services from "../Utilities/user-services";
import role_services from "../Utilities/roles-services";

//Styles and Icons
import "../Styles/CSS/Accounts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faArrowUp,
  faArrowDown,
  faFilterCircleXmark,
  faPenToSquare,
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function Accounts(props) {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchingNames, setMatchingNames] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [openCreate, setOpenCreate] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 12;
  const [openEdit, setOpenEdit] = useState({
    open: 0,
    userInfo: null,
  });
  const [openEmail, setOpenEmail] = useState({
    open: 0,
    userInfo: null,
  });
  const [openRole, setOpenRole] = useState({
    open: 0,
    userInfo: null,
  });

  //Mensajes de filtros
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  //Componentes
  const CustomBtFilter = ({ type }) => {
    const sortUsers = (mode) => {
      let sortedUsers = [...users];
      sortedUsers.sort((a, b) => {
        if (type === "id_user") {
          return mode === "asc" ? a.id_user - b.id_user : b.id_user - a.id_user;
        } else if (type === "name_user") {
          return mode === "asc"
            ? a.name_user.localeCompare(b.name_user)
            : b.name_user.localeCompare(a.name_user);
        } else if (type === "email_user") {
          return mode === "asc"
            ? a.email_user.localeCompare(b.email_user)
            : b.email_user.localeCompare(a.email_user);
        } else if (type === "number_user") {
          return mode === "asc"
            ? a.number_user - b.number_user
            : b.number_user - a.number_user;
        } else if (type === "creation_date") {
          return mode === "asc"
            ? new Date(a.creation_date) - new Date(b.creation_date)
            : new Date(b.creation_date) - new Date(a.creation_date);
        }
        return 0;
      });
      setUsers(sortedUsers);
      setSorted(true);
    };

    return (
      <div id="accounts_dropdown" className="dropdown">
        <button
          id="accounts_dropdown_toggle"
          className="custom-dropdown-toggle"
          type="button"
          //id={`dropdownMenu$}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={`sort-tooltip-${type}`}>
                Ordenar por{" "}
                {type === "id_user"
                  ? "ID"
                  : type === "name_user"
                  ? "Nombre"
                  : type === "email_user"
                  ? "Correo"
                  : type === "number_user"
                  ? "Número de teléfono"
                  : "Fecha de creación"}
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          </OverlayTrigger>
        </button>
        <div
          id="accounts_dropdown_menu"
          className="dropdown-menu"
          aria-labelledby={`dropdownMenu${type}`}
        >
          <button
            id="accounts_dropdown_menu_sort-asc"
            className="dropdown-item"
            onClick={() => {
              sortUsers("asc");
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} className="filter-icon" />
            ASC
          </button>
          <button
            id="accounts_dropdown_menu_sort-desc"
            className="dropdown-item"
            onClick={() => {
              sortUsers("desc");
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} className="filter-icon" />
            DESC
          </button>
        </div>
      </div>
    );
  };

  const CustomCbFilter = ({ type }) => {
    return (
      <div id="accounts_dropdown" className="dropdown">
        <button
          id="accounts_dropdown_toggle"
          className="custom-dropdown-toggle"
          type="button"
          //id={`dropdownMenu$}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={`filter-tooltip-${type}`}>
                Filtrar por{" "}
                {type === "roles" ? "Rol" : type === "state" ? "Estado" : ""}
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          </OverlayTrigger>
        </button>
        <div
          id="accounts_dropdown_menu"
          className="dropdown-menu"
          aria-labelledby={`dropdownMenu${type}`}
        >
          {type === "roles" ? (
            <div
              id="accounts_dropdown_menu_filtro"
              className="form-check-filter"
            >
              {roles.length > 0 &&
                roles.map((role) => {
                  return (
                    <label
                      className="filter-check-label"
                      htmlFor={role.id_role}
                    >
                      <input
                        id={`accounts_dropdown_menu_filtro_${role.id_role}`}
                        className="check-input-filter"
                        type="checkbox"
                        name={type}
                        value={role.name_role}
                        //id={role.id_role}
                        checked={selectedRoles.includes(role.name_role)}
                        onChange={(e) => {
                          filterSelectedItem(e);
                        }}
                      />
                      {role.name_role}
                    </label>
                  );
                })}
              <label className="filter-check-label">
                <input
                  id="accounts_dropdown_menu_filtro_role-ninguno"
                  className="check-input-filter"
                  type="checkbox"
                  name={type}
                  value={"Sin rol"}
                  //id={0}
                  checked={selectedRoles.includes("Sin rol")}
                  onChange={(e) => {
                    filterSelectedItem(e);
                  }}
                />
                Sin rol
              </label>
            </div>
          ) : (
            <div
              id="accounts_dropdown_menu_filtro"
              className="form-check-filter"
            >
              <label className="filter-check-label" htmlFor="active">
                <input
                  id="accounts_dropdown_menu_filtro_rol-activo"
                  className="check-input-filter"
                  type="checkbox"
                  name="state"
                  value={1}
                  //id="active"
                  checked={selectedState.includes(1)}
                  onChange={(e) => {
                    filterSelectedItem(e);
                  }}
                />
                Activo
              </label>
              <label className="filter-check-label" htmlFor="inactive">
                <input
                  id="accounts_dropdown_menu_filtro_rol-inactivo"
                  className="check-input-filter"
                  type="checkbox"
                  name={type}
                  value={0}
                  //id="inactive"
                  checked={selectedState.includes(0)}
                  onChange={(e) => {
                    filterSelectedItem(e);
                  }}
                />
                Inactivo
              </label>
            </div>
          )}
        </div>
      </div>
    );
  };

  //Formato de fecha
  const formatDate = (announceDate) => {
    const date = new Date(announceDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("es-ES", options);
  };

  //Fetch de Usuarios
  useEffect(() => {
    refreshUsers();
  }, []);

  //Filtrado de Nombre
  useEffect(() => {
    // filtrarUsuarios(users, searchTerm);
  }, [searchTerm, users]);

  const filtrarUsuarios = (usersCol, term) => {
    const filteredUsersCol = usersCol.filter((data) =>
      data.name_user.toLowerCase().includes(term.toLowerCase())
    );
    setUsers(filteredUsersCol);
  };

  //Limpiar filtros
  function limpiarFiltros() {
    if (sorted) {
      setSelectedRoles([]);
      setSelectedState([]);
      setSorted(false);
      setUsers(originalUsers);
    }
  }

  function filterSelectedItem(e) {
    let selectedItem = e.target.value;
    let filteredUsers = [];
    if (e.target.name === "roles") {
      const newRoles = [...selectedRoles];
      if (selectedRoles.includes(selectedItem)) {
        const index = newRoles.indexOf(selectedItem);
        newRoles.splice(index, 1);
      } else {
        if (selectedItem === "Sin rol") {
          newRoles.push("Sin rol");
        }
        if (!newRoles.includes(selectedItem)) {
          newRoles.push(selectedItem);
        }
      }
      setSelectedRoles(newRoles);
      originalUsers.filter((user) => {
        newRoles.forEach((role) => {
          user.roles.map((item) => {
            if (item.includes(role)) {
              if (!filteredUsers.includes(user)) {
                filteredUsers.push(user);
              }
            }
          });
          if (user.roles.length === 0 && role === "Sin rol") {
            if (!filteredUsers.includes(user)) {
              filteredUsers.push(user);
            }
          }
        });
      });
      setSorted(true);
      setUsers(filteredUsers);
      if (newRoles.length === 0) {
        limpiarFiltros();
      }
    } else if (e.target.name === "state") {
      const states = [...selectedState];
      selectedItem === "1" ? (selectedItem = 1) : (selectedItem = 0);
      if (selectedState.includes(selectedItem)) {
        const index = states.indexOf(selectedItem);
        states.splice(index, 1);
      } else {
        states.push(selectedItem);
      }
      setSelectedState(states);
      originalUsers.filter((user) => {
        states.forEach((state) => {
          if (user.active_user === state) {
            if (!filteredUsers.includes(user)) {
              filteredUsers.push(user);
            }
          }
        });
      });
      setSorted(true);
      setUsers(filteredUsers);
      if (states.length === 0) {
        limpiarFiltros();
      }
    }
  }

  //Recuperar usuarios para actualizar
  async function refreshUsers() {
    const fetchedUsers = await user_services.getUsers();
    const fetchedRoles = await user_services.getAllUsersRoles();

    fetchedUsers.forEach((user) => {
      user.roles = [];
      fetchedRoles.forEach((role) => {
        if (user.id_user === role.id_user) {
          user.roles.push([role.id_role, role.name_role]);
        }
      });
    });

    setUsers(fetchedUsers);
    setOriginalUsers(fetchedUsers);

    const roles = await role_services.getAllRoles();
    const filteredRoles = roles.filter((role) => {
      return fetchedRoles.some(
        (fetchedRole) => fetchedRole.id_role === role.id_role
      );
    });
    setRoles(filteredRoles);
  }

  //Paginación
  const getCurrentAccounts = () => {
    const indexOfLastAccount = currentPage * accountsPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
    return users.slice(indexOfFirstAccount, indexOfLastAccount);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="account-container">
      <Navbar userData={props.userData} />
      <div className="account-box">
        <div className="account-header">
          <span className="account-title">Administración de Cuentas</span>
          {/* <div className="search-user-box">
            <FontAwesomeIcon icon={faSearch} className="iconSearch-box" />
            <input
              type="text"
              placeholder="Buscar nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="limpiar-tooltip">
                {sorted ? "Limpiar filtros" : "No se han aplicado filtros"}
              </Tooltip>
            }
          >
            <div
              className="remove-filter-button"
              onClick={() => {
                limpiarFiltros();
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <FontAwesomeIcon icon={faFilterCircleXmark} />
            </div>
          </OverlayTrigger>
          <button
            className="crear-cuenta-button"
            onClick={() => {
              setOpenCreate(1);
            }}
          >
            Crear cuenta
          </button>
          <PopUpCrearUser
            isOpen={openCreate}
            onClose={() => {
              refreshUsers(), setOpenCreate(0);
            }}
            creator={props.userData.user_data.id_user}
          />
          {openEdit.open === 1 && (
            <PopUpEditUser
              isOpen={openEdit.open}
              onClose={() => {
                setOpenEdit({ open: 0, userInfo: null });
                refreshUsers();
              }}
              user={openEdit.userInfo}
              editor={props.userData.user_data.id_user}
            />
          )}
          {openRole.open === 1 && (
            <PopUpAdminRole
              isOpen={openRole.open}
              onClose={() => {
                refreshUsers();
                setOpenRole({ open: 0, userInfo: null });
              }}
              user={openRole.userInfo}
              roles={roles}
              creator={props.userData.user_data.id_user}
            />
          )}
        </div>
        <table className="table table-bordered account-table">
          <thead className="accounts-table-header">
            <tr>
              <th></th>
              <th>
                <div className="th-div-account">
                  <CustomBtFilter type="id_user" />
                  ID
                </div>
              </th>
              <th>
                <div className="th-div-account">
                  <CustomBtFilter type="name_user" />
                  Nombre
                </div>
              </th>
              <th>
                <div className="th-div-account">
                  <CustomBtFilter type="email_user" />
                  Correo
                </div>
              </th>
              <th>
                <div className="th-div-account">
                  <CustomBtFilter type="number_user" />
                  Número de teléfono
                </div>
              </th>
              <th>
                <div className="th-div-account">
                  <CustomCbFilter type="roles" />
                  Rol
                </div>
              </th>
              <th>
                <div className="th-div-account">
                  <CustomCbFilter type="state" />
                  Estado
                </div>
              </th>
              <th>
                <div className="th-div-account">
                  <CustomBtFilter type="creation_date" />
                  Fecha de creación
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentAccounts().length > 0 &&
              getCurrentAccounts().map((itemU) => {
                return (
                  <tr className="row-table-accounts" key={itemU.id_user}>
                    <td className="accounts-table-obj">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`edit-tooltip-${itemU.id_user}`}>
                            Editar Usuario
                          </Tooltip>
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="row-edit-user"
                          onClick={() => {
                            setOpenEdit({
                              open: 1,
                              userInfo: itemU,
                            });
                          }}
                        />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`role-tooltip-${itemU.id_user}`}>
                            Asignar Rol
                          </Tooltip>
                        }
                      >
                        <FontAwesomeIcon
                          icon={faUserGear}
                          className="row-user-role"
                          onClick={() => {
                            setOpenRole({
                              open: 1,
                              userInfo: itemU,
                            });
                          }}
                        />
                      </OverlayTrigger>
                    </td>
                    <td className="accounts-table-id">{itemU.id_user}</td>
                    <td className="accounts-table-item">{itemU.name_user}</td>
                    <td className="accounts-table-item">{itemU.email_user}</td>
                    <td className="accounts-table-item">{itemU.number_user}</td>
                    <td className="accounts-table-item">
                      {itemU.roles.length === 1 && (
                        <span>{itemU.roles[0][1]}</span>
                      )}
                      {itemU.roles.length === 0 && <span>Sin rol</span>}
                      {itemU.roles.length > 1 && (
                        <select className="select-role-item">
                          {itemU.roles.map((role) => {
                            return <option>{role[1]}</option>;
                          })}
                        </select>
                      )}
                    </td>
                    <td className="accounts-table-item">
                      {itemU.active_user === 1 ? "Activo" : "Inactivo"}
                    </td>
                    <td className="accounts-table-item">
                      {formatDate(itemU.creation_date)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="pagination">
          <span className="pagination-text">
            Mostrando {getCurrentAccounts().length} de {users.length} cuentas
          </span>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {Array.from(
            { length: Math.ceil(users.length / accountsPerPage) },
            (_, index) => {
              const page = index + 1;
              const isCurrentPage = currentPage === page;
              const shouldDisplay =
                page === 1 ||
                page === currentPage - 1 ||
                page === currentPage ||
                page === currentPage + 1 ||
                page === Math.ceil(users.length / accountsPerPage);

              return shouldDisplay ? (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={isCurrentPage ? "active" : ""}
                >
                  {page}
                </button>
              ) : null;
            }
          )}

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={getCurrentAccounts().length < accountsPerPage}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
