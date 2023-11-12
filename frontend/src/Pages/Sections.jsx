import React, { useState, useEffect } from "react";
import {
  getInfoSection,
  updateTeacher,
  updateQuarter,
  updateYear,
  updateActive,
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
//import CrearSeccion from "../Components/SectionPopUp.jsx";

import "../Styles/CSS/Sections.css";
import NavBar from "../Components/Navbar";

function SectionsPage() {
  const [courseList, setCourseList] = useState([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    async function fetchCourseInfo() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        let parametro = urlParams.get("course_id");
        parametro = parseInt(parametro);
        setId(parametro);
        const response = await getInfoSection(parametro);
        setCourseList(response);
      } catch (error) {
        console.error("Error fetching course info:", error);
      }
    }
    fetchCourseInfo();
  }, [id]);

  const [isModifyConfirmPopupOpen, setModifyConfirmPopupOpen] = useState(false);
  const [isModifySuccessPopupOpen, setModifySuccessPopupOpen] = useState(false);
  const [isModify, setModify] = useState(false);
  const [modifySectionId, setModifySectionId] = useState(null);
  const [modifyTeacher, setModifyTeacher] = useState(null);
  const [modifyQuarter, setModifyQuarter] = useState(null);
  const [modifyYear, setModifyYear] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedQuarterOption, setSelectedQuarterOption] = useState("");
  const [selectedTeacherOption, setSelectedTeacherOption] = useState("");
  const [selectedYearOption, setSelectedYearOption] = useState("");
  const [selectedActiveOption, setSelectedActiveOption] = useState("");
  
  const [isModifyConfirmed, setIsModifyConfirmed] = useState(false);

  const updateCourseInfo = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let parametro = urlParams.get("course_id");
      parametro = parseInt(parametro);
      setId(parametro);
      const response = await getInfoSection(parametro);
      setCourseList(response);
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
  };

  const toggleModifySuccessPopup = () => {
    setModifySuccessPopupOpen(!isModifySuccessPopupOpen);
  };

  const toggleModify = (sectionId, teacher, quarter, year) => {
    setModifySectionId(sectionId);
    setModifyTeacher(teacher);
    setModifyQuarter(quarter);
    setModifyYear(year);
    setModify(!isModify);
  };

  const toggleModifyConfirmPopup = (
    sectionId,
    option,
    quarterOption,
    teacherOption,
    yearOption,
    activeOption
  ) => {
    setModifySectionId(sectionId);
    setSelectedOption(option);
    setSelectedQuarterOption(quarterOption);
    setSelectedTeacherOption(teacherOption);
    setSelectedYearOption(yearOption);
    setSelectedActiveOption(activeOption);
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
      if (modifyTeacher !== selectedTeacherOption) {
        await updateTeacher(modifySectionId, selectedTeacherOption);
      } 
      
      if (modifyYear !== selectedYearOption) {
        await updateYear(modifySectionId, selectedYearOption);
      }
      
      if (modifyQuarter !== selectedQuarterOption) {
        await updateQuarter(modifySectionId, selectedQuarterOption);
      } else if (selectedOption === "active") {
        await updateActive(modifySectionId, selectedActiveOption);
      }
      setIsModifyConfirmed(true);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <NavBar />

      <div className="dashboard-box box">
        <Row>
          <h1 className="title-seccion">Secciones</h1>
          <div className="section-container flex flex-row flex-wrap gap-3">
            {courseList.length > 0 ? (
              courseList.map((course) => {
                const currentSectionId = course.SectionId;
                const currentTeacher = course.Teacher;
                const currentYear = course.Year;
                const currentQuarter = course.Quarter;
                const Year = course.Year;
                return (
                  <>
                    <Card border="dark" style={{ width: "25rem" }}>
                      <Card.Body>
                        <Card.Title className="title-section-card">
                          Sección : {course.SectionId}
                          <Card.Subtitle style={{ color: "#5a5e6a" }}>
                            {course.CourseName}{" "}
                          </Card.Subtitle>
                        </Card.Title>
                        <Card.Text className="section-text">
                          <br />
                          <strong>Código de Clase: </strong>
                          {course.CourseId} <br />
                          <strong>Id sección: </strong>
                          {course.SectionId} <br />
                          <strong>Año: </strong>
                          {currentYear} <br />
                          <strong>Trimestre: </strong>
                          {currentQuarter} <br />
                          <strong>Docente: </strong>
                          {currentTeacher} <br />
                          {course.Active === 1 ? (
                            <strong>Estado: Activo</strong>
                          ) : (
                            <strong>Estado: Inactivo</strong>
                          )}
                          <br />
                        </Card.Text>
                      </Card.Body>
                      <CardFooter
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          paddingBlock: "1rem",
                          width: "100%",
                        }}
                      >
                        <br />
                        <br />

                        <Button
                          variant="danger"
                          style={{
                            marginRight: "15px",
                          }}
                          className="eliminar-button-section"
                          onClick={() =>
                            toggleDeleteConfirmPopup(course.SectionId)
                          }
                        >
                          Eliminar
                        </Button>

                        <Button
                          variant="success"
                          className="modificar-button-section"
                          onClick={() => toggleModify(currentSectionId, currentTeacher, currentQuarter, currentYear)}
                          style={{
                            backgroundColor: "#00367d",
                            marginRight: "15px",
                          }}
                        >
                          Modificar
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
                        yearOption,
                        activeOption
                      ) => {
                        toggleModify(null);
                        toggleModifyConfirmPopup(
                          modifySectionId,
                          option,
                          quarterOption,
                          teacherOption,
                          yearOption,
                          activeOption
                        );
                      }}
                      sectionId={modifySectionId}
                      Year={Year}
                      teacher={modifyTeacher}
                      quarter={modifyQuarter}
                      year={modifyYear}
                    />

                    <ModificarConfirmPopUp
                      isOpen={isModifyConfirmPopupOpen}
                      onClose={() => toggleModifyConfirmPopup(null)}
                      onConfirm={() => {
                        handleConfirm();
                        toggleModifyConfirmPopup(null);
                        toggleModifySuccessPopup();
                      }}
                      sectionId={course.SectionId}
                    />

                    <ModificarSuccessPopUp
                      isOpen={isModifySuccessPopupOpen}
                      onClose={() => {
                        toggleModifySuccessPopup(null);

                        if (isModifyConfirmed) {
                          updateCourseInfo();
                        }
                      }}
                      sectionId={course.SectionId}
                    />

                    <EliminarConfirmarPopUp
                      isOpen={isDeleteConfirmPopupOpen}
                      onClose={() => toggleDeleteConfirmPopup(null)}
                      onConfirm={() => {
                        toggleDeleteConfirmPopup(null);
                        toggleDeleteSuccessPopup();
                      }}
                      sectionId={course.SectionId}
                    />

                    <EliminarSuccessPopUp
                      isOpen={isDeleteSuccessPopupOpen}
                      onClose={() => {
                        toggleDeleteSuccessPopup();
                        updateCourseInfo();
                      }}
                      sectionId={course.SectionId}
                    />
                  </>
                );
              })
            ) : (
              <p>No hay secciones existentes para este módulo.</p>
            )}
          </div>
        </Row>
      </div>
    </div>
  );
}

export default SectionsPage;
