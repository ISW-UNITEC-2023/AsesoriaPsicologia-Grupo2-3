import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/tempprofile.png";
import logoUnitec from "../Styles/Images/unitec-logo.png";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Vistas() {
  const [expedienteData, setExpedienteData] = useState({
    nombre: "Fernando David Sosa Flores",
    fechaNacimiento: "12/09/03",
    Direccion: "San Carlos de Sula",
    correo: "fernandososa03@untiec.edu",
    estadoCivil: "Soltero",
    tratamiento: "Depresion",
    Antecedentes: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                      Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                      natoque penatibus et magnis dis parturient montes, nascetur
                      ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                      pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                      justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                      dictum felis eu pede link mollis pretium. Integer tincidunt.
                      Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                      eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                      vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                      viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                      metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                      ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
    medicamentos: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                       Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                       natoque penatibus et magnis dis parturient montes, nascetur
                       ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                       pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                       justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                       dictum felis eu pede link mollis pretium. Integer tincidunt.
                       Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                       eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                       vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                       viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                       metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                       ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
    evaluacion: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                     Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                     natoque penatibus et magnis dis parturient montes, nascetur
                     ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                     pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                     justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                     dictum felis eu pede link mollis pretium. Integer tincidunt.
                     Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                     eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                     vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                     viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                     metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                     ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
    Objetivos: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                    pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                    justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                    dictum felis eu pede link mollis pretium. Integer tincidunt.
                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                    eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                    vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                    viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                    metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                    ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
    Notas: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
    Progreso: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                   Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                   natoque penatibus et magnis dis parturient montes, nascetur
                   ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                   pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                   justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                   dictum felis eu pede link mollis pretium. Integer tincidunt.
                   Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                   eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                   vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                   viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                   metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                   ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
    apoyo: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
  });

  const downloadPDF = () => {
    const input = document.getElementById("pdf-container");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("expediente.pdf");
    });
  };

  const clearCasillas = () => {
    setExpedienteData({
      nombre: "",
      fechaNacimiento: "",
      Direccion: "",
      correo: "",
      estadoCivil: "",
      tratamiento: "",
      Antecedentes: "",
      medicamentos: "",
      evaluacion: "",
      Objetivos: "",
      Notas: "",
      Progreso: "",
      apoyo: "",
    });
  };
  return (
    <div className="page-container">
      <Container id="pdf-container">
        <Row>
          <Col md={3}>
            <img
              src={tempImage}
              alt="Perfil del paciente"
              className="profile-image"
            />
          </Col>
          <Col md={5}>
            <p className="profile-text">Fernando David Sosa Flores</p>
          </Col>
          <Col
            md={4}
            style={{
              display: "flex",
              right: "0",
              top: "0",
              marginTop: "4vh",
            }}
          >
            <img src={logoUnitec} alt="Logo Unitex" className="unitec-image" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Container id="pdf-container">
              <h1 className="text-center">Expediente</h1>

              <p className="h3">Datos personales</p>

              <div className="text-container">
                <p className="fs-5 with-underline">Nombre: </p>
                <p className="fs-5-alignment">{expedienteData.nombre}</p>
              </div>

              <div className="text-container">
                <p className="fs-5 with-underline">Fecha de nacimiento: </p>
                <p className="fs-5-alignment">
                  {expedienteData.fechaNacimiento}
                </p>
              </div>

              <div className="text-container">
                <p className="fs-5 with-underline">Direccion: </p>
                <p className="fs-5-alignment">{expedienteData.Direccion}</p>
              </div>

              <div className="text-container">
                <p className="fs-5 with-underline">Correo Electronico: </p>

                <p className="fs-5-alignment">{expedienteData.correo}</p>
              </div>

              <div className="text-container">
                <p className="fs-5 with-underline">Estado Civil: </p>
                <p className="fs-5-alignment">{expedienteData.estadoCivil}</p>
              </div>

              <p className="h3">Historial Clinico</p>

              <div className="text-container">
                <p className="fs-5 with-underline">
                  Modula de Participacion Inicial:{" "}
                </p>
                <p className="fs-5-alignment">{expedienteData.tratamiento}</p>
              </div>

              <Container text>
                <p className="h3">Antecedentes Medicos: </p>
                <p className="fs-5-alignment">{expedienteData.Antecedentes}</p>
              </Container>

              <Container text>
                <p className="h3">Uso de medicamentos: </p>
                <p className="fs-5-alignment">{expedienteData.medicamentos}</p>
              </Container>

              <p className="h3">Evaluacion Inicial</p>
              <Container text>
                <p className="fs-5-alignment">{expedienteData.evaluacion}</p>
              </Container>

              <p className="h3">Objetivos y plan de tratamiento</p>
              <Container text>
                <p className="fs-5-alignment">{expedienteData.Objetivos}</p>
              </Container>

              <p className="h3">Notas de Sesion</p>
              <Container text>
                <p className="fs-5-alignment">{expedienteData.Notas}</p>
              </Container>

              <p className="h3">Progreso del Paciente</p>
              <Container text>
                <p className="fs-5-alignment">{expedienteData.Progreso}</p>
              </Container>

              <p className="h3">Apoyo Profesional Externo</p>
              <Container text>
                <p className="fs-5-alignment">{expedienteData.apoyo}</p>
              </Container>

              <p className="h3">Nota de Concetimiento</p>
              <Container text>
                <p>
                  Yo,{" "}
                  <span className="patient-name">[Nombre del Paciente]</span>,
                  doy mi consentimiento informado para participar en el
                  tratamiento psicológico proporcionado por{" "}
                  <span className="psychologist-name">
                    [Nombre del Psicólogo]
                  </span>{" "}
                  en{" "}
                  <span className="clinic-name">
                    [Nombre de la Clínica u Oficina]
                  </span>
                  , con dirección en{" "}
                  <span className="clinic-address">[Dirección]</span>, a partir
                  de la fecha{" "}
                  <span className="start-date">
                    [Fecha de Inicio del Tratamiento]
                  </span>
                  .
                </p>

                <p>Comprendo y acepto que:</p>

                <ul>
                  <li>
                    El propósito de este tratamiento es abordar{" "}
                    <span className="therapy-goals">
                      [breve descripción de los objetivos de la terapia]
                    </span>
                    .
                  </li>
                  <li>
                    <span className="psychologist-name">
                      [Nombre del Psicólogo]
                    </span>{" "}
                    ha explicado las técnicas y métodos que se utilizarán en la
                    terapia, incluyendo{" "}
                    <span className="therapy-techniques">
                      [mencionar técnicas específicas, si es relevante]
                    </span>
                    .
                  </li>
                  <li>
                    Reconozco que la terapia puede implicar discutir temas
                    emocionales o personales que pueden resultar incómodos en
                    ocasiones.
                  </li>
                  <li>
                    Se me ha informado sobre la importancia de la
                    confidencialidad en el proceso terapéutico, y entiendo que
                    la información compartida en sesión se mantendrá
                    confidencial, salvo en casos específicos que requieran una
                    excepción legal (como amenazas de daño a uno mismo o a
                    otros).
                  </li>
                  <li>
                    Mi participación en este tratamiento es voluntaria, y tengo
                    el derecho de retirarme en cualquier momento sin
                    consecuencias adversas.
                  </li>
                  <li>
                    He tenido la oportunidad de hacer preguntas y aclarar
                    cualquier inquietud que pueda tener sobre el tratamiento.
                  </li>
                </ul>

                <div className="signature-section">
                  <div className="patient-signature">
                    Firma del Paciente: ____________________________ Fecha:
                    ______________
                  </div>
                  <div className="psychologist-signature">
                    Firma del Psicólogo: ____________________________ Fecha:
                    ______________
                  </div>
                </div>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
      <div className="fixed-buttons-container">
      <button className="btn btn-primary fixed-download-button" onClick={downloadPDF}>
        Descargar PDF
      </button>

        <button className="btn btn-secondary fixed-clear-button" onClick={clearCasillas}>
          Limpiar Casillas
        </button>
      </div>
    </div>
  );
}

export default Vistas;
