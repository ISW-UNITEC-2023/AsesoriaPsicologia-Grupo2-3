import React, {useEffect, useState} from 'react';
import {Form, Table} from 'react-bootstrap';
import "../Styles/CSS/AuditLogs.css";
import Services from "../Utilities/actions-services";
import Navbar from "../Components/Navbar";
import {useNavigate} from "react-router-dom";

function AuditLogs(props) {
    console.log(props.userData.user_data)
    if (!props.userData.user_data) {
        const navigate = useNavigate();
        navigate("/InicioSesion");
        return null;
    }
    const [datos, setDatos] = useState([]);
    const [campoFiltrado, setCampoFiltrado] = useState('Fecha_Hora');
    const [filtro, setFiltro] = useState('');

    async function initialList() {
        const arregloActions = await Services.getActions();
        const arregloMandar = [];

        arregloActions.map((action) => {
            let fecha = new Date(action.datetime_action);
            let fechaFormateada = fecha.toLocaleString();

            let accionFormeatada = "";
            if (action.type_action === "CREACION")
                accionFormeatada = "CREACIÓN";
            else if (action.type_action === "MODIFICACION")
                accionFormeatada = "MODIFICACIÓN";

            return arregloMandar.push({
                Fecha_Hora: fechaFormateada,
                ID: action.idactions,
                Usuario: action.user_name,
                Accion: accionFormeatada,
                Tabla: action.table_action,
                Info_Accion: action.info_action,
            })
        })

        setDatos(arregloMandar);
    }

    useEffect(() => {
        initialList();
    }, []);

    const handleInputChange = (id, columna, valor) => {
        const nuevosDatos = datos.map((dato) =>
            dato.ID === id ? {...dato, [columna]: valor} : dato
        );
        setDatos(nuevosDatos);
    };

    const handleCampoFiltradoChange = (e) => {
        setCampoFiltrado(e.target.value);
        setFiltro(''); // Reinicia el filtro al cambiar la columna
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const datosFiltrados = datos.filter((dato) =>
        dato[campoFiltrado].toString().toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="dashboard-container">

            <Navbar key="navB" userData={props.userData}/>
            <div style={{width: "90%"}}>
                <div className="container-header">
                    <h1 className="title-historial" style={{width: "400%"}}>
                        Historial Administrativo
                    </h1>
                </div>
                <div className="container-flitros">

                    <Form style={{display: "flex", flexdirection: "row"}}>
                        <Form.Group controlId="campoFiltrado" style={{marginRight: "30px"}}>
                            <Form.Label>Filtrar por:</Form.Label>
                            <Form.Control as="select" value={campoFiltrado} onChange={handleCampoFiltradoChange}>
                                <option value="Fecha_Hora">Fecha y Hora</option>
                                <option value="Usuario">Usuario</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="filtro">
                            <Form.Label>Valor de Filtro:</Form.Label>
                            <Form.Control
                                type="text"
                                value={filtro}
                                onChange={handleFiltroChange}
                                placeholder={`Filtrar por ${campoFiltrado}`}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div className="container-table ">
                    <Table striped bordered hover style={{border: '2px solid black'}}>
                        <thead style={{background: 'lightgreen'}}>
                        <tr>
                            <th style={{border: '2px solid black'}}>Fecha y Hora</th>
                            <th style={{border: '2px solid black'}}>ID</th>
                            <th style={{border: '2px solid black'}}>Usuario</th>
                            <th style={{border: '2px solid black'}}>Acción</th>
                            <th style={{border: '2px solid black'}}>Tabla</th>
                            <th style={{border: '2px solid black'}}>Info de Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        {datosFiltrados.map((dato) => (
                            <tr key={dato.ID}>
                                <td style={{border: '2px solid black'}}>{dato.Fecha_Hora}</td>
                                <td style={{border: '2px solid black'}}>{dato.ID}</td>
                                <td style={{border: '2px solid black'}}>{dato.Usuario}</td>
                                <td style={{border: '2px solid black'}}>{dato.Accion}</td>
                                <td style={{border: '2px solid black'}}>{dato.Tabla}</td>
                                <td style={{border: '2px solid black'}}>{dato.Info_Accion}</td>

                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default AuditLogs;