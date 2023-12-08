import "../Styles/CSS/DashBoard.css";
import React, {useEffect, useRef, useState} from "react";
import Popup from "../Components/PopUp";
import NavigationB from "../Components/Navbar";
import SectionCard from "../Components/Card";
import {loadModules} from "../Utilities/course-services";
import {Button} from "react-bootstrap";
import DashboardLayout from "../Layout/DashboardLayout";
import {getVerify} from "../Utilities/user-services";
import {useNavigate} from "react-router-dom";

function DashBoard(props) {
    if (!props.userData.user_data) {
        const navigate = useNavigate();
        navigate("/InicioSesion");
        return null;
    }

    const [displayedModules, setModules] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [state, setState] = useState(false);
    const [selectedButtonInfo, setSelectedButtonInfo] = useState({});

    const updateModuleList = () => {
        async function fetchData() {
            const course = await loadModules();
            setModules(course.coursesInfo);
        }

        fetchData();
    };

    const verifyRef = useRef(null);
    const updatePrivileges = async () => {
        try {
            const data = await getVerify(props.userData.user_data.id_user);
            verifyRef.current = data;
        } catch (error) {
            console.error("Error updating privileges:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await updatePrivileges();
                await updateModuleList();
               
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout pagina="Dashboard">
            <div className="dashboard-container">
                <NavigationB key="navB" userData={props.userData}/>
                <div className="dashboard-box">
                    <div className="dashboard-header flex flex-col md:flex-row justify-between">
                        <h1 className="dashboard-titulo">Bienvenido !</h1>
                        <div className="dashboard-buttons flex flex-row gap-2 justify-end mb-2 lg:mb-0">
                            <Button
                                className="button-create"
                                onClick={() => setIsPopupOpen(true)}

                                variant={"outline-primary"}
                            >
                                Nueva clase
                            </Button>
                        </div>
                        <Popup
                            isOpen={isPopupOpen}
                            onClose={() => setIsPopupOpen(false)}
                            selectedButtonInfo={selectedButtonInfo}
                            onUpdateModuleList={updateModuleList}
                        />
                    </div>
                    <div className="dashboard-body" disabled>
                        <div className="information-container">
                            <p className="information">
                                Puede ver las secciones del curso dando click a "Entrar a Curso"
                                de cualquier tarjeta o dando click en el nombre del curso.
                            </p>

                            <br/>
                            <br/>
                            <div className="section-card-container flex flex-row flex-wrap gap-3 center">
                                {Array.isArray(displayedModules) ? (
                                    displayedModules.map((module) => (
                                        <SectionCard
                                            props={module}
                                            handleReload={() => setState(true)}
                                        />
                                    ))
                                ) : (
                                    <p>No hay módulos para mostrar</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DashBoard;
