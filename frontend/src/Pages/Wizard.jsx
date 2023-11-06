import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import "../Styles/CSS/WizardStyle.css";
import NavigationBar from "../Components/NavigationBar";
import quesData from "../Styles/Extras/preguntas.json";

function Wizard(props) {
    const navigate = useNavigate();
    const {howieImg} = props;

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
        if(data === "email"){
            re = /\S+@\S+\.\S+/;
            return re.test(regData.email);
        }else if(data === "phoneNum"){
            re = /^\d{8}$/;
            return re.test(regData.phoneNum);
        }else if(data === "password"){
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
        if(dataName === "email"){
            setValidations({
                ...validations,
                isEmailValid: valideData(dataName)
            })
        }else if(dataName === "phoneNum"){
            setValidations({
                ...validations,
                isPhoneNumValid: valideData(dataName)
            })
        }else if(dataName === "password"){
            setValidations({
                ...validations,
                isPasswordValid: valideData(dataName)
            })
        }
    }

    //Componentes de Wizard
    const [preguntas, setPreguntas] = useState({
        pregunta: [],
        respuesta1: [],
        respuesta2: [],
        respuesta3: [],
        dispPregunta: "",
        dispRespuesta1: "",
        dispRespuesta2: "",
        dispRespuesta3: "",
        indice: 0
    })

    //extraer preguntas del json
    const getPreguntas = async () => {
        for (let i = 0; i < quesData.length; i++) {
            preguntas.pregunta.push(quesData[i].pregunta);
            preguntas.respuesta1.push(quesData[i].respuestas.resp1);
            preguntas.respuesta2.push(quesData[i].respuestas.resp2);
            preguntas.respuesta3.push(quesData[i].respuestas.resp3);
        }
        setPreguntas({
            ...preguntas,
            dispPregunta: preguntas.pregunta[0],
            dispRespuesta1: preguntas.respuesta1[0],
            dispRespuesta2: preguntas.respuesta2[0],
            dispRespuesta3: preguntas.respuesta3[0]
        })
    }

    //Ejecutar fetch de preguntas
    useEffect(() => {
        if(preguntas.pregunta.length === 0){
            getPreguntas().then(r => r);
        }
    }, [])

    const handlePregunta = (index) => {
        setPreguntas({
            ...preguntas,
            dispPregunta: preguntas.pregunta[preguntas.indice+1],
            dispRespuesta1: preguntas.respuesta1[preguntas.indice+1],
            dispRespuesta2: preguntas.respuesta2[preguntas.indice+1],
            dispRespuesta3: preguntas.respuesta3[preguntas.indice+1],
            indice: preguntas.indice+1
        })
    }

    return (
        <>
            <div className={"bodyR"}>
                <div className="navigation-bar">
                    <NavigationBar {...props}/>
                </div>
                {preguntas.indice <= preguntas.pregunta.length-1 &&
                    <div className="progress-bar">
                        {preguntas.pregunta.map((pregunta, index) => {
                            if(index >= preguntas.indice){
                                return (<div className="progress-bar-item" key={index} style={{backgroundColor: "rgb(173,178,171)"}}></div>)
                            }else{
                                return (<div className="progress-bar-item" key={index} style={{backgroundColor: "rgb(166,155,222)"}}></div>)
                            }
                        })}
                    </div>
                }
                <div className="wizard">
                    <div className="wizard-mascota">
                        <img src={howieImg} alt="" className="howie-img"/>
                    </div>
                    <div className="register-form">
                        {preguntas.indice <= preguntas.pregunta.length-1 ? (
                            <div className="">
                                <div className="wizard-pregunta">
                                    <p>{preguntas.dispPregunta}</p>
                                </div>
                                <div className="wizard-respuestas">
                                    <div>
                                        <button 
                                            className="wizard-respuesta"
                                            onClick={()=>{handlePregunta(1)}}
                                            >{preguntas.dispRespuesta1}
                                        </button>
                                    </div>
                                    <div>
                                        <button className="wizard-respuesta"
                                            onClick={()=>{handlePregunta(2)}}>
                                            {preguntas.dispRespuesta2}
                                        </button>
                                    </div>
                                    <div>
                                        <button className="wizard-respuesta"
                                            onClick={()=>{handlePregunta(3)}}>
                                            {preguntas.dispRespuesta3}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="containerReg">
                                <label className="label-reg-form">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={regData.name}
                                    onChange={(e) => handleRegChange(e)}
                                    className="input-reg"
                                    required={true}
                                />
                                <label className="label-reg-form">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={regData.date}
                                    onChange={(e) => handleRegChange(e)}
                                    className="input-reg"
                                    required={true}
                                />
                                <label className="label-reg-form">Numero de Teléfono</label>
                                <input
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
                                    className="input-reg"
                                    required={true}
                                />
                                {!validations.isPhoneNumValid && regData.phoneNum.length > 0 &&
                                    <p className="error-message-reg">El número de teléfono debe tener 8 dígitos</p>}
                                <label className="label-reg-form">Correo Eléctronico</label>
                                <input
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
                                    className="input-reg"
                                    required={true}
                                />
                                {!validations.isEmailValid && regData.email.length > 0 &&
                                    <p className="error-message-reg">El correo electrónico debe ser válido</p>}
                                <label className="label-reg-form">Contraseña</label>
                                <input
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
                                    className="input-reg"
                                    required={true}
                                />
                                {!validations.isPasswordValid && regData.password.length > 0 && <p className="error-message-reg">La contraseña
                                    debe tener al menos 8 caracteres y contener al menos una letra y un número</p>}
                                <button className="button-reg" type="submit">
                                    Crear cuenta
                                </button>
                                <Link className="forgot-passwordR" to="/InicioSesion">
                                    ¿Ya tienes una cuenta?
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="footer-general">
                    <p className="footerL">FUNDAEMPRESA UNITEC</p>
                    <p className="footerL">© 2023 - Todos los derechos reservados</p>
                </div>
            </div>
        </>
    )
}

export default Wizard;