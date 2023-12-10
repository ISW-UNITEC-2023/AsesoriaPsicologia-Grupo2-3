import React from "react";
import NavigationB from "../Components/Navbar";
import "../Styles/CSS/Proximamente.css";

function Proximamente() {
    return (
        <div id="proximamente_component" className="Proxi-container">
            <NavigationB />
            
            
            <div className="period-container">
                <h1>Periodo 1</h1>
                <div className="box box-1">
                    <p>Entorno y Política Económica</p>
                </div>
                <div className="box box-2">
                    <p>Métodos Cuantitativos</p>
                </div>
                <div className="box box-3">
                    <p>Teorías de Psicoterapia</p>
                </div>
            </div>
            </div>

            
    );
}

export default Proximamente;
