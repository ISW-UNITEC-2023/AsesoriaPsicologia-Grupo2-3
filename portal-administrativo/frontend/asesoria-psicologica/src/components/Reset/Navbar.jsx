
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import React from 'react';

function MyNavbar() {

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Navbar */}
            <nav style={{ flex: '0 0 150px', backgroundColor: '#f5f5f5', minHeight: '100%', textAlign: 'left' }}>
            <Navbar.Brand href="#" style={{ paddingLeft: '20px', fontWeight: 'bold', fontSize: '24px', 
            marginTop: '30px' }}>
            UNITEC
            </Navbar.Brand>

                <Nav className="flex-column">
                    <Nav.Link href="/inicio" style={{ fontWeight: 'bold' }}>
                        <i class="bi bi-house-door-fill" style={{marginRight: '10px'}}></i>
                        Inicio
                    </Nav.Link>

                    <Nav.Link href="/anuncios" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-megaphone-fill" style={{marginRight: '10px'}}></i>
                        Anuncios 
                    </Nav.Link>

                    <Nav.Link href="/modulos" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-journals" style={{marginRight: '10px'}}></i>
                        Modulos
                    </Nav.Link>  {/*modulos son las clases y se muestran en tarjetitas*/ }
                    
                    <Nav.Link href="/calendario" style={{ fontWeight: 'bold' }}>
                        <i class="bi bi-house-door-fill" style={{marginRight: '10px'}}></i>
                        Calendario
                    </Nav.Link>

                    <Nav.Link href="/zoom" style={{ fontWeight: 'bold' }}>
                    <i class="bi bi-calendar-event-fill" style={{marginRight: '10px'}}></i>
                        Zoom
                    </Nav.Link>
                </Nav>
                <Form className="d-flex mt-3">
                    {/*<Button variant="outline-success">Search</Button>*/}
                </Form>
            </nav>
    
            {/* Contenido de la página */}
            <main style={{ flex: '1', backgroundColor: 'white', padding: '15px', overflowY: 'auto' }}>
                {/* Aquí va el contenido principal de tu página */}
                {/* Asegúrate de que el contenido llene este espacio */}
            </main>
        </div>
    );
    
    
    };

export default MyNavbar;
