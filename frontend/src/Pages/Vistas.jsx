import { Col, Container, Row } from "react-bootstrap";
import "../Styles/CSS/Vistas.css";
import tempImage from "../Styles/Images/Encabezado.png";
import html2pdf from "html2pdf.js";
import { Input } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { getVerify } from "../Utilities/user-services";
import { getFileById } from "../Utilities/files-services";
import {
	Typography,
} from "@material-tailwind/react";

function havePrivilege(userPrivilege, privilege) {
	const isAuthorized = userPrivilege && userPrivilege.privileges && privilege.some((privilege) =>
		userPrivilege.privileges.includes(privilege)
	);
	return isAuthorized;
}

function Vistas(props) {
	//Privilegios del usuario logueado
	const verifyRef = useRef(null);
	const updatePrivileges = async () => {
		try {
			const data = await getVerify(props.userData.user_data.id_user);
			verifyRef.current = data;
		} catch (error) {
			console.error("Error updating privileges:", error);
		}
	};

	useEffect(() => {
		async function update() {
			await updatePrivileges();
		}
		update();
	}, []);


	const navigate = useNavigate();
	const { id_file, user_data } = useLocation().state;
	const containerRef = useRef(null);
	const [patientInfo, setPatientInfo] = useState({
		nombre: "",
		fechaNacimiento: "",
		correo: "",
		identidad: "",
		numeroTelefono: "",
		direccion: "",
		estadoCivil: "",
		motivo: "",
		observaciones: "",
		ordenesMedicas: "",
	});

	useEffect(() => {
		try {
			getFileById(id_file).then((response) => {
				const data = response.fileInfo[0];

				const nombreCompleto = `${data.first_name} ${data.middle_name} ${data.last_name} ${data.second_surname}`;
				setPatientInfo({
					nombre: nombreCompleto,
					fechaNacimiento: data.birthdate,
					correo: data.email,
					identidad: data.identidad,
					numeroTelefono: data.phone_number,
					direccion: data.address,
					estadoCivil: data.civil_status,
					observaciones: data.observation,
					ordenesMedicas: data.substance_usage,
				});
			});
		} catch (error) {
			console.log(error);
		}
	}, [id_file]);

	const downloadPDF = () => {
		if (!containerRef.current) {
			return;
		}

		const pdfOptions = {
			margin: 10,
			filename: "Expediente.pdf",
			image: { type: "png", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		};

		const content = containerRef.current;

		html2pdf()
			.from(content)
			.set(pdfOptions)
			.outputPdf((pdf) => {
				pdf.save();
			});
	};

	const formatDate = (announceDate) => {
		const date = new Date(announceDate);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleString("es-ES", options);
	};

	return (
		<div className='page-container'>
			{
				havePrivilege(verifyRef.current, [57]) ?
					<Container id='pdf-container' ref={containerRef}>
						<img src={tempImage} alt='Encabezado' className='encabezado-image' />
						<div className='Titulo'>
							<h1>Información del Paciente</h1>
							<p>Detalles importantes sobre el paciente</p>
						</div>
						<Row>
							<Col md={12}>
								<table className='patient-info-table'>
									<tbody>
										<tr>
											<td className='left-column'>Nombre:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Nombre'
													value={patientInfo.nombre}
													readOnly
												/>
											</td>
										</tr>
										<tr>
											<td className='left-column'>Fecha de Nacimiento:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Fecha de Nacimiento'
													value={formatDate(patientInfo.fechaNacimiento)}
													readOnly
												/>
											</td>
										</tr>
										<tr>
											<td className='left-column'>Correo Eléctronico:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Correo Eléctronico'
													value={patientInfo.correo}
													readOnly
												/>
											</td>
										</tr>
										<tr>
											<td className='left-column'>Identidad:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Identidad'
													value={patientInfo.identidad}
													readOnly
												/>
											</td>
										</tr>
										<tr>
											<td className='left-column'>Número de Teléfono:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Número de Teléfono'
													value={patientInfo.numeroTelefono}
													readOnly
												/>
											</td>
										</tr>
										<tr>
											<td className='left-column'>Dirección:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Direccion'
													value={patientInfo.direccion}
													readOnly
												/>
											</td>
										</tr>
										<tr>
											<td className='left-column'>Estado Civil:</td>
											<td className='right-column'>
												<input
													type='text'
													className='form-control'
													placeholder='Estado Civil'
													value={patientInfo.estadoCivil}
													readOnly
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<p className='paragraph-margin'>
									Observaciones:{" "}
									{
										<textarea
											className='form-ordenes-medicas'
											placeholder='Observaciones'
											value={patientInfo.observaciones}
											onChange={(e) =>
												setPatientInfo({
													...patientInfo,
													observaciones: e.target.value,
												})
											}
										/>
									}
								</p>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<p className='paragraph-margin'>
									Órdenes Médicas:{" "}
									{
										<Input
											type='text'
											size='sm'
											variant='standard'
											color='blue-gray'
											placeholder='Órdenes Médicas'
											value={patientInfo.ordenesMedicas}
											onChange={(e) =>
												setPatientInfo({
													...patientInfo,
													ordenesMedicas: e.target.value,
												})
											}
										/>
									}
								</p>
							</Col>
						</Row>
					</Container>
					:
					<Container>
						<Typography
							variant="h6"
							color="blue-gray"
							className="flex justify-center font-normal"
						>
							Ha ocurrido un error al cargar las citas, no tienes los permisos necesarios.
						</Typography>

					</Container>
			}
			<div className='fixed-buttons-container'>
				{
					havePrivilege(verifyRef.current, [57]) &&
					<button
						className='btn btn-primary fixed-download-button'
						onClick={downloadPDF}
					>
						Descargar PDF
					</button>
				}
				<button
					className='btn btn-secondary fixed-back-button'
					onClick={() => navigate(-1)}
				>
					Volver
				</button>
			</div>
		</div>
	);
}

export default Vistas;
