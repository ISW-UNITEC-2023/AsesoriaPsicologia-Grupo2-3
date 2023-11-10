import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CSS/LoadingSpiner.css";

const LoadingSpinner = () => {
  const navigate = useNavigate();

  const redirectToInicioSesion = () => {
    navigate("/InicioSesion");
  };

  return (
    <div className="loading-container">
      <div className="large-message">
        <span>PARECE QUE NO ESTÁS INGRESADO</span>
      </div>
      <div className="message">
        Parece que no tienes acceso a esta página. Ingresa para disfrutar de
        nuestros servicios.
      </div>
      <button className="button" onClick={redirectToInicioSesion}>
        Ir a Inicio de Sesión
      </button>
    </div>
  );
};

export default LoadingSpinner;
