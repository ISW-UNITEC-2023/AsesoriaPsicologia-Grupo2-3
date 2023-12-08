import Navbar from "../Components/Navbar";
import TableConsultas from "../Components/Citas/TableConsultas";
import CitasLayout from "../Layout/CitasLayout";
import {useNavigate} from "react-router-dom";

export const Citas = (props) => {
    if (!props.userData.user_data) {
        const navigate = useNavigate();
        navigate("/InicioSesion");
        return null;
    }
    return (
        <CitasLayout pagina="Citas">
            <div className="w-auto min-h-screen flex flex-row">
                <Navbar userData={props.userData}/>
                <div className="flex-grow flex flex-col ">
                    <div className="px-0 md:px-20">
                        <TableConsultas page={"Cita"}/>
                    </div>
                </div>
            </div>
        </CitasLayout>
    )
}
