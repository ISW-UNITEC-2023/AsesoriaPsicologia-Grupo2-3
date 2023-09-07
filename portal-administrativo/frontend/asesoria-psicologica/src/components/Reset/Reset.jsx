"use strict";
import React, { useState } from "react";
import nodemailer from "nodemailer";

import "./Reset.css";
import { Link } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  let transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.VITE_EMAIL,
      pass: import.meta.env.VITE_PASSWORD,
    },
    tls: {
      secureProtocol: "TLSv1_method",
    },
  });

  async function sendEmail() {
    const info = await transporter.sendMail({
      from: import.meta.env.VITE_EMAIL,
      to: "pmercedes@unitec.edu",
      subject: "Place Order",
      text: "Hola",
    });
    console.log("Message sent: %s", info.messageId);
  }

  const currentURL = window.location.href;
  console.log("currentURL", currentURL);

  return (
    <section data-section="reset">
      <div className="container">
        <form className="form-container" onSubmit={sendEmail}>
          <div className="logo-container">
            <h1 className="className"></h1>
            <img
              src="assets/logounitecletras.png"
              alt="unitec logo letras"
              className="unitec-logo"
            />
          </div>
          {visible === false ? (
            <>
              <div className="text-container">
                <h1 className="clr-primary" data-type="heading">
                  {currentURL !== "http://localhost:5173/reset"
                    ? "¿Has olvidado tu contraseña?"
                    : "Reestablezca su contraseña"}
                </h1>
                <p className="description clr-primary ">
                  Ingrese la dirección de correo electrónico asociada a su
                  cuenta del portal administrativo. Le enviaremos un enlace a su
                  correo electrónico para que pueda reestaablecer su contraseña.
                </p>
              </div>

              <div className="input-container">
                <input type="email" className="email-input" />

                <button
                  type="submit"
                  data-type="submit-button"
                  onSubmit={sendEmail}
                >
                  Send{" "}
                </button>
              </div>
            </>
          ) : (
            <div className="text-container">
              <h1 className="clr-primary" data-type="heading">
                Se ha enviado un mensaje a su correo exitosamente!
              </h1>
            </div>
          )}

          <Link to="/">
            <button data-type="back-to-button">
              Regresar a página inicial
            </button>
          </Link>

          <p></p>
          <p></p>
        </form>
      </div>
    </section>
  );
};
export default Reset;
