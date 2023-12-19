import "../Styles/CSS/DashBoard.css";
import { useEffect, useState } from "react";
import NavigationB from "../Components/Navbar";

import { loadModules } from "../Utilities/course-services";
import { Button, Accordion } from "react-bootstrap";
import DashboardLayout from "../Layout/DashboardLayout";
import ChartBarSalesM from "../Components/Estadisticas/ChartBarSalesM"
import StatsSection from "../Components/Estadisticas/StatsSection"
import { Select, Option } from "@material-tailwind/react";
import Services from "../Utilities/login-services";
import { useNavigate } from "react-router-dom";


function DashBoard(props) {
  const [displayedModules, setModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [state, setState] = useState(false);
  const [selectedButtonInfo, setSelectedButtonInfo] = useState({});
  const [cookies, setCookies] = useState({});
  const [selectedName,setSelectedName]=useState(null)
  const [cookiesLoaded, setCookiesLoaded] = useState(false);
  const nameUser=localStorage.getItem("name_user")
  const [selectedFile, setSelectedFile] = useState(null);
  const [nombre, setNombre] = useState([]);
  const [selectedOption, setSelectedOption] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate(); 



  useEffect(() => {
    updateModuleList()
    initialList().then(r => r);
  }, []);
  const updateModuleList = () => {
    async function fetchData() {
      const course = await loadModules();
      setModules(course.coursesInfo);
    }

    fetchData();
    
  };
  async function initialList() {
    const arregloUsuarios = await Services.getPatients();
    const arregloMandar = [];

    arregloUsuarios.map((usuario) => {
        let nombre_user = `${usuario.first_name} ${usuario.middle_name} ${usuario.last_name} ${usuario.second_surname}`;
        return arregloMandar.push({
            id_file: usuario.id_file,
            nombre: nombre_user,
            email: usuario.email,
            id_account: usuario.id_file,
            creationDate: usuario.creation_date,
            id_clinic: usuario.id_clinic,
        });
    });

    setNombre(arregloMandar);
}

const addPacienteAndUpdateList = async (newPaciente) => {
  setNombre([...nombre, newPaciente]);
};

const handleSelectChange = (e) => {
  console.log(e)
  setSelectedOption(true);
  setShowButtons(true);
  setSelectedName(e);

};

const handleScheduleClick = () => {
  const selectedPatient = nombre.find((patient) => patient.id_account === selectedName);
  if (selectedPatient!=null) {
    handleClick(selectedPatient.id_account, selectedPatient.nombre, selectedPatient.id_clinic);
    navigate("/citas", { state: { selectedPatient } });
  }
};

const handleViewRecordsClick = () => {
  navigate("/Expedientes");
};

const handleViewDocumentsClick = () => {
  const selectedPatient = nombre.find((patient) => patient.id_account === selectedName);
  if (selectedPatient!=null) {
  console.log(selectedPatient)
  navigate("/Documentos", { state: { id_file:selectedPatient.id_file, userData: props.userData }});
  }
};
const handleClick = (id, nombre, id_clinic) => {
  localStorage.setItem('id_patient', id);
  localStorage.setItem('namePatient', nombre);
  localStorage.setItem('id_clinic', id_clinic);
};

  return (
    <DashboardLayout id="dashboard" pagina="Dashboard">
      <div className="dashboard-container">
        <NavigationB userData={props.userData} />
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-ju">
                                <div className="mt-2">
                                <ChartBarSalesM className="w-auto h-auto"/></div>
                                <div className="pb-3">
                                <StatsSection page={"Dash"}/>
                                </div>
                                <div className="mt-4">
                                  <div className="mb-2 font-bold text-xl" style={{ color: "#113946" }}>
                                    <p>Lista de Pacientes</p>
                                  </div>
                                  <Select label="Selecciona un paciente" value={selectedName} onChange={(e)=>(handleSelectChange(e))}>
                                    {nombre.map((nombre) => (
                                      <Option key={nombre.id_account} value={nombre.id_account}>
                                        {nombre.nombre}
                                      </Option>
                                    ))}
                                  </Select>
                                  {showButtons && selectedOption && (
                                    <div className="custom-button">
                                      <Button onClick={handleScheduleClick}>Agendar Citas</Button>
                                      <Button onClick={handleViewRecordsClick}>Ver Expedientes</Button>
                                      <Button onClick={handleViewDocumentsClick}>Ver Documentos</Button>
                                    </div>
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
