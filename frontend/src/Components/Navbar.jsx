import "../Styles/CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { useState } from "react";

//images
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
  faArrowLeft,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import backIcon from "../Styles/Images/back-icon-nb.png";

function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/InicioSesion");
  };

  return (
    <div className="background">
      <div className="body-navbar-plataforma">
        <FontAwesomeIcon icon={faUserCircle} className="nb-navbar-user-icon" />
        <div className="nb-custom-dropdown">
          <div className="nb-dropdown-header" onClick={toggleDropdown}>
            Cuenta
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronUp} className="nb-drop-arrow" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className="nb-drop-arrow" />
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
        <Link to="/Dashboard" className="link-navbar-plataforma">
          <FontAwesomeIcon
            icon={faGaugeHigh}
            className="navbar-plataforma-icon"
          />
          Tablero
        </Link>
        <Link to="/Anuncios" className="link-navbar-plataforma">
          <FontAwesomeIcon
            icon={faBullhorn}
            className="navbar-plataforma-icon"
          />
          Anuncios
        </Link>
        <Link to="/Modulos" className="link-navbar-plataforma">
          <FontAwesomeIcon icon={faVideo} className="navbar-plataforma-icon" />
          Zoom
        </Link>
        <Link to="/Calendario" className="link-navbar-plataforma">
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
        {/**<FontAwesomeIcon
          icon={faArrowLeft}
          className="navbar-plataforma-icon"
        /> */}
      </div>
    </div>
  );
}
export default MyNavbar;
