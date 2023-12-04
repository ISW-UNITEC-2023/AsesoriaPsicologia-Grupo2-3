import React, {useEffect, useState} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../Styles/CSS/NavigationBar.css";
import {Collapse} from "@material-tailwind/react";

function NavigationBar(props) {
    const {unitecLogo} = props;
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
                    <Link className="link-navbar iniciar-sesion-navbar" to="/InicioSesion">
                        Iniciar Sesión
                    </Link>
                    <Link className="link-navbar comienza-ya-navbar" to="/Cuestionario">
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
                        <Link className="link-navbar iniciar-sesion-navbar mb-2" to="/InicioSesion">
                            Iniciar Sesión
                        </Link>
                        <Link className="link-navbar comienza-ya-navbar mb-2" to="/Cuestionario">
                            Comienza Ya
                        </Link>
                    </Nav>
                </Collapse>
            );
        }
    };

    return (
        <div className={`navigation-bar ${collapsed ? "menu-closed" : ""}`}>
            <Navbar bg="transparent" variant="dark" expand="lg">
                <Navbar.Brand className="nav-brand">
                    <img className="navigation-bar__logo" src={unitecLogo} alt=""  href="localhost:3000"/>
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
