import { useState } from "react";
import "../Styles/CSS/Dummy.css";

import EditarUser from "../../frontend/src/Components/PopUp_EditarUser";
import CrearUser from "../../frontend/src/Components/PopUp_CrearUser";

import Services from "../../frontend/src/Utilities/login-services";

function Dummy() {
  const [showCrearPopup, setShowCrearPopup] = useState(false);
  const [showEditarPopup, setShowEditarPopup] = useState(false);

  const openCrearPopup = () => {
    setShowCrearPopup(true);
  };

  const closeCrearPopup = () => {
    setShowCrearPopup(false);
  };

  async function openEditarPopup(e) {
    
    const user = await Services.getUser(2211105);
    console.log(user.user[0].id_account);

    localStorage.setItem("id_account", JSON.stringify(user.user[0].id_account));
    localStorage.setItem("email", user.user[0].email);
    
    let role = "";
    if(user.user[0].role === "ADMIN"){

      role= "Administrador";
    }else if(user.user[0].role === "DOCENTE"){

      role = "Docente";
    }else if(user.user[0].role === "ESTUDIANTE"){

      role = "Estudiante";
    }else if(user.user[0].role === "PACIENTE"){

      role = "Paciente";
    }

    console.log(role);
    let active = "";
    if(user.user[0].active === 1){

      active = "Activo"
    }else {

      active = "Inactivo"
    }

    localStorage.setItem("role", role);
    localStorage.setItem("name", user.user[0].name);
    localStorage.setItem("active", active);

    setShowEditarPopup(true);
  };

  const closeEditarPopup = () => {
    setShowEditarPopup(false);
  };

  return (
    <div>
      <div className="container-header">
        <h1 className="title-modulo">Dummy</h1>
        <a className="button-create" onClick={openCrearPopup}>
          Crear Usuario
        </a>
      </div>
      <a className="button-create" onClick={openEditarPopup}>
        Editar Usuario
      </a>
      {showCrearPopup && (
        <CrearUser onClose={closeCrearPopup} isOpen={showCrearPopup} />
      )}
      {showEditarPopup && (
        <EditarUser onClose={closeEditarPopup} isOpen={showEditarPopup} />
      )}
    </div>
  );
}

export default Dummy;