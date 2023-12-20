import React, { useState, useEffect, useRef } from "react";
import "../Styles/CSS/Pacientes.css";
import { Link } from "react-router-dom";
import Services from "../Utilities/login-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import EditarUser from "../Components/PopUp_EditarUser";
import CrearUser from "../Components/PopUp_CrearUser";
import CrearPaciente from "../Components/CrearPaciente/PopUp_CrearPaciente";
import NavigationB from "../Components/Navbar";
import PacientesLayout from "../Layout/PacientesLayout";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";
import user_services from "../Utilities/user-services";
import { Spinner } from "@material-tailwind/react";
import PopUpAction from "../Components/MultifunctionalPopUps/PopUpAction";
import PopUpActionConfirm from "../Components/MultifunctionalPopUps/PopUpActionConfirm";
import patientsService from "../Utilities/patients-services";
import { getVerify } from "../Utilities/user-services";

function PacientesForm(props) {
	// console.log("Nuevas propiedades", props);

  function havePrivilege(privilege) {
    // console.log("Esto es lo que voy a comparar", props.verifyRef);
    if (privilege) {
      return props.verifyRef.current.privileges.includes(privilege);
    } else {
      return false;
    }
  }

	const host = process.env.REACT_APP_API_BASE_URL;
	const [nombres, setNombres] = useState([]);
	const [showCrearPopup, setShowCrearPopup] = useState(false);
	const [showEditarPopup, setShowEditarPopup] = useState(false);
	const [showCrearPacientePopup, setShowCrearPacientePopup] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const {
		data: fetchedUsers,
		error: usersError,
		isLoading: usersLoading,
	} = useSWR(host + "/users/viewUsers", user_services.getUsers);
	const {
		data: fetchedRoles,
		error: rolesError,
		isLoading: rolesLoading,
	} = useSWR(host + "/roles/viewAll", user_services.getAllUsersRoles);

	const [displayActionPopUp, setDisplayActionPopUp] = useState(false);
	const [displayConfirmPopUp, setDisplayConfirmPopUp] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState({
		nombre: "",
		fechaNacimiento: "",
		numeroIdentidad: "",
		direccion: "",
		estadoCivil: "",
	});

	const handleActionConfirm = () => {
		setDisplayActionPopUp(false);
		setDisplayConfirmPopUp(false);
	};

	const handleShowAgregarPacientePopUp = (patient) => {
		setSelectedPatient(patient);
		setShowCrearPacientePopup(true);
	};

	const handleCrearPaciente = async () => {
		try {
			const nombre_completo = selectedPatient.nombre.split(" ");
			const result = await patientsService.CreatePatient(
				nombre_completo[0],
				nombre_completo[1],
				nombre_completo[2],
				nombre_completo[3],
				selectedPatient.fechaNacimiento,
				"prueba@gmail.com",
				"96569414",
				selectedPatient.direccion,
				selectedPatient.estadoCivil,
				"---",
				"---",
				props.userData.user_data.id_clinic,
				props.userData.user_data.id_user,
				selectedPatient.numeroIdentidad
			);

			if (result.message) {
				// console.log(result);
				console.log("Error al crear el paciente:", result.message);
				setDisplayActionPopUp(false);
			} else {
				console.log("Error al crear al paciente:", result);
			}
		} catch (error) {
			console.error("Error creating patient:", error);
		} finally {
		}
	};

	const handleActionPopUp = (pacienteInfo) => {
		setSelectedPatient(pacienteInfo);
		setShowCrearPacientePopup(false);
		setDisplayActionPopUp(true);
	};

	const closeCrearPacientePopup = () => {
		setShowCrearPacientePopup(false);
	};

	async function initialList() {
		const arregloUsuarios = await Services.getPatients(
			props.userData.user_data.id_clinic
		);
		const arregloMandar = [];

		arregloUsuarios.fileInfo.map((usuario) => {
			let nombre_user = `${usuario.first_name} ${usuario.middle_name} ${usuario.last_name} ${usuario.second_surname}`;
			return arregloMandar.push({
				nombre: nombre_user,
				email: usuario.email,
				id_account: usuario.id_file,
				creationDate: usuario.creation_date,
				id_clinic: usuario.id_clinic,
			});
		});

		setNombres(arregloMandar);
	}

	const formatDate = (date) => {
		const d = new Date(date);
		let month = "" + (d.getMonth() + 1);
		let day = "" + d.getDate();
		const year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [day, month, year].join("/");
	};

	useEffect(() => {
		initialList().then((r) => r);
	}, []);

	const addPacienteAndUpdateList = async (newPaciente) => {
		setNombres([...nombres, newPaciente]);
	};

	const closeCrearPopup = () => {
		setShowCrearPopup(false);
	};

	const closeEditarPopup = () => {
		setShowEditarPopup(false);
		setSelectedUser(null);
	};

	const handleClick = (id, nombre, id_clinic) => {
		localStorage.setItem("id_patient", id);
		localStorage.setItem("namePatient", nombre);
		localStorage.setItem("id_clinic", id_clinic);
	};

	if (usersLoading || rolesLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Spinner />
			</div>
		);
	}

	if (usersError || rolesError) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Ha ocurrido un error al cargar los usuarios</p>
			</div>
		);
	}

	return (
		<PacientesLayout pagina='Pacientes'>
			<div className='navbar2'>
				<NavigationB />
				<div className='pacientes-container'>
					<div className='pacientes-header'>
						<h1 className='title-pacientes2'>Pacientes</h1>
						<div className='IniciarConsulta'>
							{havePrivilege(53) && (
								<button
									className='consultation-btn'
									onClick={() =>
										handleShowAgregarPacientePopUp(selectedPatient)
									}
								>
									Agregar Paciente
								</button>
							)}
						</div>
					</div>
					{havePrivilege(56) ? (
						<div className='card-container'>
							{nombres.map((nombre) => (
								<div key={nombre.id_account} className='card'>
									<div className='card-body'>
										<FontAwesomeIcon
											icon={faUserCircle}
											className='icon-persona'
										/>
										<h3 className='card-title'>{nombre.nombre}</h3>
										<div className='conteiner-card-text'>
											<h4 className='card-text'>
												{formatDate(nombre.creationDate)}
											</h4>
										</div>
										<div className='dropdown'>
											<button
												className='dropdown-botton'
												type='button'
												id={`dropdown-${nombre.id_account}`}
												data-toggle='dropdown'
												aria-haspopup='true'
												aria-expanded='false'
											>
												Acciones
											</button>

											<div
												className='dropdown-menu'
												aria-labelledby={`dropdown-${nombre.id_account}`}
											>
												{havePrivilege(61) && (
													<Link
														to='/citas'
														onClick={() =>
															handleClick(
																nombre.id_account,
																nombre.nombre,
																nombre.id_clinic
															)
														}
														className='dropdown-item'
													>
														Agendar Cita
													</Link>
												)}
												{havePrivilege(57) && (
													<Link
														to='/Expedientes'
														state={{
															id_file: nombre.id_account,
															userData: props.userData,
														}}
														onClick={() =>
															handleClick(
																nombre.id_account,
																nombre.nombre,
																nombre.id_clinic
															)
														}
														className='dropdown-item'
													>
														Ver Expediente
													</Link>
												)}
												{havePrivilege(66) && (
													<Link
														to='/Documentos'
														className='dropdown-item'
														state={{
															id_file: nombre.id_account,
															userData: props.userData,
														}}
													>
														Ver Documentos
													</Link>
												)}
												{/* <Link to="/Documento"
                                                  onClick={() => handleClick(nombre.id_account, nombre.nombre,
                                                      nombre.id_clinic)}
                                                  className="dropdown-item">Ver Documentos</Link> */}

												{/* =======
                                        <div className="dropdown-menu" aria-labelledby={`dropdown-${nombre.id_account}`}>
                                            <Link to="/citas" className="dropdown-item">Manejar Cita</Link>
                                            <Link to="/Expedientes" className="dropdown-item">Ver Expediente</Link>
                                            <Link to="/Documentos" className="dropdown-item" state={{id_file:nombre.id_account, userData:props.userData}}>Ver Documentos</Link>
                                             */}
												{/* >>>>>>> Axel-KL-Documents */}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div>
							<div className='flex justify-center items-center h-screen'>
								<p style={{color: 'red'}}>
									Ha ocurrido un error al cargar los pacientes, parece que no
									tienes los permisos necesarios.
								</p>
							</div>
						</div>
					)}

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
					{showCrearPacientePopup && (
						<CrearPaciente
							onClose={closeCrearPacientePopup}
							onSummit={addPacienteAndUpdateList}
							isOpen={showCrearPacientePopup}
						/>
					)}
					{showCrearPacientePopup && (
						<CrearPaciente
							onClose={() => setShowCrearPacientePopup(false)}
							onSummit={handleActionPopUp}
							isOpen={showCrearPacientePopup}
						/>
					)}
					{displayActionPopUp && (
						<PopUpAction
							isOpen={displayActionPopUp}
							actionType='Agregar'
							pageName='Paciente'
							itemName={selectedPatient.nombre}
							itemId={selectedPatient.numeroIdentidad}
							onCancel={() => setDisplayActionPopUp(false)}
							onConfirm={() => handleCrearPaciente()}
						/>
					)}
					{displayConfirmPopUp && (
						<PopUpActionConfirm
							isOpen={displayConfirmPopUp}
							actionType='Agregar'
							pageName='Paciente'
							itemName={selectedPatient.nombre}
							itemId={selectedPatient.numeroIdentidad}
							onConfirm={() => handleActionConfirm()}
						/>
					)}
				</div>
			</div>
		</PacientesLayout>
	);
}

export default PacientesForm;
