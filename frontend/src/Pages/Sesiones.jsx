import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/tempprofile.png";
import logoUnitec from "../Styles/Images/unitec-logo.png";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import ListGroup from 'react-bootstrap/ListGroup';
import "../Styles/CSS/Sesiones.css";
import { Link } from "react-router-dom";

function Sesiones() {
  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-sesiones" style={{ width: "400%" }}>
          Sesiones
        </h1>
      </div>
      <ul>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 1</Link>
              </span>
            </div>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 2</Link>
              </span>
            </div>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 3</Link>
              </span>
            </div>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 4</Link>
              </span>
            </div>
                        <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 5</Link>
              </span>
            </div>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 6</Link>
              </span>
            </div>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 7</Link>
              </span>
            </div>
            <div className="nombre-box">
              <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/Expedientes"}>Sesion 8</Link>
              </span>
            </div>
      </ul>
    </div>
  );
}

export default Sesiones;