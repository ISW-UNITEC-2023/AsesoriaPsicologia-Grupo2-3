import React, {useState} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import {Button} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import NavigationB from "../Components/Navbar";
import "../Styles/CSS/Session.css";
import "../Styles/CSS/PopIniciarConsulta.css";
import TableConsultas from "../Components/Citas/TableConsultas";

function Sesiones(props) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <div className="flex-grow flex flex-row items-center">
                <NavigationB/>
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
                    </div>
                    <div className="pop-iniciar-consulta-body">
                        <form className="pop-iniciar-consulta-form">
                            <label htmlFor="doctorName">Nombre del Médico:</label>
                            <input type="text" id="doctorName" placeholder="Ingrese nombre del médico"/>

                            <label htmlFor="consultaMotivo">Motivo de Consulta:</label>
                            <textarea id="consultaMotivo" rows={3} placeholder="Ingrese motivo de consulta"></textarea>

                            <label htmlFor="observaciones">Observaciones:</label>
                            <textarea id="observaciones" rows={3} placeholder="Ingrese observaciones"></textarea>

                            <label htmlFor="montoConsulta">Monto de Consulta:</label>
                            <input type="text" id="montoConsulta" placeholder="Ingrese monto de consulta"/>

                            <label htmlFor="ordenesMedicas">Órdenes Médicas:</label>
                            <textarea id="ordenesMedicas" rows={3} placeholder="Ingrese órdenes médicas"></textarea>
                        </form>
                    </div>
                    <div className="pop-iniciar-consulta-footer">
                        <button className="save-button" onClick={handleClose}>Guardar</button>
                    </div>
                    <button className="close-button" onClick={handleClose}>Cerrar</button>
                </div>
            </div>
        </>
    );
}

export default Sesiones;
