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
        <LandingLayout pagina="Inicio">
            <div className="Home overflow-hidden">
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
                       Clinica Virtual
                    </h1>
                    <hr className="w-4/5 mx-auto border-b-2 border-red-600"/>
                    <div>
                        <div className="flex justify-center">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/R8I0c4mmj3g?si=gWvUJErYBT02pDDb"
                                title="Video de YouTube"
                                allowFullScreen
                                
                            ></iframe>
                        </div>
                      
                    </div>
                    <h1 className="text-center text-3xl lg:text-4xl mt-4">
                        Palabras Sobre la Pagina
                    </h1>
                    <hr className="w-4/5 mx-auto border-b-1 border-red-600 mb-4"/>
                    <div
                        className="image-container lg:flex lg:flex-row lg:justify-between lg:items-center lg:space-x-10
                lg:mb-10 mr-8 ml-5 sm:flex sm:flex-col sm:justify-center sm:items-center"
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
                            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
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
                            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </p>
                        </div>
                    </div>
                </main>
                <footer className="text-white text-center py-10" style={{backgroundColor:"#113946"}}></footer>
            </div>
        </LandingLayout>
    );
}

export default LandingPage;
