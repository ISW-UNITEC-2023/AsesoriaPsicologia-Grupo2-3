import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/CSS/Registro.css";
import NavigationBar from "../Components/NavigationBar";
import RegisterDoctorImage from "../Styles/Images/RegisterDoctor.png";

function Wizard(props) {
  const [regData, setRegData] = useState({
    name: "",
    date: "",
    phoneNum: "",
    email: "",
    password: "",
    image: null,
  });
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    phoneNum: false,
  });

  const validateData = (fieldName) => {
    const value = regData[fieldName];
    return value && value.length > 0;
  };
  const [validations, setValidations] = useState({
    isPhoneNumValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  });

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData({
      ...regData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRegData({
      ...regData,
      image: selectedImage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(regData);
  };

  return (
    <div className="containerReg">
      <div className="navigation-bar">
        <NavigationBar {...props} />
      </div>
      <div className="content-wrapper">
        <img
          src={RegisterDoctorImage}
          alt="Register Doctor"
          className="register-doctor-image"
        />
        <div className="form-container">
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nombre De Clinica </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={regData.name}
                onChange={(e) => handleRegChange(e)}
                placeholder="Ingrese su nombre completo"
                onBlur={() =>
                  setTouchedFields({ ...touchedFields, name: true })
                }
                isInvalid={!regData.name.length > 0 && touchedFields.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                El nombre no puede estar vacío.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formphoneNum" className="mb-3">
              <Form.Label>Numero de Telefono de Clinica</Form.Label>
              <Form.Control
                type="number"
                name="phoneNum"
                value={regData.phoneNum}
                onChange={(e) => handleRegChange(e)}
                onBlur={() =>
                  setTouchedFields({ ...touchedFields, phoneNum: true })
                }
                isInvalid={
                  !regData.phoneNum.length > 0 && touchedFields.phoneNum
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo solo acepta numeros
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Correo Electrónico de Clínica</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={regData.email}
                onChange={(e) => handleRegChange(e)}
                onBlur={() =>
                  setValidations({
                    ...validations,
                    isEmailValid: validateData("email"),
                  })
                }
                isInvalid={
                  !validations.isEmailValid && !regData.email.length > 0
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                El correo electrónico debe ser válido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={regData.password}
                onChange={(e) => handleRegChange(e)}
                onBlur={() =>
                  setValidations({
                    ...validations,
                    isPasswordValid: validateData("password"),
                  })
                }
                isInvalid={
                  !validations.isPasswordValid && !regData.password.length > 0
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 8 caracteres y contener al
                menos una letra y un número.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Subir imagen</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
            <Button className="button-reg" type="submit">
              Crear cuenta
            </Button>
          </Form>
          <Link className="forgot-passwordR" to="/InicioSesion">
            ¿Ya tienes una cuenta?
          </Link>
        </div>
      </div>

      <div className="footer-general">
        <p className="footerL">Clinica MEDICLOG</p>
        <p className="footerL">© 2023 - Todos los derechos reservados</p>
      </div>
    </div>
  );
}

export default Wizard;
