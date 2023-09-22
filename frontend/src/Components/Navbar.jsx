
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {

    return (
        <div style={{minHeight: '125vh' , backgroundColor: 'transparent'}}>
            {/* Navbar */}
            <nav style={{ flex: '0 0 150px', backgroundColor: '#f5f5f5', minHeight: '100%', textAlign: 'left' }}>
            <Navbar.Brand href="#" style={{ paddingLeft: '20px', fontWeight: 'bold', fontSize: '24px', 
            marginTop: '30px' }}>
            UNITEC
            </Navbar.Brand>

                <Nav className="flex-column">
                    <Nav.Link href="/Dashboard" style={{ fontWeight: 'bold' }}>
                        <i className="bi bi-house-door-fill" style={{marginRight: '10px'}}></i>
                        Inicio
                    </Nav.Link>

                    <Nav.Link href="/Anuncios" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-megaphone-fill" style={{marginRight: '10px'}}></i>
                        Anuncios
                    </Nav.Link>

                    <Nav.Link href="/Modulos" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-journals" style={{marginRight: '10px'}}></i>
                        Modulos
                    </Nav.Link>  {/*modulos son las clases y se muestran en tarjetitas*/ }
                    
                    <Nav.Link href="/Secciones" style={{ fontWeight: 'bold' }}>
                        <i className="bi bi-house-door-fill" style={{marginRight: '10px'}}></i>
                        Secciones
                    </Nav.Link>

                    <Nav.Link href="/Pacientes" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-calendar-event-fill" style={{marginRight: '10px'}}></i>
                        Pacientes
                    </Nav.Link>
                </Nav>
                <Form className="d-flex mt-3">
                    {/*<Button variant="outline-success">Search</Button>*/}
                </Form>
            </nav>
    
            {/* Contenido de la página */}
          
        </div>
    );
    }
export default MyNavbar;
