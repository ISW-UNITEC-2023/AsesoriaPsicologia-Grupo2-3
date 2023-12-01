import { useState, useEffect } from "react";
import services from "../../../../frontend/src/Utilities/login-services.js";
import "../../../Styles/CSS/SectionPopUp/Modificar/ModificarPopUp.css";
import propsTypes from "prop-types";

import { Button } from "react-bootstrap";
const ModificarPopUp = ({ isOpen, onClose, onConfirm, sectionId, Year, teacher, quarter, year }) => {  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTeacherOption, setSelectedTeacherOption] = useState([]);
  //---------------------------
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedYearOption, setSelectedYearOption] = useState("");
  const [selectedQuarterOption, setSelectedQuarterOption] = useState("");
  const [selectedActiveOption, setSelectedActiveOption] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedOption("");
      setSelectedTeacher("");
      setSelectedYearOption("");
      setSelectedQuarterOption("");
      setSelectedActiveOption("");
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await services.getTeachers();
        console.log(response)
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
      (selectedOption === "quarter" && selectedQuarterOption === "") ||
      (selectedOption === "active" && selectedActiveOption === "")
    );
  };

  const handleConfirm = () => {
    onConfirm(
      selectedOption,
      selectedQuarterOption,
      selectedTeacher,
      selectedYearOption,
      selectedActiveOption
    );
  };
  const currentYear = new Date().getFullYear();
  return (
    <div className="popup-container" style={overlayStyle}>
      <div className="popup-modificar" style={popupStyle}>
        <div className="popup-content">
          <h2 style={{ marginBottom: "10px", fontWeight: "600" }}>
            ¿Está seguro que desea modificar la sección {sectionId}?
          </h2>

          <div className="select-main">
          <>
              <div class="input-group mb-1">
                <label htmlFor="selectTeacher"
                      class="input-group-text"
                      for="inputGroupSelect01">
                  Seleccione un docente:
                </label>
                <select
                  class="form-select"
                  id="selectTeacher"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">{teacher}</option>
                  {selectedTeacherOption.map((teacher, index) => (
                    <option key={index} value={teacher.id}>
                      {teacher.name_user}
                    </option>
                  ))}
                </select>
              </div>
            </>
            <>
              <div class="input-group mb-1">
                <label htmlFor="selectYear" class="input-group-text" for="inputGroupSelect01">Seleccione un año:</label>
                <select
                  class="form-select"
                  id="selectYear"
                  value={selectedYearOption}
                  onChange={(e) => setSelectedYearOption(e.target.value)}
                >
                  <option value="">{year}</option>
                  {Array.from({ length: 11 }, (_, index) => (
                    <option
                      key={index}
                      value={new Date().getFullYear() + index}
                    >
                      {new Date().getFullYear() + index}
                    </option>
                  ))}
                </select>
              </div>
            </>
            <>
              <div class="input-group mb-1">
                <label htmlFor="selectQuarter" class="input-group-text" for="inputGroupSelect01">Seleccione un año:</label>
                <select
                  class="form-select"
                  id="selectQuarter"
                  value={selectedQuarterOption}
                  onChange={(e) => setSelectedQuarterOption(e.target.value)}
                >
                  <option value="">Q{quarter}</option>
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
              </div>
            </>
          </div>

          <div className="button-container-modificar">
            <Button className="eliminar-section-popup mb-3" onClick={onClose}>
              Cancelar
            </Button>

            <Button className="modificar-section-popup mb-3" onClick={handleConfirm}>
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
  teacher: propsTypes.string,
  quarter: propsTypes.number,
  year: propsTypes.number,
};
