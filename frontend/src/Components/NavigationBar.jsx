import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../Styles/CSS/NavigationBar.css';

function NavigationBar(props) {
    const {unitecLogo, navbarBg} = props;
    const navigate = useNavigate();

    const handleIniciarSesionClick = () => {
        navigate('/InicioSesion');
    }

    const handleComienzaYaClick = () => {
        navigate('/Questionario');
    }

    return (
        <div className="navigation-bar" style={{backgroundImage: {navbarBg}}}>
            <img className="navigation-bar__logo" src={unitecLogo} alt=""/>
            <div className='elements-navbar'>
                <Link className="link-navbar" to="/Inicio">Inicio</Link>
                <Link className="link-navbar" to="/SobreNosotros">Sobre Nosotros</Link>
                <Link className="link-navbar" to="/Contactanos">Contacto</Link>
                <button className="iniciar-sesion-navbar" onClick={handleIniciarSesionClick}>Iniciar Sesión</button>
                <button className="comienza-ya-navbar" onClick={handleComienzaYaClick}>Comienza Ya</button>
            </div>
        </div>
    )
}

export default NavigationBar;