import {useState} from "react";
import {Slide} from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {useNavigate} from "react-router-dom";
import imagen1 from "../Styles/Images/Slide 1.png";
import imagen2 from "../Styles/Images/Slide 2.png";
import NavigationBar from "../Components/NavigationBar";
import HOWIE from "../Styles/Images/5.png";
import HOWIEHovered from "../Styles/Images/1.png";
import iconomujer from "../Styles/Images/icono mujer.jpg";
import iconohombre from "../Styles/Images/icono Hombre.jpg";
import LandingLayout from "../Layout/LandingLayout";

function LandingPage(props) {
    const navigate = useNavigate();
    const images = [imagen1, imagen2];

    const slideProperties = {
        duration: 7000,
        transitionDuration: 600,
        indicators: true,
    };

    const [isHowieHovered, setIsHowieHovered] = useState(false);

    const handleMouseOverHowie = () => {
        setIsHowieHovered(true);
    };

    const handleMouseOutHowie = () => {
        setIsHowieHovered(false);
    };

    const howieImage = isHowieHovered ? HOWIEHovered : HOWIE;

    return (
        <LandingLayout id="landing_page" pagina="Inicio">
            <div className="Home">
                <div className="navigation-bar">
                    <NavigationBar {...props} />
                </div>
                <main>
                    <div className="slide-container">
                        <Slide {...slideProperties}>
                            {images.map((each, index) => (
                                <img
                                    key={index}
                                    src={each}
                                    alt={`Slide ${index}`}
                                    className="centered-image"
                                />
                            ))}
                        </Slide>
                    </div>
                    <h1 className="text-center text-2xl lg:text-4xl">
                        Atención Psicológica
                    </h1>
                    <hr className="w-4/5 mx-auto border-b-2 border-red-600"/>
                    <div
                        className="video-and-box-container flex flex-col items-center justify-center lg:flex-row sm:flex-col
                sm:items-center sm:space-x-10 sm:mb-10 md:flex md:items-center md:justify-center md:flex-row"
                    >
                        <div className="youtube-video text-center mt-4 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-96 lg:w-96">
                            <iframe
                                width="360"
                                height="315"
                                src="https://www.youtube.com/embed/m5lK6e3oWQo"
                                title="Video de YouTube"
                                allowFullScreen
                                className="rounded-lg shadow-lg sm:w-52 sm:h-64 md:w-96 md:h-96 lg:w-96 lg:h-96 xl:w-96 xl:h-96"
                            ></iframe>
                        </div>
                        <div className="relative w-96 h-96 bg-blue-900 rounded-lg mt-10">
                            <img
                                src={howieImage}
                                alt="Howie"
                                className="overlay-image absolute bottom-0 left-0 w-72 h-96 transition-transform transform scale-55 ml-12"
                                onMouseOver={handleMouseOverHowie}
                                onMouseOut={handleMouseOutHowie}
                                onClick={() => {
                                    navigate("/Preguntas");
                                }}
                            />
                            <div
                                className="rounded-box2 w-80 h-24 bg-red-600 rounded-lg mt-64 absolute flex items-center justify-center ml-8">
                                <p className="text-white text-center font-bold text-sm">
                                    La incorporación de esta nueva plataforma permitirá fortalecer
                                    el esquema de atención Psicológica y ayudará a mejorar tu salud
                                    Mental.
                                </p>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-center text-3xl lg:text-4xl mt-4">
                        Palabras Sobre la Pagina
                    </h1>
                    <hr className="w-4/5 mx-auto border-b-1 border-red-600 mb-4"/>
                    <div
                        className="image-container lg:flex lg:flex-row lg:justify-between lg:items-center lg:space-x-10
                lg:mb-10 mr-5 ml-5 sm:flex sm:flex-col sm:justify-center sm:items-center"
                    >
                        <div className="lg:w-1/2 flex items-center justify-center">
                            <img
                                src={iconomujer}
                                alt="iconomujer"
                                className="w-64 h-64 sm:ml-10 lg:0"
                            />
                        </div>
                        <div
                            className="lg:w-1/2 text-mujer text-center text-gray-700 mt-4 mb-4 md:mt-0 md:mb-0 lg:mt-0 lg:mb-0">
                            <p>
                                En tiempos de desafíos y cambios, la salud mental es primordial.
                                En UNITEC, estamos comprometidos a proporcionarte un espacio
                                seguro donde puedas explorar tus pensamientos y emociones, y
                                trabajar juntos en el fortalecimiento de tu bienestar psicológico.
                            </p>
                        </div>
                        <div className="lg:w-1/2 flex items-center justify-center">
                            <img
                                src={iconohombre}
                                alt="iconohombre"
                                className="w-64 h-64 sm:ml-10 md:0 lg:0"
                            />
                        </div>
                        <div className="lg:w-1/2 text-hombre text-center text-gray-700 mt-4 mb-4 lg:mt-0 lg:mb-0">
                            <p>
                                La asistencia psicológica en UNITEC no solo se trata de afrontar
                                dificultades, sino también de potenciar tus fortalezas. Te
                                invitamos a aprovechar nuestros recursos para desarrollar
                                habilidades emocionales y enfrentar los desafíos de la vida
                                universitaria y más allá.
                            </p>
                        </div>
                    </div>
                </main>
                <footer className="bg-blue-900 text-white text-center py-10"></footer>
            </div>
        </LandingLayout>
    );
}

export default LandingPage;
