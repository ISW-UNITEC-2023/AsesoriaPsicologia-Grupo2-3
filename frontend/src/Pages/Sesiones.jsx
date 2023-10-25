import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/tempprofile.png";
import logoUnitec from "../Styles/Images/unitec-logo.png";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import ListGroup from 'react-bootstrap/ListGroup';
import { PDFDownloadLink } from "@react-pdf/renderer";
import VistasPDF from "./DocuPDF";
import Button from 'react-bootstrap/Button';

function Sesiones() {
  return (
                <><ListGroup defaultActiveKey="#link1">
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 1
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 2
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 3
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 4
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 5
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 6
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 7
              </ListGroup.Item>
          </div>
          <div>
              <ListGroup.Item action href="/Expedientes">
                  SESION 8
              </ListGroup.Item>
          </div>
      </ListGroup><div>
              <PDFDownloadLink document={<VistasPDF />} fileName="expediente.pdf">
                  <Button>Descargar Expediente PDF</Button>
              </PDFDownloadLink>
          </div></>
  );
}

export default Sesiones;