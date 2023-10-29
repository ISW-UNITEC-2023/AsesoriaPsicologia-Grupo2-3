import React, { useState, useEffect } from "react";
import {
  getInfoSection,
  updateTeacher,
  updateQuarter,
  updateYear,
} from "../Utilities/section-services";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
} from "react-bootstrap";
import EliminarConfirmarPopUp from "../Components/SectionPopUp/Eliminar/ConfirmarPopUp";
import EliminarSuccessPopUp from "../Components/SectionPopUp/Eliminar/SucessPopUp";
import ModificarConfirmPopUp from "../Components/SectionPopUp/Modificar/ConfirmarPopUp";
import ModificarSuccessPopUp from "../Components/SectionPopUp/Modificar/successPopUp";
import ModificarPopUp from "../Components/SectionPopUp/Modificar/ModificarPopUp";
import CrearSeccion from "../Components/SectionPopUp.jsx";

import "../Styles/CSS/Sections.css";
import NavBar from "../Components/Navbar";
function SectionsPage() {
  const [courseList, setCourseList] = useState([]);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    async function fetchCourseInfo() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        let parametro = urlParams.get("course_id");
        parametro = parseInt(parametro);
        console.log(parametro);
        const response = await getInfoSection(parametro);
        console.log(response);
        setCourseList(response);
      } catch (error) {
        console.error("Error fetching course info:", error);
      }
    }
    fetchCourseInfo();
  }, [courseId]);

  const [isCreateButtonPopupOpen, setCreateButtonPopupOpen] = useState(false);
  const [isModifyConfirmPopupOpen, setModifyConfirmPopupOpen] = useState(false);
  const [isModifySuccessPopupOpen, setModifySuccessPopupOpen] = useState(false);
  const [isModify, setModify] = useState(false);
  const [modifySectionId, setModifySectionId] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedQuarterOption, setSelectedQuarterOption] = useState("");
  const [selectedTeacherOption, setSelectedTeacherOption] = useState("");
  const [selectYearOption, setSelectedYearOption] = useState("");

  const [isModifyConfirmed, setIsModifyConfirmed] = useState(false);

  const updateCourseInfo = async () => {
    try {
      const response = await getInfoSection(courseId);
      setCourseList(response);
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
  };

  const toggleCreateButtonPopupOpen = () => {
    setCreateButtonPopupOpen(!isCreateButtonPopupOpen);
  };

  const toggleModifySuccessPopup = () => {
    setModifySuccessPopupOpen(!isModifySuccessPopupOpen);
  };

  const toggleModify = (sectionId) => {
    setModifySectionId(sectionId);
    setModify(!isModify);
  };

  const toggleModifyConfirmPopup = (
    sectionId,
    option,
    quarterOption,
    teacherOption,
    yearOption
  ) => {
    setModifySectionId(sectionId);
    setSelectedOption(option);
    setSelectedQuarterOption(quarterOption);
    setSelectedTeacherOption(teacherOption);
    setSelectedYearOption(yearOption);
    setModifyConfirmPopupOpen(!isModifyConfirmPopupOpen);
  };

  const [isDeleteConfirmPopupOpen, setDeleteConfirmPopupOpen] = useState(false);
  const [isDeleteSuccessPopupOpen, setDeleteSuccessPopupOpen] = useState(false);
  const [deleteSectionId, setDeleteSectionId] = useState(null);

  const toggleDeleteSuccessPopup = () => {
    setDeleteSuccessPopupOpen(!isDeleteSuccessPopupOpen);
  };

  const toggleDeleteConfirmPopup = (sectionId) => {
    setDeleteSectionId(sectionId);
    setDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
  };

  const handleConfirm = async () => {
    try {
      if (selectedOption === "teacher_id") {
        await updateTeacher(modifySectionId, selectedTeacherOption);
      } else if (selectedOption === "year") {
        await updateYear(modifySectionId, selectYearOption);
      } else if (selectedOption === "quarter") {
        await updateQuarter(modifySectionId, selectedQuarterOption);
      }
      setIsModifyConfirmed(true); // Indica que se ha confirmado la modificación
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="sections">
      <div className="Navbar">
        <NavBar />
      </div>

      <div className="section-container">
        <Row>
          <h1 className="title-modulo">Secciones</h1>

          {courseList.length > 0 ? (
            courseList.map((course) => {
              const currentSectionId = course.SectionId;
              const Year = course.Year;
              return (
                <Col key={course.courseId} md={6} lg={3} className="mb-4">
                  <Card>
                    <CardHeader>ID Sección: {currentSectionId} </CardHeader>
                    <Card.Body>
                      <Card.Title>{course.CourseName}</Card.Title>
                      <Card.Text>
                        <br />
                        <strong>Código de Clase: </strong>
                        {courseId} <br />
                        <strong>Id sección: </strong>
                        {currentSectionId} <br />
                        <strong>UV: </strong>
                        {course.UV} <br />
                        <strong>Año: </strong>
                        {Year} <br />
                        <strong>Trimestre: </strong>
                        {course.Quarter} <br />
                        <strong>Docente: </strong>
                        {course.Teacher} <br />
                      </Card.Text>
                    </Card.Body>
                    <CardFooter
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <br />
                      <br />
                      <Button
                        variant="success"
                        onClick={() => toggleModify(currentSectionId)}
                        style={{
                          backgroundColor: "#157347",
                          marginRight: "15px",
                        }}
                      >
                        Modificar
                      </Button>

                      <Button
                        variant="danger"
                        style={{
                          backgroundColor: "#bb2d3b",
                          marginRight: "15px",
                        }}
                        onClick={() =>
                          toggleDeleteConfirmPopup(currentSectionId)
                        }
                      >
                        Eliminar
                      </Button>
                      <br />
                      <br />
                    </CardFooter>
                  </Card>

                  <ModificarPopUp
                    isOpen={isModify}
                    onClose={() => toggleModify(null)}
                    onConfirm={(
                      option,
                      quarterOption,
                      teacherOption,
                      yearOption
                    ) => {
                      toggleModify(null);
                      toggleModifyConfirmPopup(
                        modifySectionId,
                        option,
                        quarterOption,
                        teacherOption,
                        yearOption
                      );
                    }}
                    sectionId={modifySectionId}
                    Year={Year}
                  />

                  <ModificarConfirmPopUp
                    isOpen={isModifyConfirmPopupOpen}
                    onClose={() => toggleModifyConfirmPopup(null)}
                    onConfirm={() => {
                      handleConfirm(); // Llama a handleConfirm aquí
                      toggleModifyConfirmPopup(null);
                      toggleModifySuccessPopup();
                    }}
                    sectionId={modifySectionId}
                  />

                  <ModificarSuccessPopUp
                    isOpen={isModifySuccessPopupOpen}
                    onClose={() => {
                      toggleModifySuccessPopup();
                      // Actualiza la información del curso cuando se cierre el SuccessPopup
                      if (isModifyConfirmed) {
                        updateCourseInfo();
                      }
                    }}
                    sectionId={modifySectionId}
                  />

                  <EliminarConfirmarPopUp
                    isOpen={isDeleteConfirmPopupOpen}
                    onClose={() => toggleDeleteConfirmPopup(null)}
                    onConfirm={() => {
                      toggleDeleteConfirmPopup(null);
                      toggleDeleteSuccessPopup();
                    }}
                    sectionId={deleteSectionId}
                  />
                  <EliminarSuccessPopUp
                    isOpen={isDeleteSuccessPopupOpen}
                    onClose={() => {
                      toggleDeleteSuccessPopup();
                      updateCourseInfo();
                    }}
                    sectionId={deleteSectionId}
                  />
                </Col>
              );
            })
          ) : (
            <p>------</p>
          )}
        </Row>
      </div>
    </div>
  );
}

export default SectionsPage;
