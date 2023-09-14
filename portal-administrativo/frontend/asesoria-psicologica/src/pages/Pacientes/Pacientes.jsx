import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import Services from "../../../utils/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import EditarUser from "../../components/EditarUser/PopUp_EditarUser";
import CrearUser from "../../components/CrearUser/PopUp_CrearUser";

function PacientesForm() {
  const navigate = useNavigate();
  const [nombres, setNombres] = useState([]);
  const [showCrearPopup, setShowCrearPopup] = useState(false);
  const [showEditarPopup, setShowEditarPopup] = useState(false); // Estado para mostrar el popup de edición

  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado para la edición

  async function initialList() {
    const arregloUsuarios = await Services.getUsers();
    const arregloMandar = [];

    arregloUsuarios.credentials.usersCredentials.map((usuario) => {
      return arregloMandar.push({
        nombre: usuario.name,
        email: usuario.email,
        id_account: usuario.id_account,
      });
    });

    setNombres(arregloMandar);
  }

  useEffect(() => {
    initialList();
  }, []);

  // Función para agregar un nuevo paciente y actualizar la lista
  const addPacienteAndUpdateList = async (newPaciente) => {
    // Agregar el nuevo paciente a la lista existente
    setNombres([...nombres, newPaciente]);
  };

  const openCrearPopup = () => {
    setShowCrearPopup(true);
  };

  const closeCrearPopup = () => {
    setShowCrearPopup(false);
  };

  // Función para abrir el popup de edición cuando se hace clic en "Editar"
  const openEditarPopup = (user) => {
    // Almacena las credenciales del usuario seleccionado en el localStorage
    localStorage.setItem("selectedUserId", user.id_account);
    localStorage.setItem("selectedUserName", user.nombre);
    localStorage.setItem("selectedUserEmail", user.email);

    setSelectedUser(user); // Almacena el usuario seleccionado para la edición
    setShowEditarPopup(true);
  };

  const closeEditarPopup = () => {
    setShowEditarPopup(false);
    setSelectedUser(null); // Limpia el usuario seleccionado cuando se cierra el popup de edición
  };

  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-pacientes">Pacientes</h1>
        <button className="crear-participante-button" onClick={openCrearPopup}>
          Crear participante
        </button>
      </div>
      <ul>
        {nombres.map((nombre) => (
          <li key={nombre.email}>
            <div className="nombre-box">
              <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
              <span className="nombre">
                <Link to={"/expedientes"}>{nombre.nombre}</Link>
              </span>
              {/* Agrega el evento onClick para abrir el popup de edición */}
              <button
                className="editar-button"
                onClick={() => openEditarPopup(nombre)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showCrearPopup && (
        <CrearUser
          onClose={closeCrearPopup}
          isOpen={showCrearPopup}
          onUpdatePacientesList={addPacienteAndUpdateList} // Pasa la función aquí
        />
      )}
      {showEditarPopup && selectedUser && (
        <EditarUser
          onClose={closeEditarPopup}
          isOpen={showEditarPopup}
          user={selectedUser} // Pasa el usuario seleccionado para la edición
        />
      )}
    </div>
  );
}

export default PacientesForm;
