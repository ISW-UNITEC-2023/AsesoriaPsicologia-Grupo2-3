import {useEffect, useState} from "react";
import "../Styles/CSS/PopUp.css";
import axios from "axios"; // Importa Axios
import {createModules} from "../../frontend/src/Utilities/course-services.js";

const Popup = ({isOpen, onClose, onUpdateModuleList}) => {
    const overlayStyle = {
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
    };

    const popupStyle = {
        transform: isOpen ? "scale(1)" : "scale(0.8)",
    };

    const [moduleName, setModuleName] = useState(""); // Estado para el nombre del módulo
    const [moduleDescription, setModuleDescription] = useState(""); // Estado para la descripción del módulo

    useEffect(() => {
        // Restablecer el estado cuando el componente se monta o isOpen cambia
        if (isOpen) {
            setModuleName("");
            setModuleDescription("");
        }
    }, [isOpen]);

    const handleSaveModule = async () => {
        console.log("Intentando crear el módulo...");

        console.log("Intentando crear el módulo...");
        const name = moduleName;
        const description = moduleDescription;

        // const creator = selectedQuarter;


        const newModule = {

            name: moduleName,
            description: moduleDescription,
            creator: '14'
        }

        try {
            // Llamar a la función createSection con los datos
            await createModules(newModule);
            // Cerrar el popup
            onClose();
            // Mostrar un mensaje de éxito
            alert("Modulo creado exitosamente");

            window.location.reload();

        } catch (error) {
            alert("Error al crear el modulo!");
        }
    };


    return (
        <div className="popup-overlay flex justify-center items-center" style={overlayStyle}>
            <div className="popup w-50 " style={popupStyle}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2 >CREAR NUEVO MÓDULO</h2>
                <form>
                    <div className="flex flex-col justify-center items-center mb-3 mt-3">
                        <label htmlFor="nombre">NOMBRE</label>
                        <input
                            type="text"
                            className="form-control w-auto"
                            id="nombre"
                            placeholder="Ingrese el nombre"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mb-3">
                        <label htmlFor="descripcion">DESCRIPCIÓN</label>
                        <textarea
                            name="textarea"
                            rows="5"
                            cols="30"
                            placeholder=" Ingrese la descripción"
                            value={moduleDescription}
                            onChange={(e) => setModuleDescription(e.target.value)}
                            className="w-auto resize-x border border-gray-300 rounded-md"
                        />
                    </div>
                </form>
                <div className="buttons flex flex-col md:flex-row justify-center items-center">
                    <button
                        className="btn btn-danger mb-2 md:mb-0 md:mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button className="btn btn-success mb-2" onClick={handleSaveModule}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
