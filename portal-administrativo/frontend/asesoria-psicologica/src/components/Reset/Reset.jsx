import React from "react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Reset.css";

const Reset = () => {
  const page = "Reset";

  console.log("entered contact");
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
  };

  const email = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
  console.log(email);

  return (
    <div>
      <div className="even-columns-contact">
        <form action=""></form>
        <div className="logo-container">
          <img src="" alt="unitec logo letras" className="unitec-logo" />
        </div>
        <h1 className="page-title">
          {page === "reset"
            ? "Has olvidado tu contraseña"
            : "Resetea tu contraseña"}
        </h1>
        <p className="description">
          Ingrese la dirección de correo electrónico asociada a su cuenta del
          portal administrativo. Le enviaremos un enlace a su correo electrónico
          para que pueda reestaablecer su contraseña.
        </p>

        <label htmlFor=""> </label>
      </div>
    </div>
  );
};

export default Reset;
