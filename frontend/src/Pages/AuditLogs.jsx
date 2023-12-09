import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import "../Styles/CSS/AuditLogs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Services from "../Utilities/actions-services";
import Navbar from "../Components/Navbar";

function AuditLogs(props) {
  const [datos, setDatos] = useState([]);
  const [campoFiltrado, setCampoFiltrado] = useState("Fecha_Hora");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    async function initialList() {
      const arregloActions = await Services.getActions();
      const arregloMandar = [];

      arregloActions.map((action) => {
        let fecha = new Date(action.datetime_action);
        let fechaFormateada = fecha.toLocaleString();

        let accionFormeatada = "";
        if (action.type_action === "CREACION") accionFormeatada = "CREACIÓN";
        else if (action.type_action === "MODIFICACION")
          accionFormeatada = "MODIFICACIÓN";

        return arregloMandar.push({
          Fecha_Hora: fechaFormateada,
          ID: action.idactions,
          Usuario: action.user_name,
          Accion: accionFormeatada,
          Tabla: action.table_action,
          Info_Accion: action.info_action,
        });
      });

      setDatos(arregloMandar);
    }
    initialList();
  }, []);

  const handleInputChange = (id, columna, valor) => {
    const nuevosDatos = datos.map((dato) =>
      dato.ID === id ? { ...dato, [columna]: valor } : dato
    );
    setDatos(nuevosDatos);
  };

  const handleCampoFiltradoChange = (e) => {
    setCampoFiltrado(e.target.value);
    setFiltro(""); // Reinicia el filtro al cambiar la columna
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const datosFiltrados = datos.filter((dato) =>
    dato[campoFiltrado].toString().toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="historial-container">
      <Navbar userData={props.userData} />
      <div className="historial-box">
        <div className="historial-header">
          <h1 className="historial-title" style={{ width: "400%" }}>
            Historial Administrativo
          </h1>
          {/* <div className="container-flitros">
            <Form style={{ display: "flex", flexdirection: "row" }}>
              <Form.Group
                controlId="campoFiltrado"
                style={{ marginRight: "30px" }}
              >
                <Form.Label>Filtrar por:</Form.Label>
                <Form.Control
                  as="select"
                  value={campoFiltrado}
                  onChange={handleCampoFiltradoChange}
                >
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
          </div> */}
        </div>
        <table className="table table-bordered historial-table">
          <thead className="historial-table-header">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Tabla</th>
              <th>Info de Acción</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.length > 0 &&
              datosFiltrados.map((dato) => (
                <tr className="row-table-historial" key={dato.ID}>
                  <td className="td-items-historial">{dato.ID}</td>
                  <td className="td-items-historial">{dato.Usuario}</td>
                  <td className="td-items-historial">{dato.Accion}</td>
                  <td className="td-items-historial">{dato.Tabla}</td>
                  <td className="td-info-accion">{dato.Info_Accion}</td>
                  <td className="td-items-historial">{dato.Fecha_Hora}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditLogs;
