import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import "../Styles/CSS/Accounts.css";
import user_services from "../Utilities/user-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faArrowUp,
  faArrowDown,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function Accounts() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchingNames, setMatchingNames] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  const [sorted, setSorted] = useState(false);

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
      <div className="dropdown">
        <button
          className="custom-dropdown-toggle"
          type="button"
          id={`dropdownMenu$}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        </button>
        <div className="dropdown-menu" aria-labelledby={`dropdownMenu${type}`}>
          <button
            className="dropdown-item"
            onClick={() => {
              sortUsers("asc");
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} className="filter-icon" />
            ASC
          </button>
          <button
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

  const SearchDropdown = ({ matchingNames }) => {
    console.log(matchingNames.length);
    return (
      <div
        className="dropdown-menu show mt-2.5"
        aria-labelledby="searchDropdownMenu"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {matchingNames.length > 0 ? (
          matchingNames.map((name) => (
            <button className="dropdown-item" type="button" key={name}>
              {name}
            </button>
          ))
        ) : (
          <button className="dropdown-item" type="button" disabled>
            No se encontraron resultados
          </button>
        )}
      </div>
    );
  };

  //Formato de fecha
  const formatDate = (announceDate) => {
    var date = new Date(announceDate);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    var formattedDate = date.toLocaleString("es-ES", options);
    return formattedDate;
  };

  //Fetch de Usuarios
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await user_services.getUsers();
      const fetchedRoles = await user_services.getAllUsersRoles();

      fetchedUsers.forEach((user) => {
        user.roles = [];
        fetchedRoles.forEach((role) => {
          if (user.id_user === role.id_user) {
            user.roles.push(role.name_role);
          }
        });
      });
      setUsers(fetchedUsers);
      setOriginalUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  //Filtrado de Nombre
  useEffect(() => {
    // Filter names that match the search term
    const names = users
      .filter((user) =>
        user.name_user.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((user) => user.name_user);

    setMatchingNames(names);
  }, [searchTerm, users]);

  //Dropdown search
  useEffect(() => {
    const handleInputFocus = () => {
      setDisplayResults(true);
    };

    const handleInputBlur = () => {
      setDisplayResults(false);
    };

    const inputElement = document.querySelector(".search-user-box input");

    inputElement.addEventListener("focus", handleInputFocus);
    inputElement.addEventListener("blur", handleInputBlur);

    return () => {
      inputElement.removeEventListener("focus", handleInputFocus);
      inputElement.removeEventListener("blur", handleInputBlur);
    };
  }, []);

  //Limpiar filtros
  function limpiarFiltros() {
    if (sorted) {
      setUsers(originalUsers);
      setSorted(false);
    }
  }

  return (
    <div className="account-container">
      <Navbar />
      <div className="account-box">
        <div className="account-header">
          <span className="account-title">Administración de Cuentas</span>
          <div className="search-user-box">
            <FontAwesomeIcon icon={faSearch} className="iconSearch-box" />
            <input
              type="text"
              placeholder="Buscar nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {displayResults && <SearchDropdown matchingNames={matchingNames} />}
          </div>

          <div
            className="remove-filter-button"
            onClick={() => {
              limpiarFiltros();
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <FontAwesomeIcon icon={faFilterCircleXmark} />
            {isHovering && sorted && (<span className="limpiar-filtro-div">Limpiar filtros</span>)}
            {isHovering && !sorted && (<span className="limpiar-filtro-div">No se han aplicado filtros</span>)}
          </div>
          <button className="crear-cuenta-button">Crear cuenta</button>
        </div>
        <table className="table table-bordered account-table">
          <thead className="accounts-table-header">
            <tr>
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
              <th>Rol</th>
              <th>Estado</th>
              <th>
                <div className="th-div-account">
                  <CustomBtFilter type="creation_date" />
                  Fecha de creación
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((itemU) => {
              return (
                <tr className="row-table-accounts" key={itemU.id_user}>
                  <td className="accounts-table-id">{itemU.id_user}</td>
                  <td className="accounts-table-item">{itemU.name_user}</td>
                  <td className="accounts-table-item">{itemU.email_user}</td>
                  <td className="accounts-table-item">{itemU.number_user}</td>
                  <td className="accounts-table-item">
                    {itemU.roles.length === 1 && <span>{itemU.roles[0]}</span>}
                    {itemU.roles.length === 0 && <span>Sin rol</span>}
                    {itemU.roles.length > 1 && (
                      <select>
                        {itemU.roles.map((role) => {
                          return <option>{role}</option>;
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
      </div>
    </div>
  );
}

export default Accounts;
