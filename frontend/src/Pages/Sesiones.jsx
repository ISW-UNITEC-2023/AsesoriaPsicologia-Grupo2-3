import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavigationB from "../Components/Navbar";
import "../Styles/CSS/Vistas.css";

function Sesiones() {
  const [sessions, setSessions] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const handleCreateSession = () => {
    // Find the maximum session number
    const maxSessionNumber = Math.max(...sessions);
    
    // Generate a new session number by adding 1 to the maximum session number
    const newSession = maxSessionNumber + 1;
  
    setSessions([...sessions, newSession]);
  };

  const handleDeleteSession = (sessionNumber) => {
    const updatedSessions = sessions.filter(session => session !== sessionNumber);
    setSessions(updatedSessions);
  };

  return (
      <Container className="list-container">
        <NavigationB />
        <Row>
          <Col>
            <Card className="card">
              <Card.Header as="h5" className="card-header">
                Información de la Tarjeta
              </Card.Header>
              <Card.Body>
                <Card.Title className="card-title">Autor: Alex Pereira</Card.Title>
                <Card.Text className="card-text">
                  Fecha: 11 de noviembre de 2023
                  <br />
                  Hora: 10:30 AM
                </Card.Text>
                <Link to="/Expedientes" className="card-link">
                  Ir a la sesión
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Sesiones;
