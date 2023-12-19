import "../Styles/CSS/DashBoard.css";
import {useEffect, useState} from "react";
import NavigationB from "../Components/Navbar";
import {loadModules} from "../Utilities/course-services";
import DashboardLayout from "../Layout/DashboardLayout";
import ChartBarSalesM from "../Components/Estadisticas/ChartBarSalesM"
import StatsSection from "../Components/Estadisticas/StatsSection"


function DashBoard(props) {
    const [displayedModules, setModules] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [state, setState] = useState(false);
    const [selectedButtonInfo, setSelectedButtonInfo] = useState({});
    const [cookies, setCookies] = useState({});
    const [cookiesLoaded, setCookiesLoaded] = useState(false);
    const nameUser = localStorage.getItem("name_user")
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        updateModuleList();
    }, []);
    const updateModuleList = () => {
        async function fetchData() {
            const course = await loadModules();
            setModules(course.coursesInfo);
        }

        fetchData().then(r => r);

    };

    return (
        <DashboardLayout id="dashboard" pagina="Dashboard">
            <div className="dashboard-container">
                <NavigationB userData={props.userData}/>
                <div className="dashboard-box">
                    <div className="dashboard-header flex flex-col md:flex-row justify-between">
                        <h1 className="dashboard-titulo">{`Bienvenido ${nameUser}`}</h1>
                    </div>

                    <div className="information-container">
                        <div className="information">

                        </div>

                    </div>
                    <div className="quick-access-text mb-4">Vista Rapida</div>
                    <div className="w-full max-w-screen-lg mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-ju">
                            <ChartBarSalesM className="w-auto h-auto"/>
                            <StatsSection page={"Dash"}/>
                        </div>
                    </div>
                </div>

            </div>

        </DashboardLayout>
    );
}

export default DashBoard;
