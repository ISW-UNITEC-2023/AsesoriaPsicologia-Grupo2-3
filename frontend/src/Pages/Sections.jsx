import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoSection } from "../Utilities/section-services";
import EliminarConfirmarPopUp from "../Components/SectionPopUp/Eliminar/ConfirmarPopUp";
import EliminarSuccessPopUp from "../Components/SectionPopUp/Eliminar/SucessPopUp";

import ModificarConfirmPopUp from "../Components/SectionPopUp/Modificar/ConfirmarPopUp";
import ModificarSuccessPopUp from "../Components/SectionPopUp/Modificar/successPopUp";
import ModificarPopUp from "../Components/SectionPopUp/Modificar/ModificarPopUp";
import "../Styles/CSS/Sections.css";

import {
  updateTeacher,
  updateQuarter,
  updateYear,
} from "../Utilities/section-services";

function SectionsPage() {
  const { courseId } = useParams();
  const [courseList, setCourseList] = useState([]);

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

  const [isModifyConfirmed, setIsModifyConfirmed] = useState(false);

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
                <div style={{display:'flex'}}>
                  <button
                    type="button"
                    className="bi bi-pencil"
                    style={{ marginRight: "10px",backgroundColor: 'green', color: 'black' }}
                    onClick={() => toggleModify(currentSectionId)}
                  />
                  <button
                    type="button"
                    className="bi bi-trash"
                    style={{backgroundColor: 'red', color: 'black'}}
                    onClick={() => toggleDeleteConfirmPopup(currentSectionId)}
                  />
                </div>
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
