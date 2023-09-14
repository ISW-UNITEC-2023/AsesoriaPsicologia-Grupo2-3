import React, { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {useNavigate} from "react-router-dom";
import "../Styles/CSS/LandingPage.css";
import imagen1 from "../Styles/Images/Slide 1.png";
import imagen2 from "../Styles/Images/Slide 2.png";
import NavigationBar from "../Components/NavigationBar";
import HOWIE from "../Styles/Images/5.png";
import HOWIEHovered from "../Styles/Images/1.png"; 
import iconomujer from "../Styles/Images/icono mujer.jpg";
import iconohombre from "../Styles/Images/icono Hombre.jpg";

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
                <h1 className='h1-lp'>Atención Psicológica</h1>
                <hr className='hr-lp'/> 
                <div className="video-and-box-container">
                    <div className="youtube-video">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/m5lK6e3oWQo"
                            title="Video de YouTube"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="rounded-box"></div> 
                        <img
                            src={howieImage}
                            alt="Howie"
                            className="overlay-image"
                            onMouseOver={handleMouseOverHowie}
                            onMouseOut={handleMouseOutHowie}
                            onClick={() => {navigate("/Preguntas")}}
                        />
                    <div className="rounded-box2">
                        <p>La incorporación de esta nueva plataforma
                        permitirá fortalecer el esquema de atención 
                        Psicologica y ayudara a mejorar tu salud Mental.</p>
                    </div>
                </div>
                <h1 className='h1-lp'>Palabras Sobre la Pagina</h1>   
                <hr className='hr-lp'/>
                <div className="image-container">
                    <img src={iconomujer} alt="iconomujer" className="image-mujer" />
                <div className="text-mujer">
                    En tiempos de desafíos y cambios, la salud mental es primordial.
                    En UNITEC, estamos comprometidos a proporcionarte un espacio seguro donde puedas explorar
                    tus pensamientos y emociones, y trabajar juntos en el fortalecimiento de tu bienestar psicológico
                </div>
                <img src={iconohombre} alt="iconohombre" className="image-hombre" />
                <div className="text-hombre">
                    La asistencia psicológica en UNITEC no solo se trata de afrontar dificultades, 
                    sino también de potenciar tus fortalezas. Te invitamos a aprovechar nuestros recursos para desarrollar habilidades 
                    emocionales y enfrentar los desafíos de la vida universitaria y más allá.</div>
                </div>
            </main> 
            <footer 
                className="blue-footer">
            </footer>
        </div>
    );
}

export default LandingPage;