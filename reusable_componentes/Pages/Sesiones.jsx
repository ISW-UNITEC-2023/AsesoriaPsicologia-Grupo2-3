import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationB from "../../frontend/src/Components/Navbar";
import "../Styles/CSS/Vistas.css";

function Sesiones() {
  return (
    <>
      <Container className="card-container">
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
    </>
  );
}

export default Sesiones;
