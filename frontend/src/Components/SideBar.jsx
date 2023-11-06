import Nav from "react-bootstrap/Nav";

import "../Styles/CSS/SideBar.css";

function SideVar() {
  return (
    <Nav className="flex-column">
      <Nav.Link href="/Anuncios" style={{ color: "black" }}>
        Anuncios
      </Nav.Link>
      <Nav.Link href="/Secciones" style={{ color: "black" }}>
        Secciones
      </Nav.Link>
      <Nav.Link href="/Calendario" style={{ color: "black" }}>
        Calendario
      </Nav.Link>
    </Nav>
  );
}

export default SideVar;
