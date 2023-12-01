import React from "react";
import { useEffect, useState } from "react";
import { getCookies } from "../Utilities/user-services.js";
import { sendEmail } from "../Utilities/email-service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Styles/CSS/EmailPopUp.css";

function EmailPopUP({ isOpen, onClose, user }) {
    if (!isOpen) {
        return null; // No se muestra si no está abierto
    }

    // const [cookies, setCookies] = useState({});
    // const [cookiesLoaded, setCookiesLoaded] = useState(false);

    const [mail, setMail] = useState({
        subject: "",
        message: "",
    });

    // useEffect(() => {
    //   const updateCookies = () => {
    //     async function fetchData() {
    //       if (!cookiesLoaded) {
    //         const obtainedCookies = await getCookies();
    //         setCookies(obtainedCookies);
    //         setCookiesLoaded(true);
    //       }
    //     }
    //     fetchData();
    //   };
    //   updateCookies();
    // }, [cookies, cookiesLoaded]);

    const handleSend = async () => {
        try {
            await sendEmail(user.name_user, localStorage.getItem("email_user"), mail.subject, mail.message, user.mail_user);
            onClose();
        } catch (error) {
            console.error("Error al enviar el correo electrónico:", error);
        }
    };

    return (
        <div id="popup_enviar_email" className="popup-overlay-se">
            <div className="popup-se">
                <div className="mail-container-header">
                    <h2>Mensaje Nuevo</h2>
                    <FontAwesomeIcon
                        id="popup_enviar_email_cerrar"
                        style={{ cursor: "pointer" }}
                        icon={faXmark}
                        onClick={onClose}
                    />
                </div>
                <div className="mail-container">
                    <div className="mail-container-div">
                        <span>Para:</span>
                        <input
                            id="popup_enviar_email_destinatario"
                            disabled
                            placeholder="Para"
                            value={user.email_user}
                            className="input-send-email"
                        />
                    </div>
                    <div className="mail-container-div">
                        <input
                            id="popup_enviar_email_asunto"
                            type="text"
                            placeholder="Asunto"
                            className="input-asunto-se"
                            value={mail.subject}
                            onChange={(e) =>
                                setMail({
                                    ...mail,
                                    subject: e.target.value,
                                })
                            }
                        />
                    </div>
                    <textarea
                        id="popup_enviar_email_mensaje"
                        className="input-mensaje-se"
                        value={mail.message}
                        placeholder="Escribe tu mensaje aquí..."
                        onChange={(e) =>
                            setMail({
                                ...mail,
                                message: e.target.value,
                            })
                        }
                    />
                    <button id="popup_enviar_email_enviar_btn" className="button-send-email" onClick={handleSend}>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default EmailPopUP;
