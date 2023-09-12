import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoSection } from "../../Services/sections";
import "./Sections.css";
function SectionsPage() {
  const { courseId } = useParams();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    async function fetchCourseInfo() {
      try {
        const response = await getInfoSection(courseId);
        setCourseList(response); // Supongamos que response es una lista de cursos
      } catch (error) {
        console.error("Error fetching course info:", error);
      }
    }

    fetchCourseInfo();
  }, [courseId]);

  return (
    <div>
      <div className="container-header">
        <h1 className="title-modulo">Secciones</h1>
      </div>

      {courseList.length > 0 ? (
        <div>
          {courseList.map((course) => (
            <div key={course.courseId} className="course-card">
              <h3>Nombre del Curso: {course.CourseName}</h3>
              <p>Codigo de Clase: {courseId}</p>
              <p>Id seccion: {course.SectionId}</p>
              <p>UV: {course.UV}</p>
              <p>año: {course.Year}</p>
              <p>Trimestre: {course.Quarter}</p>
              <p>Docente: {course.Teacher}</p>
              {/* Otros detalles del curso */}
              <button type="button" class="bi bi-pencil-fill "  style={{}}>
            </button>
            <button type= "button" class= "bi bi-trash-fill" style={{}}>
          </button>
            </div>
          
          ))}
        </div>
      ) : (
        <p>Cargando información del curso...</p>
      )}
    </div>
  );
}

export default SectionsPage;
