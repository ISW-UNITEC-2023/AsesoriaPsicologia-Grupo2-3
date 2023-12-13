import NavigationBar from "../Components/Navbar";
import '../Styles/CSS/Chequeo.css';
import React, {useState} from "react";
import "../Styles/CSS/PopUpChequeo.css";
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
function Chequeo(props){
    const paymentMethods = {
        "1": "Efectivo",
        "2": "Transferencia",
        "3": "Tarjeta de Crédito",
        "4": "Tarjeta de Débito"
    };
    
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [tempSelectedPayment, setTempSelectedPayment] = useState('');

    const handleShow = () => setShowModal(true);
    
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSelectChange = (event) => {
        setTempSelectedPayment(event.target.value);
    };

    const handleAddPayment = () => {
        setSelectedPayment(paymentMethods[tempSelectedPayment]);
        handleClose();
        console.log('Método de pago:', paymentMethods[tempSelectedPayment]);
    };
    
    return (
<div className="style-db-container">
    <NavigationBar userData={props.userData} />
    <div style={{width: "90%"}}>
            <div className="style-chequeo-header">
                <h1 className="style-chequeo-title" style={{ width: "400%" }}>
            Chequeo
                </h1>
                <Link to="/Estadisticas">
                <buttons className="button-estadisticas-reportes">Ver Estadísticas y Reportes</buttons>
                </Link>
            </div>
            <div class="table-container">
    <table class="custom-table">
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
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>Lps.</td>
                <td>
                <buttons  onClick={handleShow} className="button-metodo-pago">Asignar Método de Pago</buttons>
                </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Lps.</td>
                <td>
                <buttons onClick={handleShow} className="button-metodo-pago">Asignar Método de Pago</buttons>
                </td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>Lps.</td>
                <td>
                <buttons  onClick={handleShow} className="button-metodo-pago">Asignar Método de Pago</buttons>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div className={`pop-metodo-pago  ${showModal ? 'show' : ''}`}>
                <div className="pop-metodo-pago-content">
                    <div className="pop-metodo-pago-header">
                    <h1>Asignar método de pago a</h1>
                        <div className="consulta-text">
                        <h1>Consulta__</h1>
                        </div>
                    </div>
                    <div className="pop-metodo-pago-body">
                    <Form.Select aria-label="Default select example" onChange={handleSelectChange} value={tempSelectedPayment}>
                                            <option value="" disabled hidden>Método de Pago</option>
                                            <option value="1"> Efectivo </option>
                                            <option value="2"> Transferencia </option>
                                            <option value="3"> Tarjeta de Crédito </option>
                                            <option value="4"> Tarjeta de Débito </option>
                                        </Form.Select>
                    </div>
                    <div className="pop-metodo-pago-footer">
                        <buttons className="button-close-metodo" onClick={handleClose}>Cancelar</buttons>
                        <buttons className="button-agregar-metodo-pago" onClick={handleAddPayment}>Agregar método de Pago</buttons>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default Chequeo;