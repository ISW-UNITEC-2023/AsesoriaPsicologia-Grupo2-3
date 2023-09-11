import React, { useState } from "react";
import "./ResetPass.css"; // Importa el CSS de ResetPass
import { Link } from "react-router-dom";
<<<<<<< Updated upstream

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false); // Estado para el éxito del restablecimiento

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //agregar la lógica para restablecer la contraseña
    if (newPassword === confirmPassword) {
      // Realizar la lógica para enviar la nueva contraseña al servidor o almacenarla
      // Esto podría ser una llamada a una API, un servicio de autenticación, o un cambio local en la aplicación
      // simularemos el éxito del restablecimiento de contraseña
      setResetSuccess(true);
    } else {
      // Maneja el caso en el que las contraseñas no coinciden
      alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
    }
  };

  return (
    <section data-section="reset">
      <div className="form-container">
      <div className="logo-container">
          <img src= "assets/logounitecletras.png"
              alt="unitec logo letras"
              className="unitec-logo" />
        </div>
        <div className="container">
          <h1 data-type="heading">Restablecer Contraseña</h1>
          {resetSuccess ? (
            // Si el restablecimiento de contraseña fue exitoso, muestra un mensaje de éxito
            
            <div className="success-message" style={{ textAlign: "center", marginTop: "2rem", marginBottom: "3rem" }}>
              Contraseña restablecida con éxito. Puedes iniciar sesión con tu nueva contraseña.
            </div>
          ) : (
            // Si el restablecimiento de contraseña no fue exitoso, muestra el formulario
            <form onSubmit={handleSubmit}>
              <div className="input-container">
              <label>Nueva Contraseña:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-container" >
                <label>Confirmar Contraseña:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <br/>
                
                <button type="submit" data-type="submit-button">
                Restablecer Contraseña
                </button>
                
              </div>
            
            </form>
            
          )}
        <Link to="/" className="centered-link">
  <button data-type="back-to-button">
    Regresar a página inicial
  </button>
</Link>

          <p></p>
          <p></p>
        </div>
      
      </div>
    </section>
  );
};
=======
>>>>>>> Stashed changes

const ResetPass = () => {
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false); // Estado para el éxito del restablecimiento

const handleSubmit = (e) => {
    e.preventDefault();
    
    //agregar la lógica para restablecer la contraseña
    if (newPassword === confirmPassword) {
      // Realizar la lógica para enviar la nueva contraseña al servidor o almacenarla
      // Esto podría ser una llamada a una API, un servicio de autenticación, o un cambio local en la aplicación
      // simularemos el éxito del restablecimiento de contraseña
    setResetSuccess(true);
    } else {
      // Maneja el caso en el que las contraseñas no coinciden
    alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
    }
};
return (
    <section data-section="reset">
    <div className="form-container">
    <div className="logo-container">
    <img src= "assets/logounitecletras.png"
        alt="unitec logo letras"
            className="unitec-logo" />
        </div>
        <div className="container">
        <h1 data-type="heading">Restablecer Contraseña</h1>
        {resetSuccess ? (
            // Si el restablecimiento de contraseña fue exitoso, muestra un mensaje de éxito
            
            <div className="success-message" style={{ textAlign: "center", marginTop: "2rem", marginBottom: "3rem" }}>
            Contraseña restablecida con éxito. Puedes iniciar sesión con tu nueva contraseña.
            </div>
        ) : (
            // Si el restablecimiento de contraseña no fue exitoso, muestra el formulario
            <form onSubmit={handleSubmit}>
            <div className="input-container">
            <label>Nueva Contraseña:</label>
                <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                />
            </div>
            <div className="input-container" >
                <label>Confirmar Contraseña:</label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
                <br/>
                
                <button type="submit" data-type="submit-button">
                Restablecer Contraseña
                </button>
                    
                </div>
                
                </form>
                
            )}
            <Link to="/" className="centered-link">
    <button data-type="back-to-button">
        Regresar a página inicial
    </button>
    </Link>

            <p></p>
            <p></p>
            </div>
        
        </div>
        </section>
    );
    };

    export default ResetPass;
