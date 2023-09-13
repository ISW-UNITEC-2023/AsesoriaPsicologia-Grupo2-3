import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"; // Importar Link
import Popup from "../SectionPopUp/PopUp";
import { MDBBadge } from "mdb-react-ui-kit";
import "./Card.css";

function MyCard(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [selectedButtonInfo, setSelectedButtonInfo] = useState({
    CourseName: "",
    SectionId: "",
    CourseId: "",
    TeacherId: "",
  });

  const togglePopup = (CourseName, CourseId) => {
    setSelectedButtonInfo({ CourseName, CourseId });
    setPopupOpen(!isPopupOpen);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://img.freepik.com/free-vector/flat-back-school-background-with-school-supplies_23-2149452368.jpg"
        alt="School Supplies"
      />

      <Card.Body>
        <Card.Title>
          {/* Usar Link para redireccionar a /sections/ con CourseId */}
          <Link to={`/sections/${props.id}`}>{props.name}</Link>
        </Card.Title>

        <Card.Text>
          <strong>Id:</strong> {props.id}
          <br />
          <strong>Description:</strong> {props.description}
          <br />
        </Card.Text>

        <div>
          <div className="tab-container">
            <Button className="tab-button">Notifications</Button>
            <MDBBadge color="danger" pill className="badge">
              99+
              <span className="visually-hidden">unread messages</span>
            </MDBBadge>
          </div>
          <div className="tab-container">
            <Button
              className="tab-button"
              onClick={() => togglePopup(props.name, props.id)}
            >
              +
            </Button>
            <Popup
              isOpen={isPopupOpen}
              onClose={() => togglePopup("", "")}
              selectedButtonInfo={selectedButtonInfo}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
