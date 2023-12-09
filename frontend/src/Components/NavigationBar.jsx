import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/CSS/NavigationBar.css";
import { Collapse } from "@material-tailwind/react";

function NavigationBar(props) {
  const { unitecLogo } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [size, setSize] = useState(window.innerWidth);

  const handleToggleMenu = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth;

      if (newSize !== size) {
        setSize(newSize);

        if (newSize > 1024) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const renderLinks = () => {
    if (size > 1024) {
      return (
        <Nav className="flex flex-col lg:flex-row items-center justify-end">
          <Link className="link-navbar" to="/Inicio">
            Inicio
          </Link>
          <Link className="link-navbar" to="/SobreNosotros">
            Sobre Nosotros
          </Link>
          <Link
            className="link-navbar iniciar-sesion-navbar"
            to="/InicioSesion"
          >
            Iniciar Sesión
          </Link>
          <Link className="link-navbar comienza-ya-navbar" to="/Registro">
            Comienza Ya
          </Link>
        </Nav>
      );
    } else {
      return (
        <Collapse open={collapsed}>
          <Nav className="flex flex-col lg:flex-row items-center justify-end">
            <Link className="link-navbar mt-2 mb-2" to="/Inicio">
              Inicio
            </Link>
            <Link className="link-navbar mb-2" to="/SobreNosotros">
              Sobre Nosotros
            </Link>
            <Link
              className="link-navbar iniciar-sesion-navbar mb-2"
              to="/InicioSesion"
            >
              Iniciar Sesión
            </Link>
            <Link
              className="link-navbar comienza-ya-navbar mb-2"
              to="/Registro"
            >
              Comienza Ya
            </Link>
          </Nav>
        </Collapse>
      );
    }
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
              id={`navigation-bar ${menuOpen ? "menu-open" : ""}_inicio`}
              className={menuOpen ? "item-bar" : "link-navbar"}
              to="/Inicio"
            >
              Inicio
            </Link>
            <Link
              id={`navigation-bar ${
                menuOpen ? "menu-open" : ""
              }_sobre_nosotros`}
              className={menuOpen ? "item-bar" : "link-navbar"}
              to="/SobreNosotros"
            >
              Sobre Nosotros
            </Link>
            <Link
              id={`navigation-bar ${
                menuOpen ? "menu-open" : ""
              }_iniciar_sesion`}
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
              id={`navigation-bar ${menuOpen ? "menu-open" : ""}_comienza_ya`}
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
  return (
    <div className={`navigation-bar ${collapsed ? "menu-closed" : ""}`}>
      <Navbar bg="transparent" variant="dark" expand="lg">
        <Navbar.Brand className="nav-brand">
          <img
            className="navigation-bar__logo"
            src={unitecLogo}
            alt=""
            href="localhost:3000"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-toggle"
          onClick={handleToggleMenu}
          aria-controls="basic-navbar-nav"
        />

        {renderLinks()}
      </Navbar>
    </div>
  );
}

export default NavigationBar;
