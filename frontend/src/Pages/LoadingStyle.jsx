import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CSS/LoadingSpiner.css";
import register from "../Styles/Images/user.png";
import { Button } from "react-bootstrap";
const LoadingSpinner = () => {
  const navigate = useNavigate();

  const redirectToInicioSesion = () => {
    navigate("/InicioSesion");
  };
  const redirectToRegistro = () => {
    navigate("/Cuestionario");
  };

  return (
    <div className="loading-spinner">
      <div>
        <div className="large-message">
          <div>
            <span>Necesitas Iniciar Sesión Para Continuar</span>
          </div>
        </div>

        <div className="button-container">
          <div>
            <img src={register} alt="Registrarse" className="image" />
            <Button className="button" onClick={redirectToInicioSesion}>
              Ir a Inicio de Sesión
            </Button>
          </div>

          <div className="loading-container">
            <img src={register} alt="Registrarse" className="image" />
            <div className="message">
              Parece que no tienes acceso a esta página. Ingresa para disfrutar
              de nuestros servicios.
            </div>
          </div>

          <div>
            <img src={register} alt="Registrarse" className="image" />
            <Button className="button" onClick={redirectToRegistro}>
              Registrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
