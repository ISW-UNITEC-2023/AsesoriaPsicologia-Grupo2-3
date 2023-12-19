import { useEffect, useState } from "react";
import "../Styles/CSS/LoginStyle.css";
import NavigationBar from "../Components/NavigationBar.jsx";
import fraseData from "../Styles/Extras/frases.json";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../Layout/LoginLayout.jsx";
import Services from "../Utilities/login-services.js";

function Login(props) {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate("/ResetPassword");
  };

  //Rellenar frases
  const [frases, setFrases] = useState({
    frase: [],
    autor: [],
    dispFrase: "",
    dispAutor: "",
  });

  //Fetch de frases
  const getFrases = async () => {
    for (let i = 0; i < fraseData.length; i++) {
      frases.frase.push(fraseData[i].frase);
      frases.autor.push(fraseData[i].autor);
    }
  };

  //Ejecutar fetch de frases
  getFrases().then((r) => r);

  //Función para obtener una frase aleatoria y rotarla
  const getFrase = () => {
    let num = Math.floor(Math.random() * frases.frase.length);
    let frase = frases.frase;
    let autor = frases.autor;
    setFrases({
      ...frases,
      dispFrase: frase[num],
      dispAutor: autor[num],
    });
  };

  //Ejecutar función de frase
  useEffect(() => {
    if (frases.frase.length > 0) {
      getFrase();
    }
    const interval = setInterval(() => {
      getFrase();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  //Backend de Login
  const handleLoginSuccess = (e) => {
    props.onLoginSuccess(e);
    props.setUserDataLoaded(true);
    e.preventDefault();

    //navigate("/Dashboard");
  };

  const [errors, setErrors] = useState({ general: "" });

  const [form, setform] = useState({
    email: "",
    password: "",
    registro: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Services.postLogin(form.email, form.password, form.registro);
    if (response.errorMessage !== undefined) {
      setErrors({
        general: response.errorMessage[0],
      });
    } else {
      localStorage.setItem("accesstoken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("name_user", response.name);
      localStorage.setItem("email_user", form.email);
      localStorage.setItem("user_id", response.id);
      try {
        handleLoginSuccess(event);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <LoginLayout id="login_component" pagina="Iniciar Sesión">
        <div className={"bodyL"}>
          <div className="navigation-bar">
            <NavigationBar {...props} />
          </div>
          <div className="elementos-rotativos hidden md:flex lg:flex">
            <span className="frase-rotativo">{frases.dispFrase}</span>
            <span className="autor-rotativo">{frases.dispAutor}</span>
          </div>
          <form
            id="login_component_formulario_login"
            className="login-form"
            onSubmit={(e) => {
              handleSubmit(e).then((r) => r);
            }}
          >
            <div className="containerL">
              <h2 className="title">Ingresa tus datos</h2>
              <input
                id="login_component_formulario_login_correo_electronico"
                type="text"
                name="Numero de clinica "
                className="input"
                placeholder="Numero de clinica "
                value={form.registro}
                onChange={(e) => {
                  setform({ ...form, registro: e.target.value });
                }}
                required
              />
              <input
                type="text"
                name="email"
                className="input"
                value={form.email}
                placeholder="Correo Electrónico"
                onChange={(e) => {
                  setform({ ...form, email: e.target.value });
                }}
                required
              />
              <input
                id="login_component_formulario_login_contrasena"
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
              {errors.general !== "" && (
                <label className="error">{errors.general}</label>
              )}
              <button
                id="login_component_formulario_login_inicar_sesion_btn"
                className="button"
                type="submit"
              >
                Inicia sesión
              </button>
              <p
                id="login_component_formulario_login_olvidaste_contrasena"
                className="forgot-passwordL"
                onClick={handleForgotPasswordClick}
              >
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
