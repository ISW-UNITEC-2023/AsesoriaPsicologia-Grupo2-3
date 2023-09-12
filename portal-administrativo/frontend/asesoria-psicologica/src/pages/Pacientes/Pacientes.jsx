import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import Services from "../../../utils/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function PacientesForm() {
  const navigate = useNavigate();
  const [nombres, setNombres] = useState([]);

  async function initialList() {
    const arregloUsuarios = await Services.getUsers();
    const arregloMandar = [];

    /*arregloUsuarios.credentials.patientsCredentials.map((usuario) => {
      return arregloMandar.push({
        nombre: usuario.name,
        email: usuario.email,
      });
    });*/

    arregloUsuarios.credentials.usersCredentials.map((usuario) => {
      return arregloMandar.push({
        nombre: usuario.name,
        email: usuario.email,
      });
    });

    setNombres(arregloMandar);
  }

  useEffect(() => {
    initialList();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-pacientes">Pacientes</h1>
      </div>
      <ul>
        {nombres.map((nombre) => (
          <li key={nombre.email}>
            <Link to={"/expedientes"}>
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre">{nombre.nombre}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PacientesForm;
