import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ProgressBar, Button, Form } from 'react-bootstrap';
import "../Styles/CSS/WizardStyle.css";
import NavigationBar from "../Components/NavigationBar";
import quesData from "../Styles/Extras/preguntas.json";

function Wizard(props) {
    const navigate = useNavigate();
    const { howieImg } = props;
    const [progress, setProgress] = useState(0);

    //Componentes de Registro
    const [regData, setRegData] = useState({
        name: "",
        date: "",
        phoneNum: "",
        email: "",
        password: "",
    })

    const [validations, setValidations] = useState({
        isPhoneNumValid: false,
        isEmailValid: false,
        isPasswordValid: false
    })

    //Validaciones de Registro
    const valideData = (data) => {
        let re = "";
        if (data === "email") {
            re = /\S+@\S+\.\S+/;
            return re.test(regData.email);
        } else if (data === "phoneNum") {
            re = /^\d{8}$/;
            return re.test(regData.phoneNum);
        } else if (data === "password") {
            re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return re.test(regData.password);
        }
    }

    // Valida que el dato sea válido
    const handleRegChange = (e) => {
        const value = e.target.value;
        const dataName = e.target.name;
        setRegData({
            ...regData,
            [e.target.name]: value,
        })
        if (dataName === "email") {
            setValidations({
                ...validations,
                isEmailValid: valideData(dataName)
            })
        } else if (dataName === "phoneNum") {
            setValidations({
                ...validations,
                isPhoneNumValid: valideData(dataName)
            })
        } else if (dataName === "password") {
            setValidations({
                ...validations,
                isPasswordValid: valideData(dataName)
            })
        }
    }

    //Componentes de Wizard
    const [preguntas, setPreguntas] = useState({
        pregunta: [],
        respuestas: [],
        dispPregunta: "",
        dispRespuestas: [],
        indice: 0,
    });

    //extraer preguntas del json
    const getPreguntas = async () => {
        try {
            const preguntasArray = quesData.preguntas.map((pregunta) => {
                return {
                    pregunta: pregunta.pregunta,
                    respuestas: pregunta.respuestas,
                };
            });

            setPreguntas({
                pregunta: preguntasArray,
                dispPregunta: preguntasArray[0].pregunta,
                dispRespuestas: preguntasArray[0].respuestas,
                indice: 0,
            });
        } catch (error) {
            console.log(error);
        }
    };
    //Ejecutar fetch de preguntas
    useEffect(() => {
        if (preguntas.pregunta.length === 0) {
            getPreguntas().then(r => r);
        }
    }, [])

    const handlePregunta = (index) => {
        try {
            setPreguntas({
                ...preguntas,
                dispPregunta: preguntas.pregunta[preguntas.indice + 1].pregunta,
                dispRespuestas: preguntas.pregunta[preguntas.indice + 1].respuestas,
                indice: preguntas.indice + 1,
            });

            setProgress((preguntas.indice + 1) * 100 / preguntas.pregunta.length);
        } catch (e) {
            setPreguntas({
                ...preguntas,
                indice: preguntas.indice + 1,
            });
            console.log(e);
        }

    };

    return (

                            <div className="containerReg">
                                <div className="navigation-bar">
                    <NavigationBar {...props} />
                        </div>
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
                                    <Form.Group controlId="formPhone" className="mb-3">
                                        <Form.Label>Numero de Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNum"
                                            value={regData.phoneNum}
                                            onChange={(e) => handleRegChange(e)}
                                            onBlur={() =>
                                                setValidations({
                                                    ...validations,
                                                    isPhoneNumValid: valideData("phoneNum")
                                                })
                                            }
                                            isInvalid={!validations.isPhoneNumValid && !regData.phoneNum.length > 0}
                                            required
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
                    
               
            
    );

}

export default Wizard;