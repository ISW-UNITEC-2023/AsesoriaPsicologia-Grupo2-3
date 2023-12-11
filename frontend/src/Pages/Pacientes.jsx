import React, { useEffect, useState } from "react";
import "../Styles/CSS/Pacientes.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Services from "../Utilities/login-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import EditarUser from "../Components/PopUp_EditarUser";
import CrearUser from "../Components/PopUp_CrearUser";
import NavigationB from "../Components/Navbar";
import PacientesLayout from "../Layout/PacientesLayout";

function PacientesForm(props) {
    const [nombres, setNombres] = useState([]);
    const [showCrearPopup, setShowCrearPopup] = useState(false);
    const [showEditarPopup, setShowEditarPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [montoConsulta, setMontoConsulta] = useState('');
    const [montoError, setMontoError] = useState(false);
    const handleClose = () => {
        setShowModal(false);
    };
    
    async function initialList() {
        const arregloUsuarios = await Services.getPatients();
        const arregloMandar = [];

        arregloUsuarios.map((usuario) => {
            let nombre_user =`${usuario.first_name} ${usuario.middle_name} ${usuario.last_name} ${usuario.second_surname}`;
            return arregloMandar.push({
                nombre: nombre_user,
                email: usuario.email,
                id_account: usuario.id_file,
                creationDate: usuario.creation_date,
            });
        });

        setNombres(arregloMandar);
    }

     const handleShow = () => setShowModal(true);
    const handleTerminarConsulta = () => {
        if (montoConsulta.trim() === '') {
            setMontoError(true);
        } else {
            setMontoError(false);
            setShowModal(false);
        } };
        const handleGuardarConsulta = () => {
                setMontoError(false);
                const doctorName = document.getElementById('doctorName').value;
                const motivoConsulta = document.getElementById('consultaMotivo').value;
                const observaciones = document.getElementById('observaciones').value;
                const ordenesMedicas = document.getElementById('ordenesMedicas').value;
                const consulta = {
                    doctorName,
                    motivoConsulta,
                    observaciones,
                    montoConsulta,
                    ordenesMedicas,
                };
        
                localStorage.setItem('consultaGuardada', JSON.stringify(consulta));
                console.log('Consulta guardada:', consulta);
                localStorage.clear();
                setShowModal(false);
            }

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        

        return [day, month, year].join('/');
    }

    useEffect(() => {
        initialList().then(r => r);
    }, []);

    const addPacienteAndUpdateList = async (newPaciente) => {
        setNombres([...nombres, newPaciente]);
    };

    const openCrearPopup = () => {
        setShowCrearPopup(true);
    };

    const closeCrearPopup = () => {
        setShowCrearPopup(false);
    };

    const openEditarPopup = (user) => {
        localStorage.setItem("selectedUserId", user.id_account);
        localStorage.setItem("selectedUserName", user.nombre);
        localStorage.setItem("selectedUserEmail", user.email);

        setSelectedUser(user);
        setShowEditarPopup(true);
    };

    const closeEditarPopup = () => {
        setShowEditarPopup(false);
        setSelectedUser(null);
    };

    const handleClick = (id, nombre) => {
        localStorage.setItem('id_patient', id);
        localStorage.setItem('namePatient', nombre);
    };

    return (
        <PacientesLayout pagina="Pacientes">
            <div className="navbar2">
                <NavigationB />
            
                <div className="pacientes-container">
                <div className="pacientes-header">
                <h1 className="title-pacientes2">Pacientes</h1> 
                <div className="IniciarConsulta">
                
                <button className="consultation-btn" onClick={handleShow}>
            
                    Iniciar consulta
                </button>
                    </div>
                    </div>
                    <div className="card-container">
                        {nombres.map((nombre) => (
                            <div key={nombre.id_account} className="card">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                                    <h3 className="card-title">{nombre.nombre}</h3>
                                    <div className="conteiner-card-text">
                                    <h4 className="card-text">{formatDate(nombre.creationDate)}</h4>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdown-${nombre.id_account}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Acciones
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby={`dropdown-${nombre.id_account}`}>
                                            <Link to="/citas" className="dropdown-item">Manejar Cita</Link>
                                            <Link to="/Expedientes" className="dropdown-item">Ver Expediente</Link>
                                            <Link to="/Documentos" className="dropdown-item" state={{id_file:nombre.id_account, userData:props.userData}}>Ver Documentos</Link>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {showCrearPopup && (
                        <CrearUser
                            onClose={closeCrearPopup}
                            isOpen={showCrearPopup}
                            onUpdatePacientesList={addPacienteAndUpdateList}
                        />
                    )}
                    {showEditarPopup && selectedUser && (
                        <EditarUser
                            onClose={closeEditarPopup}
                            isOpen={showEditarPopup}
                            user={selectedUser}
                        />
                    )}
                    <div className={`pop-iniciar-consulta ${showModal ? 'show' : ''}`}>
                <div className="pop-iniciar-consulta-content">
                    <div className="pop-iniciar-consulta-header">
                        <h1>Consulta Médica</h1>

                        <buttons className="button-save" onClick={handleGuardarConsulta}>Guardar Consulta</buttons>
                    </div>
                    <div className="pop-iniciar-consulta-body">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label htmlFor="doctorName">Nombre del Médico:</label>
                            <input type="text" id="doctorName" />
                            </div>
                        <form className="pop-iniciar-consulta-form">
                            <label htmlFor="consultaMotivo">Motivo de Consulta:</label>
                            <textarea id="consultaMotivo" rows={3} placeholder="Ingrese motivo de consulta"></textarea>

                            <label htmlFor="observaciones">Observaciones:</label>
                            <textarea id="observaciones" rows={3} placeholder="Ingrese observaciones"></textarea>
                                <label htmlFor="montoConsulta">Monto de Consulta:</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '0.3rem' }}>Lps.</span>
                                <input type="text" id="montoConsulta" placeholder="Ingrese monto de consulta" value={montoConsulta}
                                    onChange={(e) => setMontoConsulta(e.target.value)}/>
                                </div>
                                    {montoError && (
                                        <p style={{ color: "red", fontSize: "0.8rem", marginTop: "0.5rem" }}>El campo de Monto de Consulta no puede estar vacío</p>
                                    )}
                            <label htmlFor="ordenesMedicas">Órdenes Médicas:</label>
                            <textarea id="ordenesMedicas" rows={3} placeholder="Ingrese órdenes médicas"></textarea>
                        </form>
                    </div>
                    <div className="pop-iniciar-consulta-footer">
                        <buttons className="close-button-sesiones" type="button" class="btn btn-outline-danger" onClick={handleClose}>Cerrar</buttons>
                        <buttons className="button-terminar"  onClick={handleTerminarConsulta}>Terminar Consulta</buttons>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </PacientesLayout>
    );
}

export default PacientesForm;


