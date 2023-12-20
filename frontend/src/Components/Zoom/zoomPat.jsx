import React, { useEffect, useRef, useState } from "react";
import "./zoomPat.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NavigationB from "../Navbar";
import { gMeeting } from "../../Utilities/zoom-services";
import { Link, useNavigate } from "react-router-dom";

function MyZoomPat(props) {
  //Privilegios del usuario logueado

  function havePrivilege(privilege) {
    // console.log("Esto es lo que voy a comparar", props.verifyRef);
    if (privilege) {
      return props.verifyRef.current.privileges.includes(privilege);
    } else {
      return false;
    }
  }

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      <NavigationB key='navB' userData={props.userData} />
      <div className='zoom-div'>
        <Row className='zoom-row'>
          <Col>
            <h1 className='title-pacientes'>Zoom</h1>
            {havePrivilege(31) ? (
              <Form.Label className='titulo2'>Sesiones Programadas</Form.Label>
            ) : (
              <Form.Label className='titulo2'>
                No tienes los permisos necesarios para ver las sesiones
                programadas.
              </Form.Label>
            )}
          </Col>
          <Col></Col>
          <Col>
            {havePrivilege(32) && (
              <Link to='/ZoomC'>
                <Button
                  className='buttons'
                  variant='outline-primary'
                  onClick={() => {}}
                  style={{ marginLeft: "235px" }}
                >
                  Crear Sesion
                </Button>
              </Link>
            )}
          </Col>
        </Row>

        {havePrivilege(31) && (
          <div>
            <Container fluid='md' className='zoomscroll-content'>
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
                <Col></Col>
              </Row>

              {!meetings?.status ? (
                meetings.map((meeting) => (
                  <Row key={meeting.id}>
                    <Col className='column'></Col>
                    <Form.Label className='form'>
                      {new Date(meeting.start_time).toLocaleDateString(
                        "es-ES",
                        {
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Form.Label>
                    <Col className='column'>
                      <Form.Label>
                        {new Date(meeting.start_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Form.Label>
                    </Col>
                    <Col className='column'>
                      <Form.Label>{meeting.topic}</Form.Label>
                    </Col>
                    <Col className='column'>
                      <Form.Label>{meeting.id}</Form.Label>
                    </Col>
                    <Col className='column2'>
                      {havePrivilege(31) && (
                        <Button
                          className='buttons2'
                          variant='outline-primary'
                          href={meeting.join_url}
                          target='_blank'
                        >
                          Entrar
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))
              ) : (
                <Form.Label
                  className='titulo2'
                  style={{ paddingTop: "30px" }}
                >{`Error al obtener las sesiones. Código de error: ${meetings.status}`}</Form.Label>
              )}
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyZoomPat;
