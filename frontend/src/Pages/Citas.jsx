import Navbar from "../Components/Navbar";
import TableConsultas from "../Components/Citas/TableConsultas";
import CitasLayout from "../Layout/CitasLayout";

export const Citas = () => {
    return (
        <CitasLayout pagina="Citas">
            <div className="w-auto min-h-screen flex flex-row">
                <Navbar/>
                <div className="flex-grow flex flex-col ">
                    <div className="px-0 md:px-20">
                        <TableConsultas/>
                    </div>
                </div>
            </div>
        </CitasLayout>
    )
}
