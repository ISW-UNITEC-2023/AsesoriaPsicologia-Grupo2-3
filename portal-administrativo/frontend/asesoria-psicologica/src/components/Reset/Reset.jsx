import React from "react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Reset.css";
import { Link } from "react-router-dom";
const Reset = () => {
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const page = "Reset";
  const currentURL = window.location.href;
  console.log("currentURL", currentURL);

  console.log("entered RESET");
  const [mouseEnter, setMouseEnter] = useState(false);

  console.log("Mount");
  const updateMouseEnter = () => {
    setMouseEnter((prev) => !prev);
    console.log("Mouse event updated");
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_KEY,
        import.meta.env.VITE_EMAILJS_TEMPLATE_KEY,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        console.log(result.text);
        setSuccess(true);
      }),
      (error) => {
        console.log(error.text);
        setSuccess(false);
      };
    setVisible((prev) => !prev);
    console.log("Se ha enviado");
  };

  return (
    <section data-section="reset">
      <div className="container">
        <form ref={formRef} className="form-container" onSubmit={handleSubmit}>
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
                  onSubmit={handleSubmit}
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
