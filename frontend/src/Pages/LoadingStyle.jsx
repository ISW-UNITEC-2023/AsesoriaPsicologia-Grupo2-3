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
  return (
    <div className="loading-spinner">
      <div>
        <div className="large-message">
          <div>
            <span>401</span>
          </div>
        </div>

        <div>
          <div className="loading-container">
            <div>
              <Button
                className="button-loading"
                onClick={redirectToInicioSesion}
              >
                Regresar al inicio
              </Button>
            </div>
            <div className="message">
              <h1>No se encontró la autorización</h1>
              <p>Esta página no es de acceso público</p>
              Para acceder porfavor registrate o inicia sesión
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
