import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = () => {
    setIsSubmitted(true);
    navigate("/Modulos");
    // Así se hace un refresh por el bug de los botones de sign up y sign in.
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/admins/login", {
        email,
        password,
      });

      // Login successful
      console.log(response.data);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      handleLoginSuccess();
    } catch (error) {
      console.error(error);
      // Login error
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessages({
            field: "credentials",
            message: "Invalid email or password.",
          });
        } else {
          setErrorMessages({
            field: "server",
            message: error.response.data.message,
          });
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor...");
      } else {
        console.error("Error al hacer la solicitud:", error.message);
      }
    }
  };

  const renderErrorMessage = (field) => {
    if (errorMessages.field === field) {
      return <div className="error">{errorMessages.message}</div>;
    }
    return null;
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Correo electrónico</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            required
          />
          {renderErrorMessage("password")}
          {renderErrorMessage("credentials")}
        </div>
        <div className="button-container">
          <input type="submit" value="Iniciar Sesión" />
        </div>
        <div className="links-container">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">Cambia tu contraseña</a>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="white-div">
        <div className="image-container">
          <img src="/login-images/logo-imagen.png" alt="Logo" />
        </div>
      </div>
      <div className="app" style={{ backgroundColor: "#212A53" }}>
        <div className="login-form">
          <div className="title-login">Inicio de Sesión</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
