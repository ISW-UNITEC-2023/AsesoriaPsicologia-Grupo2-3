import "../Styles/CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faChevronDown,
  faChevronUp,
  faRightFromBracket,
  faUserGroup,
  faCalendarDays,
  faVideo,
  faBullhorn,
  faGaugeHigh,
  faAddressCard,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { deleteCookies } from "../Utilities/login-services";
function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    deleteCookies();
    navigate("/InicioSesion");
  };

  const logs = () => {
    navigate("/AuditLogs");
  };

  return (
    <div className="background-navbar">
      <div className="parent-container">
        <div className="body-navbar-plataforma">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="nb-navbar-user-icon"
          />
          <div className="nb-custom-dropdown">
            <div className="nb-dropdown-header" onClick={toggleDropdown}>
              Cuenta
              {isOpen ? (
                <FontAwesomeIcon icon={faChevronUp} className="nb-drop-arrow" />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="nb-drop-arrow"
                />
              )}
            </div>
            {isOpen && (
              <div className="nb-dropdown-items">
                <div className="nb-dropdown-item">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="nb-dropdown-icon"
                  />
                  Mi Perfil
                </div>

                <div
                  className="nb-dropdown-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="nb-dropdown-icon"
                  />
                  Cerrar Sesión
                </div>
              </div>
            )}
          </div>
          {ProtectedRoute(props.userData, [31]) ? (
            <Link to="/Zoomv" className="link-navbar-plataforma">
              <FontAwesomeIcon
                icon={faVideo}
                className="navbar-plataforma-icon"
              />
              Zoom
            </Link>
          ) : (
            <></>
          )}

          {ProtectedRoute(props.userData, [31]) ? (
            <Link to="/Calendario" className="link-navbar-plataforma">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="navbar-plataforma-icon"
              />
              Calendario
            </Link>
          ) : (
            <></>
          )}

          {ProtectedRoute(props.userData, [56]) ? (
            <Link to="/Pacientes" className="link-navbar-plataforma">
              <FontAwesomeIcon
                icon={faUserGroup}
                className="navbar-plataforma-icon"
              />
              Pacientes
            </Link>
          ) : (
            <></>
          )}

          {ProtectedRoute(props.userData, [45]) ? (
            <Link to="/Cuentas" className="link-navbar-plataforma">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="navbar-plataforma-icon"
              />
              Cuentas
            </Link>
          ) : (
            <></>
          )}

          {ProtectedRoute(props.userData, [54]) && (
            <Link to="/AuditLogs" className="link-navbar-plataforma">
              <FontAwesomeIcon
                icon={faFileLines}
                className="navbar-plataforma-icon"
              />
              Logs
            </Link>
          )}
          {ProtectedRoute(props.userData, [54]) && (
            <Link to="/Roles" className="link-navbar-plataforma">
              <FontAwesomeIcon
                icon={faUserGear}
                className="navbar-plataforma-icon"
              />
              Roles
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyNavbar;
