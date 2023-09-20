import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from 'react';

function MyNavbar() {

    return (
        <div style={{minHeight: '125vh' , backgroundColor: 'transparent'}}>
            {/* Navbar */}
            <nav style={{ flex: '0 0 150px', backgroundColor: '#f5f5f5', minHeight: '100%', textAlign: 'center' }}>
            <Navbar.Brand href="#" style={{ paddingLeft: '20px', fontWeight: 'bold', fontSize: '24px', 
            marginTop: '30px' }}>
            UNITEC
            </Navbar.Brand>

                <Nav className="flex-column">
                    <Nav.Link href="/dashboard" style={{ fontWeight: 'bold' }}>
                        <i class="bi bi-house-door-fill" style={{marginRight: '10px', fontSize:'27px'}}></i>
                    <div></div>  Inicio
                    </Nav.Link>

                    <Nav.Link href="/anuncios" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-megaphone-fill" style={{marginRight: '10px', fontSize:'27px'}}></i>
                    <div></div>  Anuncios
                    </Nav.Link>

                    <Nav.Link href="/clases" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-book-fill" style={{marginRight: '10px', fontSize:'27px'}}></i>
                    <div></div>  Clases
                    </Nav.Link>

                    <Nav.Link href="/calendar" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-calendar-event-fill" style={{marginRight: '10px', fontSize:'27px'}}></i>
                    <div></div> Calendario
                    </Nav.Link>  {/*modulos son las clases y se muestran en tarjetitas*/ }

                    <Nav.Link href="/cuentas" style={{ fontWeight: 'bold' }}>
                        <i class="bi bi-person-fill" style={{marginRight: '10px', fontSize:'27px'}}></i>
                        <div></div> Cuentas
                    </Nav.Link>

                    <Nav.Link href="/historial" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-clock-fill" style={{marginRight: '10px', fontSize:'27px'}}></i>
                    <div></div>  Historial
                    </Nav.Link>
                </Nav>
                <Form className="d-flex mt-3">
                    {/*<Button variant="outline-success">Search</Button>*/}
                </Form>
            </nav>

            {/* Contenido de la página */}

        </div>
    );


    };
export default MyNavbar;