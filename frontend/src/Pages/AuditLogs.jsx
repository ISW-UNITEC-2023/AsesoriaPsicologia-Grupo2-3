import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import "../Styles/CSS/AuditLogs.css";

const datosAPI = [
    { Fecha_Hora: "2022-11-25 22:30", ID: 1, Usuario: "Pancho", Accion: 'AGREGAR', Tabla: "20", Valor_anterior: "11", Valor_actualizado: "13", Comentarios: "..." },
    { Fecha_Hora: "2022-12-21 17:45", ID: 2, Usuario: "Lucas", Accion: 'ELIMINAR', Tabla: "7", Valor_anterior: "231", Valor_actualizado: "0", Comentarios: "..." },
    { Fecha_Hora: "2022-12-25 08:00", ID: 3, Usuario: "Sancho", Accion: 'ACTUALIZAR', Tabla: "50", Valor_anterior: "243211", Valor_actualizado: "10124", Comentarios: "..." },
    { Fecha_Hora: "2023-1-03 21:30", ID: 4, Usuario: "Juan", Accion: 'ACTUALIZAR', Tabla: "8", Valor_anterior: "242", Valor_actualizado: "1214", Comentarios: "..." },
    { Fecha_Hora: "2023-2-09 19:30", ID: 5, Usuario: "Luis", Accion: 'ELIMINAR', Tabla: "28", Valor_anterior: "25125", Valor_actualizado: "5442", Comentarios: "..." },
    { Fecha_Hora: "2023-3-11 10:30", ID: 6, Usuario: "Alejandro", Accion: 'AGREGAR', Tabla: "47", Valor_anterior: "235", Valor_actualizado: "6345", Comentarios: "..." },
    { Fecha_Hora: "2023-3-11 14:10", ID: 7, Usuario: "Jose", Accion: 'AGREGAR', Tabla: "65", Valor_anterior: "31314", Valor_actualizado: "463", Comentarios: "..." },
    { Fecha_Hora: "2023-3-25 22:30", ID: 8, Usuario: "Carlos", Accion: 'ELIMNAR', Tabla: "101", Valor_anterior: "53462", Valor_actualizado: "6363", Comentarios: "..." },
    { Fecha_Hora: "2023-4-29 20:30", ID: 9, Usuario: "Marcos", Accion: 'AGREGAR', Tabla: "11", Valor_anterior: "2352", Valor_actualizado: "753", Comentarios: "..." },
    { Fecha_Hora: "2023-5-5 07:30", ID: 10, Usuario: "Diego", Accion: 'ACTUALIZAR', Tabla: "78", Valor_anterior: "123414", Valor_actualizado: "64232", Comentarios: "..." },
];

const AuditLogs = () => {
    const [datos, setDatos] = useState([]);
    const [campoFiltrado, setCampoFiltrado] = useState('Fecha_Hora');
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        //Backend
        setDatos(datosAPI);
    }, []);

    const handleInputChange = (id, columna, valor) => {
        const nuevosDatos = datos.map((dato) =>
            dato.ID === id ? { ...dato, [columna]: valor } : dato
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
        <div id="audit_logs" style={{ width: "90%" }}>
            <div className="container-header">
                <h1 className="title-historial" style={{ width: "400%" }}>
                    Historial Administrativo
                </h1>
            </div>
            <Form>
                <Form.Group id="audit_logs_campo_filtrado" controlId="campoFiltrado">
                    <Form.Label>Filtrar por:</Form.Label>
                    <Form.Control as="select" value={campoFiltrado} onChange={handleCampoFiltradoChange}>
                        <option value="Fecha_Hora">Fecha y Hora</option>
                        <option value="Usuario">Usuario</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group id="audit_logs_valor_filtrado" controlId="filtro">
                    <Form.Label>Valor de Filtro:</Form.Label>
                    <Form.Control
                        type="text"
                        value={filtro}
                        onChange={handleFiltroChange}
                        placeholder={`Filtrar por ${campoFiltrado}`}
                    />
                </Form.Group>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Table striped bordered hover style={{ border: '2px solid black' }}>
                    <thead style={{ background: 'lightgreen' }}>
                        <tr>
                            <th style={{ border: '2px solid black' }}>Fecha y Hora</th>
                            <th style={{ border: '2px solid black' }}>ID</th>
                            <th style={{ border: '2px solid black' }}>Usuario</th>
                            <th style={{ border: '2px solid black' }}>Accion</th>
                            <th style={{ border: '2px solid black' }}>Tabla</th>
                            <th style={{ border: '2px solid black' }}>Valor anterior</th>
                            <th style={{ border: '2px solid black' }}>Valor actualizado</th>
                            <th style={{ border: '2px solid black' }}>Comentarios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosFiltrados.map((dato) => (
                            <tr key={dato.ID}>
                                <td style={{ border: '2px solid black' }}>{dato.Fecha_Hora}</td>
                                <td style={{ border: '2px solid black' }}>{dato.ID}</td>
                                <td style={{ border: '2px solid black' }}>{dato.Usuario}</td>
                                <td style={{ border: '2px solid black' }}>{dato.Accion}</td>
                                <td style={{ border: '2px solid black' }}>{dato.Tabla}</td>
                                <td style={{ border: '2px solid black' }}>{dato.Valor_anterior}</td>
                                <td style={{ border: '2px solid black' }}>{dato.Valor_actualizado}</td>
                                <td style={{ border: '2px solid black' }}>
                                    <input
                                        id="audit_logs_comentarios"
                                        type="text"
                                        value={dato.Comentarios}
                                        onChange={(e) => handleInputChange(dato.ID, 'Comentarios', e.target.value)}
                                        style={{ width: '87%' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AuditLogs;