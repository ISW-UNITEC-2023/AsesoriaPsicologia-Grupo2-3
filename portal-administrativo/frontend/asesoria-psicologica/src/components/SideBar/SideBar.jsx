import React from "react";
import Nav from "react-bootstrap/Nav";

import "./SideBar.css";

function SideVar() {
  return (
    <Nav className="flex-column">
      <Nav.Link href="/anuncios" style={{ color: "black" }}>
        Anuncios
      </Nav.Link>
      <Nav.Link href="/secciones" style={{ color: "black" }}>
        Secciones
      </Nav.Link>
      <Nav.Link href="/calendario" style={{ color: "black" }}>
        Calendario
      </Nav.Link>
    </Nav>
  );
}

export default SideVar;
