import React from "react";
import "../Styles/CSS/ProfileStyle.css";
import userIcon from "../Styles/Images/tempprofile.png";

function ProfilePopUp({ isOpen, onClose, id_account, name, email, active }) {
  if (!isOpen) {
    return null; // No se muestra si no está abierto
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <div className="user-info">
            <h2>informacion de usuario</h2>
            <div className="user-details">
              <div className="image-container">
                <img
                  src={userIcon}
                  alt="Imagen de perfil"
                  className="profile-image"
                />
              </div>
              <div className="user-text">
                <div className="user-detail">
                  <div className="label">Nombre:</div>
                  <div className="value">{name}</div>
                </div>
                <div className="user-detail">
                  <div className="label">Id de cuenta:</div>
                  <div className="value">{id_account}</div>
                </div>
                <div className="user-detail">
                  <div className="label">Correo de Contacto:</div>
                  <div className="value">{email}</div>
                </div>
                <div className="user-detail">
                  <div className="label">Estado:</div>
                  <div className="value">{active}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={onClose}>Cerrar Popup</button>
      </div>
    </div>
  );
}

export default ProfilePopUp;
