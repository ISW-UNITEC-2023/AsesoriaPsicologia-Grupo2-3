import NavigationBar from "../Components/NavigationBar.jsx";
import "../Styles/CSS/AboutUsStyle.css";
import imgAbout from "../Styles/Images/3.png";

function AboutUs(props) {
    const {misionIcon, visionIcon, historyIcon} = props;

    return (
        <div className="about-us-container">
            <div className="navigation-bar">
                <NavigationBar {...props} />
            </div>
            <div className="ImagenPrincipal">
                <img src={imgAbout} alt="Banner" width={1513}/>
            </div>

            <div className="about-us-columns">
                <div className="about-us-column">
                    <h1 >Historia</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
                        tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrum exercitationem ullam corporis suscipit
                        laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                <div className="about-us-column">
                    <h1 >Visión</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
                        tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrum exercitationem ullam corporis suscipit
                        laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                <div className="about-us-column">
                    <h1 >Misión</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
                        tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrum exercitationem ullam corporis suscipit
                        laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <footer className="pie"></footer>
        </div>
    );
}

export default AboutUs;
