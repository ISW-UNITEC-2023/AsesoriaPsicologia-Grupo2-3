import React, {useEffect, useRef, useState} from 'react';
import "./zoomPat.css";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavigationB from "../Navbar";
import {gMeeting} from "../../Utilities/zoom-services";
import {useNavigate} from "react-router-dom";
import {getVerify} from "../../Utilities/user-services";

function havePrivilege(userPrivilege, privilege) {
    const isAuthorized = userPrivilege && userPrivilege.privileges && privilege.some((privilege) =>
        userPrivilege.privileges.includes(privilege)
    );
    return isAuthorized;
}

function MyZoomPat(props) {
    if (!props.userData.user_data) {
        const navigate = useNavigate();
        navigate("/InicioSesion");
        return null;
    }
    //Privilegios del usuario logueado
    
    const verifyRef = useRef(null);
    const updatePrivileges = async () => {
        try {
            const data = await getVerify(props.userData.user_data.id_user);
            verifyRef.current = data;
        } catch (error) {
            console.error("Error updating privileges:", error);
        }
    };

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await updatePrivileges();
                const meetingsData = await gMeeting();
                setMeetings(meetingsData.meetings || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='zoom-container'>

            <NavigationB key="navB" userData={props.userData}/>
            <div className='zoom-div'>
                <Row className='zoom-row'>
                    <Col>
                        <h1 className="title-pacientes">Zoom</h1>
                        {
                            havePrivilege(verifyRef.current, [31]) ?
                                <Form.Label className='titulo2'>Sesiones Programadas</Form.Label>
                                :
                                <Form.Label className='titulo2'>No tienes los permisos necesarios para ver las sesiones
                                    programadas.</Form.Label>
                        }
                    </Col>
                    <Col></Col>
                    <Col>
                        {havePrivilege(verifyRef.current, [32]) &&
                            <Button className='buttons' variant="outline-primary" href="/ZoomC" onClick={() => {
                            }} style={{marginLeft: "235px"}}>Crear Sesion</Button>}
                    </Col>
                </Row>

                {havePrivilege(verifyRef.current, [31]) &&
                    <div>
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
                                    <Form.Label
                                        className='form'>{new Date(meeting.start_time).toLocaleDateString('es-ES', {
                                        month: 'long',
                                        day: 'numeric'
                                    })}</Form.Label>
                                    <Col className='column'>
                                        <Form.Label>{new Date(meeting.start_time).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}</Form.Label>
                                    </Col>
                                    <Col className='column'>
                                        <Form.Label>{meeting.topic}</Form.Label>
                                    </Col>
                                    <Col className='column'>
                                        <Form.Label>{meeting.id}</Form.Label>
                                    </Col>
                                    <Col className='column2'>
                                        {havePrivilege(verifyRef.current, [31]) &&
                                            <Button className='buttons2' variant="outline-primary"
                                                    href={meeting.join_url} target="_blank">
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
