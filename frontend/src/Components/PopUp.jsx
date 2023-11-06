import { useState } from "react";
import "../Styles/CSS/PopUp.css";
import axios from "axios"; // Importa Axios
import { createModules } from "../Utilities/course-services.js";

const Popup = ({ isOpen, onClose, onUpdateModuleList }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [moduleName, setModuleName] = useState(""); // Estado para el nombre del módulo
  const [moduleDescription, setModuleDescription] = useState(""); // Estado para la descripción del módulo

  const handleSaveModule = async () => {

    console.log("Intentando crear el módulo...");
    const name = moduleName;
    const description = moduleDescription;
    
   // const creator = selectedQuarter;
    
    
    const newModule = {

      name: moduleName,
      description: moduleDescription,
      creator: '14'
    };
    try {
      // Llamar a la función createSection con los datos
      await createModules(newModule);
      // Cerrar el popup
      onClose();
      // Mostrar un mensaje de éxito
      alert("Modulo creado exitosamente");
    } catch (error) {
      alert("Error al crear el modulo!");
    }
  };

    // axios
    //   .post(process.env.REACT_APP_API_BASE_ULR+"/courses/create", newModule)
    //   .then((response) => {
    //     console.log("Módulo creado:", response.data);
    //     onUpdateModuleList(); // Llama a la función para actualizar la lista de módulos
    //     onClose(); // Cierra el popup después de guardar
    //   })
    //   .catch((error) => {
    //     console.error("Error al crear el módulo:", error);
    //   });
 
  return (
    <div className="popup-overlay" style={overlayStyle}>
      <div className="popup" style={popupStyle}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>CREAR NUEVO MÓDULO</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nombre">NOMBRE</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese el nombre"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">DESCRIPCIÓN</label>
            <textarea
              name="textarea"
              rows="5"
              cols="30"
              placeholder="Ingrese la descripción"
              value={moduleDescription}
              onChange={(e) => setModuleDescription(e.target.value)}
            ></textarea>
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
          <button className="btn btn-success" onClick={handleSaveModule}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
