import logo_icono from "../Styles/Images/logo-icono.png"
import "../Styles/CSS/Navbar.css"
import { Link } from "react-router-dom";

//images
import pacienteIcon from "../Styles/Images/paciente-icon.png"
import moduleIcon from "../Styles/Images/curso-icon.png"
import anuncioIcon from "../Styles/Images/anuncios-icon.png"
import tableroIcon from "../Styles/Images/tablero-icon.png"
import calendarioIcon from "../Styles/Images/calendario-icon.png"
import backIcon from "../Styles/Images/back-icon-nb.png"

function MyNavbar() {
    return (
        <div className="body-navbar-plataforma">
            <img
                src={logo_icono}
                className="unitec-icon-logo"
                alt="React Bootstrap logo"
            />
            <Link to="/Dashboard" className="link-navbar-plataforma">
                <img src={tableroIcon} className="navbar-plataforma-icon" alt=""/>
                Tablero
            </Link>
            <Link to ="/Anuncios" className="link-navbar-plataforma">
                <img src={anuncioIcon} className="navbar-plataforma-icon" alt=""/>
                Anuncios
            </Link>
            <Link to="/Modulos" className="link-navbar-plataforma">
                <img src={moduleIcon} className="navbar-plataforma-icon" alt=""/>
                Módulos
            </Link>
            <Link to="/Calendario" className="link-navbar-plataforma">
                <img src={calendarioIcon} className="navbar-plataforma-icon" alt=""/>
                Calendario
            </Link>
            <Link to="/Pacientes" className="link-navbar-plataforma">
                <img src={pacienteIcon} className="navbar-plataforma-icon" alt=""/>
                Pacientes
            </Link>
            <img src={backIcon} alt="" className="back-navbar-icon"/>
        </div>
    );
    }
export default MyNavbar;
