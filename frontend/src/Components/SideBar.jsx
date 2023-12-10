import Nav from "react-bootstrap/Nav";

import "../Styles/CSS/SideBar.css";

function SideVar() {
  return (
    <Nav id="side_bar" className="flex-column">
      <Nav.Link id="side_bar_anuncios_link" href="/Anuncios" style={{ color: "black" }}>
        Anuncios
      </Nav.Link>
      <Nav.Link id="side_bar_secciones_link" href="/Secciones" style={{ color: "black" }}>
        Secciones
      </Nav.Link>
      <Nav.Link id="side_bar_calendario_link" href="/Calendario" style={{ color: "black" }}>
        Calendario
      </Nav.Link>
    </Nav>
  );
}

export default SideVar;
