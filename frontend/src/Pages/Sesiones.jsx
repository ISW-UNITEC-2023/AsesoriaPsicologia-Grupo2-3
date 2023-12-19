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

    const handleShow = () => setShowModal(true);
   
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

        </>
    );
}

export default Sesiones;