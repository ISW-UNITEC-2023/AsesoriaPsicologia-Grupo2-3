import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/tempprofile.png";
import logoUnitec from "../Styles/Images/unitec-logo.png";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import ListGroup from "react-bootstrap/ListGroup";
import { PDFDownloadLink } from "@react-pdf/renderer";
import VistasPDF from "./DocuPDF";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

function Sesiones() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          {" "}
          <Link to="/Expedientes">SESION 1</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/Expedientes2">SESION 2</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <Link to="/Expedientes3">SESION 3</Link>
        </ListGroup.Item>
        <ListGroup.Item to="/Expedientes7">SESION 4</ListGroup.Item>
        <ListGroup.Item to="/Expedientes7">SESION 5</ListGroup.Item>
        <ListGroup.Item to="/Expedientes7">SESION 6</ListGroup.Item>
        <ListGroup.Item to="/Expedientes7">SESION 7</ListGroup.Item>
        <ListGroup.Item to="/Expedientes7">SESION 8</ListGroup.Item>
      </ListGroup>
      <div>
        <PDFDownloadLink document={<VistasPDF />} fileName="expediente.pdf">
          <Button style={{ backgroundColor: "#0b5ed7" }}>
            Descargar Expediente PDF
          </Button>
        </PDFDownloadLink>
      </div>
    </>
  );
}

export default Sesiones;
