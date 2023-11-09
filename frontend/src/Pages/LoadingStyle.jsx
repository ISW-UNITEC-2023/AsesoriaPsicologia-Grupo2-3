import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../Styles/CSS/LoadingSpiner.css";

const LoadingSpinner = () => {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const redirectToInicioSesion = () => {
    navigate("/InicioSesion"); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="loading-container">
      <div className="message">Cargando...</div>
      <button className="button" onClick={redirectToInicioSesion}>
        Ir a Inicio de Sesión
      </button>
    </div>
  );
};

export default LoadingSpinner;
