import React, { useEffect, useState } from "react";
import "../Styles/CSS/SectionPopUp.css";
import services from "../../frontend/src/Utilities/login-services.js";

import { createSection } from "../../frontend/src/Utilities/section-services.js";

const Popup = ({ isOpen, onClose, selectedButtonInfo }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };
  //obtener el año actual y el trimestre actual
  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);

  const [displayedSections, setSections] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setSections(await services.getTeachers());
    }
    fetchData();
  }, [isOpen]); // Cambio a [isOpen] para que se actualice cuando se abre el popup

  //seleccionar el primer trimestre de la lista
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  //seleccionar el año actual
  const [selectedYear, setSelectedYear] = useState(currentYear);
  //deshabilitar el botón de guardar si el año seleccionado es menor al actual
  const isSaveDisabled =
    selectedYear < currentYear ||
    (selectedYear === currentYear && selectedQuarter < currentQuarter);
  //seleccionar el primer docente de la lista
  const [selectedTeacher, setSelectedTeacher] = useState("");
  //seleccionar el docente que se le pasa por parámetro
  useEffect(() => {
    if (displayedSections.length > 0) {
      setSelectedTeacher(displayedSections[0].id_user);
    }
  }, [displayedSections]);

  const handleSave = async () => {
    // Obtener los datos del curso seleccionado
    const course_id = selectedButtonInfo.CourseId;
    const teacher_id = selectedTeacher;
    const year = selectedYear;
    const quarter = selectedQuarter;
    // Crear un objeto con los datos de la sección
    const sectionData = {
      course_id,
      teacher_id,
      year,
      quarter,
      user_creator: "13",
    };

    try {
      // Llamar a la función createSection con los datos
      await createSection(sectionData);
      // Cerrar el popup
      onClose();
      // Mostrar un mensaje de éxito
      alert("Sección creada exitosamente");
    } catch (error) {
      alert("Error al crear la sección!");
    }
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      // Restablecer el estado cuando el componente se abre
      setSelectedQuarter(1);
      setSelectedYear(currentYear);
    }
  }, [isOpen]);

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
