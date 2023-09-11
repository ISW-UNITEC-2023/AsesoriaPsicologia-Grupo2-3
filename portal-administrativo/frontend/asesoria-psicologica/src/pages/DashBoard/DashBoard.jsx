import Container from "react-bootstrap/Container";
import SideVar from "../../components/SideBar/SideBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DashBoard.css";
import { useEffect, useState } from "react";

import {GetSections} from "../../Services/sections";

import SectionCard from "../../components/Card/Card";

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
          {displayedSections.map((section) => (
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
