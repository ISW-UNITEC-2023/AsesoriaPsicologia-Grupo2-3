import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoSection } from "../../Services/sections";

import EliminarConfirmarPopUp from "../../components/SectionPopUp/Eliminar/ConfirmarPopUp/ConfirmarPopUp";
import EliminarSuccessPopUp from "../../components/SectionPopUp/Eliminar/SucessPopUp/successPopUp";

import ModificarConfirmPopUp from "../../components/SectionPopUp/Modificar/PopUp/ConfirmarPopUp/ConfirmarPopUp";
import ModificarSuccessPopUp from "../../components/SectionPopUp/Modificar/PopUp/SucessPopUp/successPopUp";
import ModificarPopUp from "../../components/SectionPopUp/Modificar/PopUp/ModificarPopUp/ModificarPopUp";
import "./Sections.css";

function SectionsPage() {
  const { courseId } = useParams();
  const [courseList, setCourseList] = useState([]);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchCourseInfo() {
      try {
        const response = await getInfoSection(courseId);
        setCourseList(response);
      } catch (error) {
        console.error("Error fetching course info:", error);
      }
    }

    fetchCourseInfo();
  }, [courseId]);

  const [isModifyConfirmPopupOpen, setModifyConfirmPopupOpen] = useState(false);
  const [isModifySuccessPopupOpen, setModifySuccessPopupOpen] = useState(false);
  const [isModify, setModify] = useState(false);
  const [modifySectionId, setModifySectionId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedQuarterOption, setSelectedQuarterOption] = useState("");
  const [selectedTeacherOption, setSelectedTeacherOption] = useState("");
  const [selectYearOption, setSelectedYearOption] = useState("");

  const updateCourseInfo = async () => {
    try {
      const response = await getInfoSection(courseId);
      setCourseList(response);
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
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

  return (
    <div>
      <div className="container-header">
        <h1 className="title-modulo">Secciones</h1>
      </div>

      {courseList.length > 0 ? (
        <div>
          {courseList.map((course) => {
            const currentSectionId = course.SectionId;
            const Year = course.Year;
            return (
              <div key={course.courseId} className="course-card">
                <h3>Nombre del Curso: {course.CourseName}</h3>
                <p>Codigo de Clase: {courseId}</p>
                <p>Id seccion: {currentSectionId}</p>
                <p>UV: {course.UV}</p>
                <p>año: {Year}</p>
                <p>Trimestre: {course.Quarter}</p>
                <p>Docente: {course.Teacher}</p>

                <button
                  type="button"
                  className="bi bi-pencil-fill"
                  style={{ marginRight: "10px" }}
                  onClick={() => toggleModify(currentSectionId)}
                ></button>
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
                    toggleModifyConfirmPopup(null);
                    toggleModifySuccessPopup();
                  }}
                  selectedOption={selectedOption}
                  sectionId={modifySectionId}
                  selectedQuarterOption={selectedQuarterOption}
                  selectedTeacherOption={selectedTeacherOption}
                  selectedYearOption={selectYearOption}
                />
                <ModificarSuccessPopUp
                  isOpen={isModifySuccessPopupOpen}
                  onClose={() => {
                    toggleModifySuccessPopup();
                    // Actualiza la información del curso cuando se cierre el SuccessPopup
                    updateCourseInfo();
                  }}
                  sectionId={modifySectionId}
                />

                <button
                  type="button"
                  className="bi bi-trash-fill"
                  style={{}}
                  onClick={() => toggleDeleteConfirmPopup(currentSectionId)}
                ></button>
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
                    // Actualiza la información del curso cuando se cierre el SuccessPopup
                    updateCourseInfo();
                  }}
                  sectionId={deleteSectionId}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>Cargando información del curso...</p>
      )}
    </div>
  );
}

export default SectionsPage;
