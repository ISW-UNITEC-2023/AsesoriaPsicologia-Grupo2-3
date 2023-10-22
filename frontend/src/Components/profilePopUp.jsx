import React from "react";
import { useEffect, useState } from "react";
function ProfilePopUp({ isOpen, onClose, id_account, name, email, active }) {
  if (!isOpen) {
    return null; // No se muestra si no está abierto
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content"></div>
        <h2>Perfil de usuario</h2>
        <h2>Nombre:{name}</h2>
        <h2>Id de usuario:{id_account}</h2>
        <h2>Correo de Contacto:{email}</h2>
        <h2>Estado:{active}</h2>

        <button onClick={onClose}>Cerrar Popup</button>
      </div>
    </div>
  );
}

export default ProfilePopUp;
