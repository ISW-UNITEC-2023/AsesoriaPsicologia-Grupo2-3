import React, { useState, useEffect } from "react";
import {
  getChequeo,
  updatePaymentType,
} from "../Utilities/appointment-services.js";
import NavigationBar from "../Components/Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

import "../Styles/CSS/Chequeo.css";
import "../Styles/CSS/PopUpChequeo.css";

function Chequeo(props) {
  function havePrivilege(privilege) {
    if (privilege) {
      return props.verifyRef.current.privileges.includes(privilege);
    } else {
      return false;
    }
  }

  const paymentMethods = {
    1: "Efectivo",
    2: "Transferencia",
    3: "Tarjeta de Crédito",
    4: "Tarjeta de Débito",
  };

  const Modal = ({ showModal, handleClose, consultaSeleccionada }) => (
    <div className={`pop-metodo-pago ${showModal ? "show" : ""}`}>
      <div className="pop-metodo-pago-content">
        <div className="pop-metodo-pago-header">
          <h1>Asignar método de pago a</h1>
          <div className="consulta-text">
            <h1>{`Consulta ${consultaSeleccionada ? consultaSeleccionada.id_appointment : ""
              }`}</h1>
          </div>
        </div>
        <div className="pop-metodo-pago-body">
          <Form.Select
            aria-label="Default select example"
            onChange={handleSelectChange}
            value={tempSelectedPayment}
          >
            <option value="" disabled hidden>
              Método de Pago
            </option>
            <option value="1"> Efectivo </option>
            <option value="2"> Transferencia </option>
            <option value="3"> Tarjeta de Crédito </option>
            <option value="4"> Tarjeta de Débito </option>
          </Form.Select>
        </div>
        <div className="pop-metodo-pago-footer">
          <button className="button-close-metodo" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="button-agregar-metodo-pago"
            onClick={() => handleAddPayment(consultaSeleccionada)}
          >
            {" "}
            Agregar método de Pago
          </button>
        </div>
        {paymentError && (
          <div className="error-message">
            Por favor, seleccione un método de pago antes de continuar.
          </div>
        )}
      </div>
    </div>
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [tempSelectedPayment, setTempSelectedPayment] = useState("");
  const [consultations, setConsultations] = useState([]);
  const [paymentError, setPaymentError] = useState(false);
  const fetchData = async () => {
    //const idClinic = props.userData.user_data.id_clinic; //obtener la informacion de la clinica
    const idClinic = "8"; // Estático para probar
    try {
      const data = await getChequeo(idClinic);
      setConsultations(data.AppInfo);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleShow = (consulta) => {
    setSelectedConsulta(consulta);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedConsulta(null);
  };

  const handleSelectChange = (event) => {
    setTempSelectedPayment(event.target.value);
  };

  const handleAddPayment = async (consultaSeleccionada) => {
    if (tempSelectedPayment === "") {
      setPaymentError(true);
      return;
    }
    handleClose();

    try {
      await updatePaymentType(
        tempSelectedPayment,
        consultaSeleccionada.id_appointment,
        props.userData.user_data.id_user,
        consultaSeleccionada.id_clinic,
        consultaSeleccionada.id_doctor,
        consultaSeleccionada.id_file
      );
      setPaymentError(false);
      fetchData();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="style-db-container">
      <NavigationBar userData={props.userData} />
      <div style={{ width: "90%" }}>
        <div className="style-chequeo-header">
          <h1 className="style-chequeo-title" style={{ width: "200%" }}>
            Chequeo
          </h1>
          {
            havePrivilege(71) &&
            <Link to="/Reportes">
              <button className="button-reporte">Reportes</button>
            </Link>
          }
          {
            havePrivilege(71) &&
            <Link to="/Estadisticas">
              <button className="button-estadistica">Estadísticas</button>
            </Link>
          }
        </div>
        {
          havePrivilege(71) ?
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th scope="col">ID Consulta</th>
                    <th scope="col">Doctor Responsable</th>
                    <th scope="col">Paciente</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Método de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations ? (
                    consultations.map((consulta) => (
                      <tr key={consulta.id_appointment}>
                        <td>{consulta.id_appointment}</td>
                        <td>{consulta.doctor_name}</td>
                        <td>{`${consulta.first_name} ${consulta.middle_name} ${consulta.last_name} ${consulta.second_surname}`}</td>
                        <td>{consulta.payment_amount}</td>
                        <td>
                          {
                            havePrivilege(76) ?
                              <button
                                onClick={() => handleShow(consulta)}
                                className="button-metodo-pago"
                              >
                                Asignar Método de Pago
                              </button>
                              :
                              <span style={{ color: 'red' }}>
                                No puedes asignar un metodo de pago debido a que no tienes los permisos necesarios.
                              </span>
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No hay datos disponibles</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            :
            <span className="pagination-text" style={{ color: 'red' }}>
              No se muestran los registros de chequeos debido a que no tienes los permisos necesarios.
            </span>
        }
      </div>
      <Modal
        showModal={showModal}
        handleClose={handleClose}
        consultaSeleccionada={selectedConsulta}
      />
    </div>
  );
}

export default Chequeo;
