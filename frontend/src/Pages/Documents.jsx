// Documents.jsx
import React from "react";
import "../Styles/CSS/Documents.module.css";
import Visualization from "../Components/Documents/visualizations";
import NavigationB from "../Components/Navbar";

function Documents(props) {
  return (
      <div>
        <div className="style-db-container">
          <NavigationB key="navB" userData={props.userData}/>
          <div style={{ width: "90%" }}>
            <div className="style-header-container">
              <h1 className="style-title" style={{ width: "300%" }}>
                Documentos
                <Visualization user={9} appointment={1} />
              </h1>

            </div>
          </div>
        </div>
      </div>
  );
}

export default Documents;
