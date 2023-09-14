import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/tempprofile.png";
import logoUnitec from '../Styles/Images/unitec-logo.png'

function Vistas() {
  return (
    <div className="page-container">
      <Container>
        <Row>
          <Col md={3}>
            <img
              src={tempImage} /* Agrega la ruta de la imagen aquí */
              alt=""
              className="profile-image"
            />
          </Col>
          <Col md={5}>
            <p className="profile-text">Fernando David Sosa Flores</p>
          </Col>
          <Col
            md={4}
            style={{
              display: 'flex',
              right: "0",
              top: "0",
              marginTop: '4vh'
            }}
          >
            <img
              src={logoUnitec} /* Agrega la ruta de la imagen aquí */
              alt=""
              className="unitec-image"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="text-center">Expediente</h1>

            <p className="h3">Datos personales</p>

            <div className="text-container">
              <p className="fs-5 with-underline">Nombre: </p>
              <p className="fs-5-alignment">Fernando David Sosa Flores</p>
            </div>

            <div className="text-container">
              <p className="fs-5 with-underline">Fecha de nacimiento: </p>
              <p className="fs-5-alignment">12/09/03</p>
            </div>

            <div className="text-container">
              <p className="fs-5 with-underline">Direccion: </p>
              <p className="fs-5-alignment">San Carlos de Sula</p>
            </div>

            <div className="text-container">
              <p className="fs-5 with-underline">Correo Electronico: </p>
              <p className="fs-5-alignment">fernandososa03@untiec.edu</p>
            </div>

            <div className="text-container">
              <p className="fs-5 with-underline">Estado Civil: </p>
              <p className="fs-5-alignment">Soltero</p>
            </div>

            <p className="h3">Historial Clinico</p>

            <div className="text-container">
              <p className="fs-5 with-underline">
                Modula de Participacion Inicial:{" "}
              </p>
              <p className="fs-5-alignment">Depresion</p>
            </div>

            <Container text>
              <p className="fs-5 with-underline">Antecedentes Medicos: </p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>

            <Container text>
              <p className="fs-5 with-underline">Uso de medicamentos: </p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>

            <p className="h3">Evaluacion Inicial</p>
            <Container text>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>

            <p className="h3">Objetivos y plan de tratamiento</p>
            <Container text>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>

            <p className="h3">Notas de Sesion</p>
            <Container text>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>

            <p className="h3">Progreso del Paciente</p>
            <Container text>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>

            <p className="h3">Apoyo Profesional Externo</p>
            <Container text>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa strong. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              </p>
            </Container>
            <h4 className="text-center">Nota de concentimiento</h4>
            <Container text>
              <p>
                Yo, <span className="patient-name">[Nombre del Paciente]</span>,
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
                <span className="clinic-address">[Dirección]</span>, a partir de
                la fecha{" "}
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
                  Se me ha informado sobre la importancia de la confidencialidad
                  en el proceso terapéutico, y entiendo que la información
                  compartida en sesión se mantendrá confidencial, salvo en casos
                  específicos que requieran una excepción legal (como amenazas
                  de daño a uno mismo o a otros).
                </li>
                <li>
                  Mi participación en este tratamiento es voluntaria, y tengo el
                  derecho de retirarme en cualquier momento sin consecuencias
                  adversas.
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Vistas;
