import Container from "react-bootstrap/Container";
import SideVar from "../Components/SideBar.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";

import {GetSections} from "../Utilities/section-services";

import SectionCard from "../Components/Card";

function DashBoard() {
  const [displayedSections, setSections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setSections(await GetSections());
    }
    fetchData();
  }, []);

  return (
    <Container>
      <div style={{}}>
        <h1>TABLERO</h1>
        <Row>
          {displayedSections.map((section, index) => (
            <Col lg>
              <br></br>
              <SectionCard {...section} />
              <br></br>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default DashBoard;
