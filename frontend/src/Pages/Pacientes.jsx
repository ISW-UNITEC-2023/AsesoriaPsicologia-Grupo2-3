import React, {useEffect, useState} from "react";
import "../Styles/CSS/Pacientes.css";
import {Link} from "react-router-dom";
import Services from "../Utilities/login-services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import EditarUser from "../Components/PopUp_EditarUser";
import CrearUser from "../Components/PopUp_CrearUser";
import NavigationB from "../Components/Navbar";
import PacientesLayout from "../Layout/PacientesLayout";

function PacientesForm(props) {

    const [nombres, setNombres] = useState([]);
    const [showCrearPopup, setShowCrearPopup] = useState(false);
    const [showEditarPopup, setShowEditarPopup] = useState(false); // Estado para mostrar el popup de edición

    const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado para la edición
    const [nombre, setNombre] = useState("");

    async function initialList() {
        const arregloUsuarios = await Services.getPatients();
        const arregloMandar = [];

        arregloUsuarios.map((usuario) => {
            let nombre_user = `${usuario.first_name} ${usuario.middle_name} ${usuario.last_name} ${usuario.second_surname}`;
            return arregloMandar.push({
                nombre: nombre_user,
                email: usuario.email,
                id_account: usuario.id_file,
            });
        })

        //console.log("pacientes",arregloUsuarios);
        setNombres(arregloMandar);
    }

    useEffect(() => {
        initialList().then(r => r);
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


    const handleClick = (id, nombre) => {
        // Guardar el nombre en el localStorage
        localStorage.setItem('id_patient', id);
        localStorage.setItem('namePatient', nombre);
    };

    return (
        <PacientesLayout pagina="Pacientes">
            <div className="pacientes-container">
                <NavigationB key="navB" userData={props.userData}/>
                <div className="container-pacientes-title-list">
                    <h1 className="title-pacientes">
                        Pacientes
                    </h1>

                    <ul>
                        {nombres.map((nombre) => (
                            <li key={nombre.email}>
                                <div className="nombre-box">
                                    <FontAwesomeIcon icon={faUserCircle} className="icon-persona"/>
                                    <span className="nombre" style={{width: "400%"}}>
                   <Link to="/sesiones" onClick={() => handleClick(nombre.id_account, nombre.nombre)}>
                {nombre.nombre}
              </Link>
                </span>
                                    {/* Agrega el evento onClick para abrir el popup de edición */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

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
        </PacientesLayout>
    );
}

export default PacientesForm;
