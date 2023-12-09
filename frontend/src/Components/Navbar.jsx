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
  faUserGear,
  faCalendarDays,
  faVideo,
  faFileLines,
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
          <Link to="/Zoomv" className="link-navbar-plataforma">
            <FontAwesomeIcon
              icon={faVideo}
              className="navbar-plataforma-icon"
            />
            Zoom
          </Link>

          <Link to="/Calendar" className="link-navbar-plataforma">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="navbar-plataforma-icon"
            />
            Calendario
          </Link>

          <Link to="/Pacientes" className="link-navbar-plataforma">
            <FontAwesomeIcon
              icon={faUserGroup}
              className="navbar-plataforma-icon"
            />
            Pacientes
          </Link>

          <Link to="/Cuentas" className="link-navbar-plataforma">
            <FontAwesomeIcon
              icon={faAddressCard}
              className="navbar-plataforma-icon"
            />
            Cuentas
          </Link>

          <Link to="/AuditLogs" className="link-navbar-plataforma">
            <FontAwesomeIcon
              icon={faFileLines}
              className="navbar-plataforma-icon"
            />
            Logs
          </Link>

          <Link to="/Roles" className="link-navbar-plataforma">
            <FontAwesomeIcon
              icon={faUserGear}
              className="navbar-plataforma-icon"
            />
            Roles
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MyNavbar;
