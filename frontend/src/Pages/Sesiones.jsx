import React, {useState} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import {Button} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {buttons} from 'react-bootstrap/Button';
import NavigationB from "../Components/Navbar";
import "../Styles/CSS/Session.css";
import "../Styles/CSS/PopIniciarConsulta.css";
import TableConsultas from "../Components/Citas/TableConsultas";

function Sesiones(props) {

    const [showModal, setShowModal] = useState(false);
    const [montoConsulta, setMontoConsulta] = useState('');
    const [montoError, setMontoError] = useState(false);
    const handleClose = () => {
        setShowModal(false);
    };
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
        };
    return (
        <>
            <div className="flex-grow flex flex-row items-center">
                <NavigationB userData={props.userData}/>
                <div className="flex-1 flex flex-col w-80">
                    <Row>
                        <Col className="flex flex-col items-center">
                            <h1 className="sesiones-title">Historial de Consulta</h1>
                            <div className="justify-between">
                            <Button
                                variant="filled"
                                size="sm"
                                className="custom-green-button mr-3 mt-2"
                                style={{backgroundColor: "green", borderColor: "green"}}
                                onClick={handleShow}
                            >
                                Iniciar consulta
                            </Button>
                            <Link to="/citas">
                                <Button
                                    variant="filled"
                                    size="sm"
                                    className="custom-green-button mr-3 mt-2"
                                    style={{backgroundColor: "black", borderColor: "black"}}
                                >
                                    Cita
                                </Button>
                            </Link>
                            </div>
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <TableConsultas page={"Sesiones"}/>
                    </div>
                </div>
            </div>

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
        </>
    );
}

export default Sesiones;