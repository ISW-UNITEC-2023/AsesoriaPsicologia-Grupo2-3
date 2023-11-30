import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/Encabezado.png";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Vistas() {
  const [patientInfo, setPatientInfo] = useState({
    nombre: "",
    fechaNacimiento: "",
    identidad: "",
    direccion: "",
    estadoCivil: "",
  });

  const [doctorName, setDoctorName] = useState("");
  const [reasonForConsultation, setReasonForConsultation] = useState("");
  const [observations, setObservations] = useState("");
  const [consultationAmount, setConsultationAmount] = useState("");
  const [medicalOrders, setMedicalOrders] = useState("");

  const downloadPDF = () => {
    const input = document.getElementById("pdf-container");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Expediente.pdf");
    });
  };

  return (
    <div className="page-container">
      <Container id="pdf-container">
      <img src={tempImage} alt="Encabezado" className="encabezado-image" /> 
      <div className="Titulo">
        <h1>Información del Paciente</h1>
        <p>Detalles importantes sobre el paciente</p>
      </div>
      <Row>
          <Col md={12}>
            <table className="patient-info-table">
              <tbody>
                <tr>
                  <td className="left-column">Nombre:</td>
                  <td className="right-column">{patientInfo.nombre}</td>
                </tr>
                <tr>
                  <td className="left-column">Fecha de Nacimiento:</td>
                  <td className="right-column">{patientInfo.fechaNacimiento}</td>
                </tr>
                <tr>
                  <td className="left-column">Identidad:</td>
                  <td className="right-column">{patientInfo.identidad}</td>
                </tr>
                <tr>
                  <td className="left-column">Dirección:</td>
                  <td className="right-column">{patientInfo.direccion}</td>
                </tr>
                <tr>
                  <td className="left-column">Estado Civil:</td>
                  <td className="right-column">{patientInfo.estadoCivil}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="title-margin">Motivo de Consulta: {reasonForConsultation}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="paragraph-margin">Observaciones: {observations}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="paragraph-margin">Monto de Consulta: {consultationAmount}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="paragraph-margin">Órdenes Médicas: {medicalOrders}</p>
          </Col>
        </Row>
      </Container>
      <div className="fixed-buttons-container">
        <button className="btn btn-primary fixed-download-button" onClick={downloadPDF}>
          Descargar PDF
        </button>
      </div>
    </div>
  );
}

export default Vistas;
