// // MyZoomPat.jsx
import React, { useState, useEffect } from 'react';
import "./zoomPat.css";
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavigationB from "../Navbar";
import {gMeeting} from "../../Utilities/zoom-services";


function MyZoomPat() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Llamada a la función gMeeting al cargar el componente
    gMeeting()
      .then(meetingsData => {
        console.log("Datos de las reuniones:", meetingsData);
        setMeetings(meetingsData.meetings || []);
      })
      .catch(error => {
        console.error("Error al obtener reuniones:", error);
      });
  }, []);

  return (
    <div className='dashboard-container'>

        <NavigationB/>
        <div style={{ margin: "30px", width: "80%" }}>
        
        <div>
            <h1 className="title-pacientes">Zoom</h1>
        </div>
        <Tabs
            defaultActiveKey="sesiones"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            style={{marginLeft:"3%"}}
        >
            <Tab eventKey="sesiones" title="Sesiones Programadas">
            <Container fluid="md" style={{marginLeft:"7%"}}>
                <Row>
                <Col>
                    <Form.Label>Hora de Inicio</Form.Label>
                </Col>
                <Col>
                    <Form.Label>Tema</Form.Label>
                </Col>
                <Col>
                    <Form.Label>ID de la reunión</Form.Label>
                </Col>
                <Col>
                </Col>
                </Row>
                {/* Mostrar detalles de todas las reuniones */}
                {meetings.map(meeting => (
                <Row key={meeting.id}>
                    <Col style={{display:"flex", alignItems:"center", borderBottom: "1px solid rgb(190 179 179)"}}>
                    <Form.Label>{new Date(meeting.start_time).toLocaleTimeString()}</Form.Label>
                    </Col>
                    <Col style={{display:"flex", alignItems:"center", borderBottom: "1px solid rgb(190 179 179)"}}>
                    <Form.Label>{meeting.topic}</Form.Label>
                    </Col>
                    <Col style={{display:"flex", alignItems:"center", borderBottom: "1px solid rgb(190 179 179)"}}>
                    <Form.Label>{meeting.id}</Form.Label>
                    </Col>
                    <Col  style={{display:"flex", alignItems:"center", borderBottom: "1px solid rgb(190 179 179)", paddingBottom:"10px"}}>
                    <Button style={{ width: "70px" , margin: "5px" }} variant="outline-primary"  href={meeting.join_url} target="_blank">
                    Entrar
                </Button>
                    </Col>
                </Row>
                ))}
            </Container>
            </Tab>
            <Tab eventKey="profile" title="Sesiones Pasadas">
            <Container fluid="md">
                ... Cargando Sesiones Pasadas
            </Container>
            </Tab>
        </Tabs>
        </div>
    </div>
  );
}

export default MyZoomPat;
