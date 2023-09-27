import {useEffect, useState} from "react";
import "../Styles/CSS/LoginStyle.css";
import NavigationBar from "../Components/NavigationBar.jsx";
import fraseData from "../Styles/Extras/frases.json";
import {useNavigate} from "react-router-dom";
import LoginLayout from "../Layout/LoginLayout.jsx";
import validator from '../Utilities/validator.js';
import Services from '../Utilities/login-services.js';

function Login(props) {
    const [ setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleForgotPasswordClick = () => {
        navigate('/ResetPassword');
    }

    //Rellenar frases
    const [frases, setFrases] = useState({
        frase: [],
        autor: [],
        dispFrase: "",
        dispAutor: ""
    })

    //Fetch de frases
    const getFrases = async () => {
        for (let i = 0; i < fraseData.length; i++) {
            frases.frase.push(fraseData[i].frase);
            frases.autor.push(fraseData[i].autor);
        }
    }

    //Ejecutar fetch de frases
    useEffect(() => {
        getFrases().then(r => r);
    }, [])

    //Función para obtener una frase aleatoria y rotarla
    const getFrase = () => {
        let num = Math.floor(Math.random() * frases.frase.length);
        let frase = frases.frase;
        let autor = frases.autor;
        setFrases({
            ...frases,
            dispFrase: frase[num],
            dispAutor: autor[num]
        })

    }

    //Ejecutar función de frase
    useEffect(() => {
        if (frases.frase.length > 0) {
            getFrase();
        }
        const interval = setInterval(() => {
            getFrase();
        }, 15000);
        return () => clearInterval(interval);
    }, [])

    //Backend de Login
    const handleLoginSuccess = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        navigate('/Dashboard');
    }

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general:"",
    });
    
    
    const [form, setform] = useState({
        email:"",
        password:"",
    });
      
    const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(form.email)
    if (!validator.isEmail(form.email)) {
        setErrors({
        ...errors,
        email: "Email is invalid",
        });
    } else {
        //console.log("email good");
    }

    if (!validator.isPassword(form.password)) {
        setErrors({
        ...errors,
        password: "Password is invalid",
        });
    }
    
    if (!errors.email && !errors.password) {
        //console.log("form is valid");
        const responese = await Services.postLogin(form.email, form.password);
        ////console.log(responese.id)
        if(!responese.message) {
        setform({
            email:"",
            password:""
        })
            // console.log(responese.message.length)
            if(responese.message.length == 2)
            {
            setErrors({
                email:"",
                password:"", 
                general: "Email and Password are invalid"}
            )
            }else{
            setErrors({
                email:"",
                password:"", 
                general: responese.message}
            )
            }
        }else{
        localStorage.setItem("accesstoken", responese.accessToken)
        localStorage.setItem("refreshToken", responese.refreshToken)
        try {
            handleLoginSuccess();
        } catch (error) {
            //console.log(error)
        }
        }
    }
    };

    return (
        <>
            <LoginLayout pagina="Iniciar Sesión">
                <div className={"bodyL"}>
                    <div className="navigation-bar">
                        <NavigationBar {...props} />
                    </div>
                    <div className="elementos-rotativos">
                        <span className="frase-rotativo">{frases.dispFrase}</span>
                        <span className="autor-rotativo">{frases.dispAutor}</span>
                    </div>
                    <form className="login-form" onSubmit={(e)=>{handleSubmit(e)}}>
                        <div className="containerL">
                            <h2 className="title">Ingresa tus datos</h2>
                            <input
                                type="text"
                                name="email"
                                className="input"
                                value={form.email}
                                placeholder="Correo Electronico"
                                onChange={(e) => {
                                  setform({ ...form, email: e.target.value });
                                    console.log(e.target.value)
                                }}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                className="input"
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={(e) => {
                                  setform({ ...form, password: e.target.value });
                                }}
                                required
                            />
                            <label className="error">
                                {errors.general}
                            </label>
                            <button className="button" type="submit">
                                Inicia sesión
                            </button>
                            <p className="forgot-passwordL" onClick={handleForgotPasswordClick}>
                                ¿Olvidaste tu contraseña?
                            </p>
                        </div>
                    </form>
                <div className="footer-general">
                    <p className="footerL">FUNDAEMPRESA UNITEC</p>
                    <p className="footerL">© 2023 - Todos los derechos reservados</p>
                </div>
            </div>
            </LoginLayout>
        </>
    );
}

export default Login;
