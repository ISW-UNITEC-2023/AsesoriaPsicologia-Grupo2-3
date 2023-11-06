import { Container, Row, Col } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/tempprofile.png";
import logoUnitec from "../Styles/Images/unitec-logo.png";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

function VistasPDF() {
  return (
    <Document>
      <Page size="A4">
    <View className="page-container">
      <Container>
        <Row>
          <Col md={3}>
            <Image
              src={tempImage} /* Agrega la ruta de la imagen aquí */
              alt="Perfil del paciente"
              className="profile-image"
            />
          </Col>
          <Col md={5}>
            <Text className="profile-text">Fernando David Sosa Flores</Text>
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
            <Image
              src={logoUnitec} /* Agrega la ruta de la imagen aquí */
              alt="Logo Unitex"
              className="unitec-image"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Text className="text-center">Expediente</Text>

            <Text className="h3">Datos personales</Text>

            <View className="text-container">
              <Text className="fs-5 with-underline">Nombre: </Text>
              <Text className="fs-5-alignment">Fernando David Sosa Flores</Text>
            </View>

            <View className="text-container">
              <Text className="fs-5 with-underline">Fecha de nacimiento: </Text>
              <Text className="fs-5-alignment">12/09/03</Text>
            </View>

            <View className="text-container">
              <Text className="fs-5 with-underline">Direccion: </Text>
              <Text className="fs-5-alignment">San Carlos de Sula</Text>
            </View>

            <View className="text-container">
              <Text className="fs-5 with-underline">Correo Electronico: </Text>
              <Text className="fs-5-alignment">fernandososa03@untiec.edu</Text>
            </View>

            <View className="text-container">
              <Text className="fs-5 with-underline">Estado Civil: </Text>
              <Text className="fs-5-alignment">Soltero</Text>
            </View>

            <Text className="h3">Historial Clinico</Text>

            <View className="text-container">
              <Text className="fs-5 with-underline">
                Modula de Participacion Inicial:{" "}
              </Text>
              <Text className="fs-5-alignment">Depresion</Text>
            </View>

            <Container text>
              <Text className="fs-5 with-underline">Antecedentes Medicos: </Text>
              <Text>
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
              </Text>
            </Container>

            <Container text>
              <Text className="fs-5 with-underline">Uso de medicamentos: </Text>
              <Text>
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
              </Text>
            </Container>

            <Text className="h3">Evaluacion Inicial</Text>
            <Container text>
              <Text>
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
              </Text>
            </Container>

            <Text className="h3">Objetivos y plan de tratamiento</Text>
            <Container text>
              <Text>
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
              </Text>
            </Container>

            <Text className="h3">Notas de Sesion</Text>
            <Container text>
              <Text>
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
              </Text>
            </Container>

            <Text className="h3">Progreso del Paciente</Text>
            <Container text>
              <Text>
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
              </Text>
            </Container>

            <Text className="h3">Apoyo Profesional Externo</Text>
            <Container text>
              <Text>
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
              </Text>
            </Container>
            <Text className="text-center">Nota de concentimiento</Text>
            <Container text>
              <Text>
                Yo, <Text className="patient-name">[Nombre del Paciente]</Text>,
                doy mi consentimiento informado para participar en el
                tratamiento psicológico proporcionado por{" "}
                <Text className="psychologist-name">
                  [Nombre del Psicólogo]
                </Text>{" "}
                en{" "}
                <Text className="clinic-name">
                  [Nombre de la Clínica u Oficina]
                </Text>
                , con dirección en{" "}
                <Text className="clinic-address">[Dirección]</Text>, a partir de
                la fecha{" "}
                <Text className="start-date">
                  [Fecha de Inicio del Tratamiento]
                </Text>
                .
              </Text>

              <Text>Comprendo y acepto que:</Text>

<View>
  <Text>
    El propósito de este tratamiento es abordar{" "}
    <Text className="therapy-goals">
      [breve descripción de los objetivos de la terapia]
    </Text>
    .
  </Text>
  <Text>
    <Text className="psychologist-name">
      [Nombre del Psicólogo]
    </Text>{" "}
    ha explicado las técnicas y métodos que se utilizarán en la terapia, incluyendo{" "}
    <Text className="therapy-techniques">
      [mencionar técnicas específicas, si es relevante]
    </Text>
    .
  </Text>
  <Text>
    Reconozco que la terapia puede implicar discutir temas emocionales o personales que pueden resultar incómodos en ocasiones.
  </Text>
  <Text>
    Se me ha informado sobre la importancia de la confidencialidad en el proceso terapéutico, y entiendo que la información compartida en sesión se mantendrá confidencial, salvo en casos específicos que requieran una excepción legal (como amenazas de daño a uno mismo o a otros).
  </Text>
  <Text>
    Mi participación en este tratamiento es voluntaria, y tengo el derecho de retirarme en cualquier momento sin consecuencias adversas.
  </Text>
  <Text>
    He tenido la oportunidad de hacer preguntas y aclarar cualquier inquietud que pueda tener sobre el tratamiento.
  </Text>
</View>

              <View className="signature-section">
                <View className="patient-signature">
                  Firma del Paciente: ____________________________ Fecha:
                  ______________
                </View>
                <View className="psychologist-signature">
                  Firma del Psicólogo: ____________________________ Fecha:
                  ______________
                </View>
              </View>
            </Container>
          </Col>
        </Row>
      </Container>
    </View>
    </Page>
    </Document>
  );
}

export default VistasPDF;