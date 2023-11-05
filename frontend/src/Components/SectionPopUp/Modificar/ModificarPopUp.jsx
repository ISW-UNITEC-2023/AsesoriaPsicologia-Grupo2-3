import { useState, useEffect } from "react";
import services from "../../../Utilities/login-services.js";
import "../../../Styles/CSS/SectionPopUp/Modificar/ModificarPopUp.css";
import propsTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

import { Button } from "react-bootstrap";
const ModificarPopUp = ({ isOpen, onClose, onConfirm, sectionId, Year }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTeacherOption, setSelectedTeacherOption] = useState([]);
  //---------------------------
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedYearOption, setSelectedYearOption] = useState("");
  const [selectedQuarterOption, setSelectedQuarterOption] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedOption("");
      setSelectedTeacher("");
      setSelectedYearOption("");
      setSelectedQuarterOption("");
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await services.getTeachers();
        setSelectedTeacherOption(response);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    }

    fetchTeachers();
  }, []);

  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const isButtonDisabled = () => {
    return (
      selectedOption === "" ||
      (selectedOption === "teacher_id" && selectedTeacher === "") ||
      (selectedOption === "year" && selectedYearOption === "") ||
      (selectedOption === "quarter" && selectedQuarterOption === "")
    );
  };

  const handleConfirm = () => {
    onConfirm(
      selectedOption,
      selectedQuarterOption,
      selectedTeacher,
      selectedYearOption
    );

    if (selectedOption === "teacher_id") {
      const teacher_id = selectedTeacher;
      console.log(`Teacher ID seleccionado: ${teacher_id}`);
    } else if (selectedOption === "year") {
      console.log(`Año seleccionado: ${selectedYearOption}`);
    } else if (selectedOption === "quarter") {
      console.log(`Trimestre seleccionado: Q${selectedQuarterOption}`);
    }
  };
  const currentYear = new Date().getFullYear();
  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup-modificar" style={popupStyle}>
        <div className="popup-content">
          <h2 style={{ marginBottom: "50px", fontWeight: "600" }}>
            ¿Está seguro que desea modificar la sección {sectionId}?
          </h2>

          <div className="select-main">
            <div className="select-container">
              <label htmlFor="selectOption">Seleccione una opción:</label>
              <select
                id="selectOption"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{ marginBottom: "20px" }}
              >
                <option value="">Seleccione una opción</option>
                <option value="teacher_id">Teacher ID</option>
                <option value="year">Year</option>
                <option value="quarter">Quarter</option>
              </select>
            </div>

            <div className="select-container-two">
              {selectedOption === "teacher_id" && (
                <>
                  <label htmlFor="selectTeacher">Seleccione un docente:</label>
                  <select
                    id="selectTeacher"
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    <option value="">Seleccione un docente</option>
                    {selectedTeacherOption.map((teacher, index) => (
                      <option key={index} value={teacher.id}>
                        {teacher.id_user} - {teacher.name_user}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {selectedOption === "year" && (
                <>
                  <label htmlFor="selectYear">Seleccione un año:</label>
                  <select
                    id="selectYear"
                    value={selectedYearOption}
                    onChange={(e) => setSelectedYearOption(e.target.value)}
                  >
                    <option value="">Seleccione un año</option>
                    {Array.from({ length: 11 }, (_, index) => (
                      <option
                        key={index}
                        value={new Date().getFullYear() + index}
                      >
                        {new Date().getFullYear() + index}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {selectedOption === "quarter" && (
                <>
                  <label htmlFor="selectQuarter">
                    Seleccione un trimestre:
                  </label>
                  <select
                    id="selectQuarter"
                    value={selectedQuarterOption}
                    onChange={(e) => setSelectedQuarterOption(e.target.value)}
                  >
                    <option value="">Seleccione un trimestre</option>
                    {[1, 2, 3, 4].map((quarter) => (
                      <option
                        key={quarter}
                        value={quarter}
                        disabled={
                          Year <= currentYear &&
                          quarter < Math.floor((new Date().getMonth() + 3) / 3)
                        }
                      >
                        Q{quarter}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>

          <div className="button-container-modificar">
            <Button className="eliminar-section-popup" onClick={onClose}>
              Cancelar
            </Button>

            <Button
              className="modificar-section-popup"
              onClick={handleConfirm}
              disabled={isButtonDisabled()}
            >
              Modificar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarPopUp;

ModificarPopUp.propsTypes = {
  isOpen: propsTypes.bool,
  onClose: propsTypes.func,
  onConfirm: propsTypes.func,
  sectionId: propsTypes.number,
  Year: propsTypes.number,
};
