import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/CSS/NavigationBar.css";

function NavigationBar(props) {
  const { unitecLogo } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`navigation-bar ${menuOpen ? "menu-open" : ""}`}>
      <Navbar bg="transparent" variant="dark" expand="lg">
        <Navbar.Brand className="nav-brand">
          <img className="navigation-bar__logo" src={unitecLogo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-toggle"
          onClick={handleToggleMenu}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={menuOpen ? "show" : ""}
        >
          <Nav className={menuOpen ? "itemshow" : ""}>
            <Link
              className={menuOpen ? "item-bar" : "link-navbar"}
              to="/Inicio"
            >
              Inicio
            </Link>
            <Link
              className={menuOpen ? "item-bar" : "link-navbar"}
              to="/SobreNosotros"
            >
              Sobre Nosotros
            </Link>
            <Link
              className={
                menuOpen
                  ? "item-bar iniciar-sesion-navbar"
                  : "link-navbar iniciar-sesion-navbar"
              }
              to="/InicioSesion"
            >
              Iniciar Sesión
            </Link>
            <Link
              className={
                menuOpen
                  ? "item-bar comienza-ya-navbar"
                  : "link-navbar comienza-ya-navbar"
              }
              to="/Cuestionario"
            >
              Comienza Ya
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
