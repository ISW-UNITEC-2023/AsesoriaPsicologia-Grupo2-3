
import React, { useState, useEffect } from 'react';
import "./zoomPat.css";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavigationB from "../Navbar";
import { gMeeting } from "../../Utilities/zoom-services";
import { getCookies } from "../../Utilities/login-services";


function MyZoomPat() {
    const [userPrivileges, setUserPrivileges] = useState({});

    const fetchUserData = async () => {
        const userData = await getCookies();
        if (userData && userData.user_data && userData.user_data.roles) {
            setUserPrivileges(userData.user_data.privileges);
        }
        setUserPrivileges(userData.user_data.privileges);
    };

    const havePrivilege = (privilege) => {
        if (userPrivileges && userPrivileges.length > 0) {
            return userPrivileges.includes(privilege);
        }
    }

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        gMeeting().then(meetingsData => {
            setMeetings(meetingsData.meetings || []);
        })
        fetchUserData();
    },
        []);

    return (
        <div className='zoom-container'>

            <NavigationB />
            <div className='zoom-div'>
                <Row className='zoom-row'>
                    <Col>
                        <h1 className="title-pacientes">Zoom</h1>
                        {havePrivilege(31) && <Form.Label className='titulo2'>Sesiones Programadas</Form.Label>}
                    </Col>
                    <Col></Col>
                    <Col>
                        {havePrivilege(32) && <Button className='buttons' variant="outline-primary" href="/ZoomC" onClick={() => { }} style={{ marginLeft: "235px" }}>Crear Sesion</Button>}
                    </Col>
                </Row>

                {havePrivilege(31) &&
                    <div >
                        <Container fluid="md" className="zoomscroll-content">
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
                                    <Form.Label className='form'>{new Date(meeting.start_time).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</Form.Label>
                                    <Col className='column'>
                                        <Form.Label>{new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Form.Label>
                                    </Col>
                                    <Col className='column'>
                                        <Form.Label>{meeting.topic}</Form.Label>
                                    </Col>
                                    <Col className='column'>
                                        <Form.Label>{meeting.id}</Form.Label>
                                    </Col>
                                    <Col className='column2'>
                                        { havePrivilege(31) &&
                                            <Button className='buttons2' variant="outline-primary" href={meeting.join_url} target="_blank">
                                                Entrar
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            ))}
                        </Container>
                    </div>
                }
            </div>
        </div>
    );
}

export default MyZoomPat;
