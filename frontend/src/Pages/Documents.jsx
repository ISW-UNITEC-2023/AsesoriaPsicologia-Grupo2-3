import React from "react";
import "../Styles/CSS/Documents.css";
import Visualization from "../Components/Documents/visualizations";
import NavigationB from "../Components/Navbar";
import { useLocation } from 'react-router-dom';
function Documents(props) {
    const location = useLocation();
    const{id_file,userData} = location.state;
    //console.log(id_file);
    //console.log(userData);
  return (
      <div>
        <div className="document-db-container">
            <NavigationB />
          <div style={{ width: "90%" }}>
            <div className="document-header-container">
                <h1 className="document-title" style={{width: "300%"}}>
                    Documentos
                    <Visualization user={9}/>
                </h1>

            </div>
          </div>
        </div>
      </div>
  );
}

export default Documents;
