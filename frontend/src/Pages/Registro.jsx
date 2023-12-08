import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import "../Styles/CSS/Registro.css";
import NavigationBar from "../Components/NavigationBar";

function Wizard(props) {
    const [regData, setRegData] = useState({
        name: "",
        date: "",
        phoneNum: "",
        email: "",
        password: "",
        image: null,
    });
    const [validations, setValidations] = useState({
        isPhoneNumValid: false,
        isEmailValid: false,
        isPasswordValid: false
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
        // Aquí puedes enviar los datos del formulario, incluida la imagen, a tu backend
        // por ejemplo, usando fetch() o tu método preferido para enviar datos.
        console.log(regData); // Esto muestra los datos en la consola para propósitos de demostración
    };

    return (
        <div className="containerReg">
            <div className="navigation-bar">
                <NavigationBar {...props} />
            </div>
            <div className="form-container">

            <Form>
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Label>Nombre Completo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={regData.name}
                                            onChange={(e) => handleRegChange(e)}
                                            placeholder="Ingrese su nombre completo"
                                            isInvalid={!regData.name.length > 0}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            El nombre no puede estar vacío.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formDate" className="mb-3">
                                        <Form.Label>Fecha de Nacimiento</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={regData.date}
                                            onChange={(e) => handleRegChange(e)}
                                            required
                                        />
                                    </Form.Group>

                                    
                                        <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Subir imagen</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*" // Acepta archivos de imagen
                        />
                                        <Form.Control.Feedback type="invalid">
                                            El número de teléfono debe tener 8 dígitos.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>Correo Eléctronico</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={regData.email}
                                            onChange={(e) => handleRegChange(e)}
                                            onBlur={() =>
                                                setValidations({
                                                    ...validations,
                                                    isEmailValid: valideData("email")
                                                })
                                            }
                                            isInvalid={!validations.isEmailValid && !regData.email.length > 0}
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
                                                    isPasswordValid: valideData("password")
                                                })
                                            }
                                            isInvalid={!validations.isPasswordValid && !regData.password.length > 0}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                        <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Subir imagen</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*" // Acepta archivos de imagen
                        />
                    </Form.Group>
                <Button className="button-reg" type="submit">
                    Crear cuenta
                </Button>
            </Form>
            <Link className="forgot-passwordR" to="/InicioSesion">
                ¿Ya tienes una cuenta?
            </Link>

            <div className="footer-general">
                <p className="footerL">FUNDAEMPRESA UNITEC</p>
                <p className="footerL">© 2023 - Todos los derechos reservados</p>
            </div>
        </div>
        </div>
    );
}

export default Wizard;
