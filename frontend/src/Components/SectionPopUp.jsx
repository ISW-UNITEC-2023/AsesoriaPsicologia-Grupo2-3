import React, { useEffect, useState } from "react";
import "../Styles/CSS/SectionPopUp.css";
import services from "../Utilities/login-services.js";

import { createSection } from "../Utilities/section-services.js";

const Popup = ({ isOpen, onClose, selectedButtonInfo, selectedTeacherId }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);

  const [displayedSections, setSections] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setSections(await services.getTeachers());
    }
    fetchData();
  }, []);

  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const isSaveDisabled =
    selectedYear < currentYear ||
    (selectedYear === currentYear && selectedQuarter < currentQuarter);

  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    if (displayedSections.length > 0) {
      setSelectedTeacher(displayedSections[0].id_user);
    }
  }, [displayedSections]);

  const handleSave = async () => {
    const course_id = selectedButtonInfo.CourseId;
    const teacher_id = selectedTeacher;
    const year = selectedYear;
    const quarter = selectedQuarter;

    const sectionData = {
      course_id,
      teacher_id,
      year,
      quarter,
      user_creator: 13
    };

    try {
      // Llamar a la función createSection con los datos
      await createSection(sectionData);
      // Cerrar el popup
      onClose();
      // Mostrar un mensaje de éxito
      alert("Sección creada exitosamente");

      console.log("sectionData", sectionData);
    } catch (error) {
      alert("Error al crear la sección!");
    }
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  return (
    <div className="popup-overlay" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <h2>Crear Nueva Sección</h2>
        <h2>Información del Curso</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="Coursename"
              defaultValue={selectedButtonInfo.CourseName}
              style={{ marginRight: "5px" }}
              disabled
            />
            <input
              type="text"
              className="form-control"
              id="sectionId"
              defaultValue={selectedButtonInfo.CourseId}
              style={{ marginRight: "auto" }}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="trimestre" style={{ marginRight: "10px" }}>
              Trimestre
            </label>
            <select
              className="form-control"
              id="trimestre"
              onChange={(e) => setSelectedQuarter(parseInt(e.target.value))}
              value={selectedQuarter}
            >
              <option value={1}>Q1</option>
              <option value={2}>Q2</option>
              <option value={3}>Q3</option>
              <option value={4}>Q4</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="anio" style={{ marginRight: "10px" }}>
              Año
            </label>
            <select
              className="form-control"
              id="anio"
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              value={selectedYear}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={currentYear + index} value={currentYear + index}>
                  {currentYear + index}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="docente" style={{ marginRight: "10px" }}>
              Docentes
            </label>
            <select
              className="form-control"
              id="docente"
              style={{ marginRight: "10px" }}
              onChange={handleTeacherChange}
              value={selectedTeacher}
            >
              {console.log(displayedSections)}
              {displayedSections.map((teacher, index) => (
                <option key={index} value={teacher.id_user}>
                  {teacher.id_user} - {teacher.name_user}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="buttons">
          <button
            className="btn btn-danger"
            onClick={onClose}
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </button>
          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
