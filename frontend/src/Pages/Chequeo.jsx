import NavigationBar from "../Components/Navbar";
import '../Styles/CSS/Chequeo.css';

function Chequeo(props){
    return (
<div className="style-db-container">
    <NavigationBar userData={props.userData} />
    <div style={{width: "90%"}}>
            <div className="style-chequeo-header">
                <h1 className="style-chequeo-title" style={{ width: "400%" }}>
            Chequeo
                </h1>
                <buttons className="button-estadisticas-reportes">Ver Estadísticas y Reportes</buttons>
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
                <buttons className="button-metodo-pago">Asignar Método de Pago</buttons>
                </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Lps.</td>
                <td>
                <buttons className="button-metodo-pago">Asignar Método de Pago</buttons>
                </td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>Lps.</td>
                <td>
                <buttons className="button-metodo-pago">Asignar Método de Pago</buttons>
                </td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    </div>
    );
};
export default Chequeo;