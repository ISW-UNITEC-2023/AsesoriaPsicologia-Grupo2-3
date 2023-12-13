import NavigationB from "../Components/Navbar";
import TableReportes from "../Components/Reportes/TableReportes";

const Reportes = (props) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <NavigationB key="navB" userData={props.userData}/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="px-4 py-8 flex flex-col items-center justify-center">
                        <TableReportes/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Reportes;
