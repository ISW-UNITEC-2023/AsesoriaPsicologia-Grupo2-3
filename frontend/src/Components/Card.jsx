import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"; // Importar Link
import Popup from "./PopUp.jsx";
import { MDBBadge } from "mdb-react-ui-kit";

function MyCard(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [selectedButtonInfo, setSelectedButtonInfo] = useState({
    CourseName: "",
    SectionId: "",
    CourseId: "",
    TeacherId: "",
  });

  const togglePopup = (CourseName, SectionId, CourseId) => {
    setSelectedButtonInfo({ CourseName, SectionId, CourseId });
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
        <button
          onClick={() =>
            togglePopup(props.CourseName, props.SectionId, props.CourseId)
          }
        >
          +
        </button>

        <Popup
          isOpen={isPopupOpen}
          onClose={() => togglePopup("", "", "")}
          selectedButtonInfo={selectedButtonInfo}
        />

        <Card.Title>
          {/* Usar Link para redireccionar a /sections/ con CourseId */}
          <Link to={`/Secciones/${props.CourseId}`}>{props.CourseName}</Link>
        </Card.Title>

        <Card.Text>
          <strong>SECCION:</strong> {props.SectionId}
          <br />
          <strong>Docente:</strong> {props.Teacher}
          <br />
        </Card.Text>

        <div>
          <Button className="position-relative">Notifications</Button>
          <MDBBadge
            color="danger"
            pill
            className="position-absolute translate-middle"
          >
            99+
            <span className="visually-hidden">unread messages</span>
          </MDBBadge>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
