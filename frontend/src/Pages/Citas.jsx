import Navbar from "../Components/Navbar";
import TableConsultas from "../Components/Citas/TableConsultas";
import CitasLayout from "../Layout/CitasLayout";

export const Citas = (props) => {

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
