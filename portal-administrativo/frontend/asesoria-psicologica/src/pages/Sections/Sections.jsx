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
      <h1>Detalles del Curso</h1>
      {courseList.length > 0 ? (
        <div>
          <h2>Información Adicional del Curso</h2>
          {courseList.map((course) => (
            <div key={course.id} className="course-card">
              <h3>Nombre del Curso: {course.CourseName}</h3>
              <p>Codigo de Clase: {courseId}</p>
              <p>UV: {course.UV}</p>
              <p>año: {course.Year}</p>
              <p>Trimestre: {course.Quarter}</p>
              <p>Docente: {course.Teacher}</p>
              {/* Otros detalles del curso */}
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
