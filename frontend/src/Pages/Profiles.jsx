import { useState } from "react";
import Services from "../Utilities/login-services";

function ProfilesPage(){
    const [admins, setAdmins] = useState([])

    async function initialAdminList() {
        const arregloAdmins = await Services.getAdmins();
        console.log(arregloAdmins)
        const arregloAdminsMandar = [];
    
        arregloAdmins.map((admin) => {
          return arregloMandar.push({
            id: admin.id,
            id_account:  admin.id_account,
            name:  admin.name,
          });
        });
    
        setAdmins(arregloAdminsMandar);
      }
    
      useEffect(() => {
        initialAdminList();
      }, []);

    return (
        <>
        <h1>LISTA DE PARTICIPANTES</h1>
        <h2>Administradores</h2>
        <>
            {admins.map((admin) => (
                <>{admin.name}</>
            ))}
        </>
        <h2>Docentes</h2>
        <h2>Pacientes</h2>
        </>
    )
}

export default ProfilesPage;