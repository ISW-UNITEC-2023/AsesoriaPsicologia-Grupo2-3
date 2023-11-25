
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
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';


function MyZoomPat() {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {gMeeting().then(meetingsData => {  setMeetings(meetingsData.meetings || []); 
    })}, 
    []);

    return (
    <div className='dashboard-container'>

        <NavigationB/>
        <div style={{marginRight:"10px", marginLeft: "10px", width: "90%" }}>
        <Row style={{ marginBottom:"2%",alignItems:"center"}}>
        <Col>
            <h1 className="title-pacientes"  style={{marginBottom:"-2%",marginLeft:"36%"}} >Zoom</h1>
            <Form.Label className='titulo'style={{marginLeft:"40%"}}>Sesiones Programadas</Form.Label>
            </Col>
            <Col></Col>
            <Col>
            <Button className='buttons' variant="outline-primary"  href="/ZoomC" onClick={()=>{}} style={{marginLeft:"90px"}}>Crear Sesion</Button>
            </Col>
            </Row>

            <div>
            <Container className='zoomscroll-content'>
                <Row>
                    <div></div>
                <Col>
                    <Form.Label className='titulo'>Hora de Inicio</Form.Label>
                </Col>
                <Col>
                    <Form.Label className='titulo'>Tema</Form.Label>
                </Col>
                <Col>
                    <Form.Label className='titulo'>ID de la reunión</Form.Label>
                </Col>
                <Col>
                </Col>
                </Row>
                {meetings.map(meeting => (
                <Row key={meeting.id}>
                    <Col className='column'>
                </Col>
                    <Form.Label style={{marginLeft:"8px", marginBottom:"-2px"}}>{new Date(meeting.start_time).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</Form.Label>
                    <Col className='column'>
                    <Form.Label>{new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Form.Label>
                    </Col>
                    <Col className='column'>
                    <Form.Label>{meeting.topic}</Form.Label>
                    </Col>
                    <Col className='column'>
                    <Form.Label>{meeting.id}</Form.Label>
                    </Col>
                    <Col  style={{display:"flex", alignItems:"center", paddingBottom:"10px"}}>
                    <Button className='buttons' variant="outline-primary"  href={meeting.join_url} target="_blank">
                    Entrar
                </Button>
                    </Col>
                </Row>
                ))}
            </Container>
            </div>
        </div>
    </div>
    );
}

export default MyZoomPat;
