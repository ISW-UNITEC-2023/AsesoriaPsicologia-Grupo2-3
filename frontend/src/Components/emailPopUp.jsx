import React from "react";
import { useEffect, useState } from "react";
import { getCookies } from "../Utilities/login-services.js";
import { sendEmail } from "../Utilities/email-service.js";
import "../Styles/CSS/EmailPopUp.css"

function EmailPopUP({ isOpen, onClose, name, email }) {
  if (!isOpen) {
    return null; // No se muestra si no está abierto
  }
  
  const [mail, setMail] = useState({
    subject: "",
    message: "",
  });

  // useEffect(() => {
  //   updateCookies();
  // }, [cookies, cookiesLoaded]);

  // const updateCookies = () => {
  //   async function fetchData() {
  //     if (!cookiesLoaded) {
  //       const obtainedCookies = await getCookies();
  //       setCookies(obtainedCookies);
  //       setCookiesLoaded(true);
  //     }
  //   }
  //   fetchData();
  // };

  // const handleSend = async () => {
  //   try {
  //     await sendEmail(name, cookies.email, subject, message, email);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error al enviar el correo electrónico:", error);
  //   }
  // };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <h2>Correo dirigido para{name}</h2>
          <h2>Correo de Contacto:{email}</h2>
          <h2>Asunto:</h2>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <h2>Mensaje:</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSend}>Enviar</button>
          <button onClick={onClose}>Cerrar Popup</button>
        </div>
      </div>
    </div>
  );
}

export default EmailPopUP;
