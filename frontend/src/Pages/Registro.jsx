import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/CSS/Registro.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import RegisterDoctorImage from "../Styles/Images/RegisterDoctor.png";
import services from "../Utilities/clinics-services"
import servicesUser from "../Utilities/user-services";


function Wizard(props) {
  const navigate = useNavigate();

  
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

  const crearClinic = async(name_clinic, name_user,email_user, phone, password) =>
  {
    let clinic = await services.crearClinica(name_clinic, 13);

    let user = await servicesUser.createUserByclinic({
      name: name_user,
      email: email_user,
      phone: phone,
      password: password,
      type: " ",
      active: 1,
      creator: 13,
      clinicid: clinic
    })

    await servicesUser.assignRole({
      id:user.newUserId[0],
      role:1,
      editor: user.newUserId[0],
      creator:user.newUserId[0]
    })


    navigate("/InicioSesion");
  }

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
                isInvalid={
                  touchedFields.name && !regData.name.length > 0
                }
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
                  touchedFields.name && !regData.name.length > 0
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
                  touchedFields.name && !regData.name.length > 0
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
                  touchedFields.name && !regData.name.length > 0
                }
                
                required
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 8 caracteres y contener al
                menos una letra y un número.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button className="button-reg" onClick={async ()=>{
              await crearClinic(regData.name,regData.name,regData.email,regData.phoneNum, regData.password)
            }}> 
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
