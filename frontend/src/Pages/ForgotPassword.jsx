import NavigationBar from "../Components/NavigationBar.jsx";
import React, {useRef, useState} from "react";
import {toast} from "react-toastify";
import "../Styles/CSS/ForgotStyle.css";
import ForgotLayout from "../Layout/ForgotLayout";
import {useNavigate} from "react-router-dom";

export const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    // Apartado de ingresar token
    const [isTokenValid, setIsTokenValid] = useState(false);
    const inputRefs = useRef([]);
    const [token, setToken] = useState(["", "", "", "", "", ""]);
    // Apartado de cambiar contraseña
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordsMatch] = useState(false);

    // Validar que el correo sea un correo válido
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail)
        setIsEmailValid(validateEmail(newEmail));
    }

    // Al hacer clic en recuperar contraseña, se envía un token al correo electrónico
    const handleForgotPasswordClick = () => {
        if (isEmailValid) {
            toast.success("Se ha enviado un token a su correo electrónico", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark"

            });
            // Espera 3 segundos antes de cambiar el componente a la página de ingresar el token
            setTimeout(() => {
                setIsEmailSent(true);
            }, 3000);

        } else {
            // Que se muestre un mensaje de error en la parte de arriba de la página
            toast.error("El correo ingresado no es válido", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark"
            });
        }
    }

    // Al hacer clic en enviar, sé válida que el token sea correcto
    const handleTokenSubmit = () => {
        // Validar que el token sea de 6 dígitos
        const re = /^\d{6}$/;
        const isTokenValid = re.test(token.join(""));

        if (isTokenValid) {
            toast.success("Proceda a cambiar su contraseña", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark"
            });
            // Espera 3 segundos antes de cambiar el componente a la página de ingresar el token
            setTimeout(() => {
                setIsTokenValid(true);
                setIsEmailSent(false)
            }, 3000);

        } else {
            // Que se muestre un mensaje de error en la parte de arriba de la página
            toast.error("El token ingresado no es válido", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark"
            });
        }
    }

    // Si el correo es válido, se envía un token al correo electrónico y cambia el componente a la página de ingresar el token4
    if (isEmailSent) {
        // Cuando se ingresa un token, se actualiza el estado del token y se cambia el foco al siguiente campo de entrada
        const handleChangeToken = (e, index) => {
            const value = e.target.value;

            // Actualiza el valor del token en el estado
            const newToken = [...token];
            newToken[index] = value;
            setToken(newToken);

            // Cambia el foco al siguiente campo de entrada si hay texto
            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        };

        return (
            <>
                <ForgotLayout pagina="Recuperar Contraseña">
                    <div className={"bodyF"}>
                        <div className="navigation-bar">
                            <NavigationBar {...props} />
                            <div className="forgot-form">
                                <div className="containerF">
                                    <h2 className="title">Ingresa el token</h2>
                                    <div className="token-input">
                                        {token.map((letter, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength="1"
                                                className="rectangle-input"
                                                value={letter}
                                                onChange={(e) =>
                                                    handleChangeToken(e, index)}
                                                ref={(input) =>
                                                    (inputRefs.current[index] = input)}
                                            />
                                        ))}
                                    </div>
                                    <button className="button" type="submit" onClick={handleTokenSubmit}>
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ForgotLayout>
            </>
        )
    }

    // Si el token es válido, se cambia el componente a la página de ingresar la nueva contraseña
    if (isTokenValid) {
        const handleNewPasswordSubmit = () => {
            // Validar que la contraseña sea de al menos 8 caracteres, una letra y un número
            const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            setIsPasswordValid(re.test(newPassword));

            // Validar que la contraseña y la confirmación de la contraseña sean iguales
            if (!isPasswordValid || !isPasswordsMatch && newPassword !== confirmNewPassword) {
                toast.error("Las contraseñas no coinciden", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark"
                });
                return;
            }

            toast.success("Se ha cambiado la contraseña con éxito", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark"
            });
            // Espera 3 segundos antes de cambiar el componente a la página de ingresar el token
            setTimeout(() => {
                navigate("/InicioSesion");
            }, 3000);
        }

        return (
            <>
                <ForgotLayout pagina="Recuperar Contraseña">
                    <div className={"bodyF"}>
                        <div className="navigation-bar">
                            <NavigationBar {...props} />
                            <div className="forgot-form">
                                <div className="containerF">
                                    <h2 className="title">Ingresa tu nueva contraseña</h2>
                                    <input
                                        type="password"
                                        placeholder="Nueva Contraseña"
                                        className="input"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirmar Contraseña"
                                        className="input"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <button className="button" type="submit" onClick={handleNewPasswordSubmit}>
                                        Cambiar Contraseña
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ForgotLayout>
            </>
        )
    }

    return (
        <>
            <ForgotLayout pagina="Recuperar Contraseña">
                <div className={"bodyL"}>
                    <div className="navigation-bar">
                        <NavigationBar {...props} />
                    </div>
                    <div className="forgot-form">
                        <div className="containerF">
                            <h2 className="title">Ingresa tus datos</h2>
                            <input
                                type="text"
                                placeholder="Correo Electronico"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={() => setIsEmailValid(validateEmail(email))}
                                className="input"
                            />
                            {!isEmailValid && email.length > 0 &&
                                <p className="error-message">El correo ingresado no es válido</p>}
                            <button className="button" type="submit" onClick={handleForgotPasswordClick}>
                                Recuperar Contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </ForgotLayout>
        </>
    )
}

export default ForgotPassword;