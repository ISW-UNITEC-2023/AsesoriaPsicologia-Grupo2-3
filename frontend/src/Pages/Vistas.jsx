import { Col, Container, Row } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/Encabezado.png";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Vistas() {
  const [patientInfo, setPatientInfo] = useState({
    nombre: "",
    fechaNacimiento: "",
    identidad: "",
    direccion: "",
    estadoCivil: "",
  });

  const navigate = useNavigate();
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
                  <td className="right-column">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      value={patientInfo.nombre}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-column">Fecha de Nacimiento:</td>
                  <td className="right-column">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Fecha de Nacimiento"
                      value={patientInfo.fechaNacimiento}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-column">Identidad:</td>
                  <td className="right-column">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Identidad"
                      value={patientInfo.identidad}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-column">Dirección:</td>
                  <td className="right-column">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Direccion"
                      value={patientInfo.direccion}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left-column">Estado Civil:</td>
                  <td className="right-column">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Estado Civil"
                      value={patientInfo.estadoCivil}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="title-margin">
              Motivo de Consulta:{" "}
              {
                <Input
                  type="text"
                  variant="standard"
                  color="blue-gray"
                  placeholder="Motivo de Consulta"
                  value={reasonForConsultation}
                  onChange={(e) => setReasonForConsultation(e.target.value)}
                />
              }
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="paragraph-margin">
              Observaciones:{" "}
              {
                <Input
                  className="h-12"
                  type="text"
                  variant="standard"
                  color="blue-gray"
                  placeholder="Observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                />
              }
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="paragraph-margin">
              Monto de Consulta:{" "}
              {
                <Input
                  type="number"
                  variant="standard"
                  color="blue-gray"
                  placeholder="Monto de Consulta"
                  value={consultationAmount}
                  onChange={(e) => setConsultationAmount(e.target.value)}
                />
              }
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="paragraph-margin">
              Órdenes Médicas:{" "}
              {
                <Input
                  type="text"
                  size="sm"
                  variant="standard"
                  color="blue-gray"
                  placeholder="Órdenes Médicas"
                  value={medicalOrders}
                  onChange={(e) => setMedicalOrders(e.target.value)}
                />
              }
            </p>
          </Col>
        </Row>
      </Container>
      <div className="fixed-buttons-container">
        <button
          className="btn btn-primary fixed-download-button"
          onClick={downloadPDF}
        >
          Descargar PDF
        </button>
        <button
          className="btn btn-secondary fixed-back-button"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default Vistas;
