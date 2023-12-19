import React, {useEffect, useState} from "react";
import "../Styles/CSS/Pacientes.css";
import {Link} from "react-router-dom";
import Services from "../Utilities/login-services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import EditarUser from "../Components/PopUp_EditarUser";
import CrearUser from "../Components/PopUp_CrearUser";
import CrearPaciente from "../Components/CrearPaciente/PopUp_CrearPaciente";
import NavigationB from "../Components/Navbar";
import PacientesLayout from "../Layout/PacientesLayout";
import axios from "axios";
import {toast} from "react-toastify";
import useSWR from "swr";
import user_services from "../Utilities/user-services";
import {Spinner} from "@material-tailwind/react";
import PopUpAction from "../Components/MultifunctionalPopUps/PopUpAction";
import PopUpActionConfirm from "../Components/MultifunctionalPopUps/PopUpActionConfirm";
import patientsService from "../Utilities/patients-services";

function PacientesForm(props) {
	const host = process.env.REACT_APP_API_URL;
	const [nombres, setNombres] = useState([]);
	const [showCrearPopup, setShowCrearPopup] = useState(false);
	const [showEditarPopup, setShowEditarPopup] = useState(false);
	const [showCrearPacientePopup, setShowCrearPacientePopup] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const {
		data: fetchedUsers,
		error: usersError,
		isLoading: usersLoading,
	} = useSWR(host+"/users/viewUsers", user_services.getUsers);
	const {
		data: fetchedRoles,
		error: rolesError,
		isLoading: rolesLoading,
	} = useSWR(
		host+"/roles/viewAll",
		user_services.getAllUsersRoles
	);

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
			const result = await patientsService.CreatePatient(
				selectedPatient.nombre,
				"---",
				"---",
				"---",
				selectedPatient.fechaNacimiento,
				"prueba@gmail.com",
				"0",
				selectedPatient.direccion,
				selectedPatient.estadoCivil,
				"0",
				"---",
				"---",
				"---"
			);
	
			if (result.message) {
				console.log(result.message);
				console.error("Error al crear el paciente:", result.message);
			} else {
				console.log("Paciente creado con éxito:", result);
				setDisplayConfirmPopUp(true);
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

		arregloUsuarios.map((usuario) => {
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
			<div className="flex justify-center items-center h-screen">
				<Spinner />
			</div>
		);
	}

	if (usersError || rolesError) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Ha ocurrido un error al cargar los usuarios</p>
			</div>
		);
	}

	const usersWithRoles = fetchedUsers.map((user) => {
		const userRoles = fetchedRoles
			.filter((role) => user.id_user === role.id_user)
			.map((role) => [role.id_role, role.name_role]);
		return { ...user, roles: userRoles };
	});

	return (
		<PacientesLayout pagina="Pacientes">
			<div className="navbar2">
				<NavigationB />

				<div className="pacientes-container">
					<div className="pacientes-header">
						<h1 className="title-pacientes2">Pacientes</h1>
						<div className="IniciarConsulta">
							<button
								className="consultation-btn"
								onClick={() => handleShowAgregarPacientePopUp(selectedPatient)}
							>
								Agregar Paciente
							</button>
						</div>
					</div>
					<div className="card-container">
						{nombres.map((nombre) => (
							<div key={nombre.id_account} className="card">
								<div className="card-body">
									<FontAwesomeIcon
										icon={faUserCircle}
										className="icon-persona"
									/>
									<h3 className="card-title">{nombre.nombre}</h3>
									<div className="conteiner-card-text">
										<h4 className="card-text">
											{formatDate(nombre.creationDate)}
										</h4>
									</div>
									<div className="dropdown">
										<button
											className="dropdown-botton"
											type="button"
											id={`dropdown-${nombre.id_account}`}
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											Acciones
										</button>

										<div
											className="dropdown-menu"
											aria-labelledby={`dropdown-${nombre.id_account}`}
										>
											<Link
												to="/citas"
												onClick={() =>
													handleClick(
														nombre.id_account,
														nombre.nombre,
														nombre.id_clinic
													)
												}
												className="dropdown-item"
											>
												Agendar Cita
											</Link>
											<Link
												to="/Expedientes"
												onClick={() =>
													handleClick(
														nombre.id_account,
														nombre.nombre,
														nombre.id_clinic
													)
												}
												className="dropdown-item"
											>
												Ver Expediente
											</Link>
											<Link
												to="/Documentos"
												className="dropdown-item"
												state={{
													id_file: nombre.id_account,
													userData: props.userData,
												}}
											>
												Ver Documentos
											</Link>
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
							actionType="Agregar"
							pageName="Paciente"
							itemName={selectedPatient.nombre}
							itemId={selectedPatient.numeroIdentidad}
							onCancel={() => setDisplayActionPopUp(false)}
							onConfirm={() => handleCrearPaciente()}
						/>
					)}
					{displayConfirmPopUp && (
						<PopUpActionConfirm
							isOpen={displayConfirmPopUp}
							actionType="Agregar"
							pageName="Paciente"
							itemName={selectedPatient.nombre}
							itemId={selectedPatient.numeroIdentidad}
							onConfirm={() => handleActionConfirm(false)}
						/>
					)}
				</div>
			</div>
		</PacientesLayout>
	);
}

export default PacientesForm;


