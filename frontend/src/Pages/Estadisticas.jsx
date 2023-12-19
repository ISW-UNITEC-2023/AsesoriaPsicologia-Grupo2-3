import NavigationB from "../Components/Navbar";
import StatsSection from "../Components/Estadisticas/StatsSection";
import ChartBarSalesM from "../Components/Estadisticas/ChartBarSalesM";
import ChartBarSalesW from "../Components/Estadisticas/ChartBarSalesW";

export default function Estadisticas(props) {
    return (
        <div className="flex h-screen bg-gray-100">
            <NavigationB key="navB" userData={props.userData}/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="px-4 py-8 flex flex-col items-center justify-center">
                        <StatsSection page={"Estadisticas"}/>
                        <h2 className="text-xl font-bold mb-4" style={{color: "#26586c"}}>Gráficas de ingresos:</h2>
                        <div className="w-full max-w-screen-lg mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ChartBarSalesM className="w-auto h-auto"/>
                                <ChartBarSalesW className="w-auto h-auto"/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
