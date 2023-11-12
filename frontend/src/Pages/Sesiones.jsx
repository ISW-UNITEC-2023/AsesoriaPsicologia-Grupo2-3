import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import "../Styles/CSS/Sesiones.css";

function Sesiones() {
  const [sessions, setSessions] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const handleCreateSession = () => {
    const newSession = sessions.length + 1;
    setSessions([...sessions, newSession]);
  };

  const handleDeleteSession = (sessionNumber) => {
    const updatedSessions = sessions.filter(session => session !== sessionNumber);
    setSessions(updatedSessions);
  };

  return (
    <div style={{ width: "90%" }}>
      <div className="container-header">
        <h1 className="title-sesiones" style={{ width: "100%", textAlign: "center", color: "#3498db" }}>
          Sesiones
        </h1>
        <button
          onClick={handleCreateSession}
          style={{
            padding: "10px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Session
        </button>
      </div>
      <ul>
        {sessions.map(sessionNumber => (
          <div className="nombre-box" key={sessionNumber}>
            <span className="nombre" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <Link
                to={`/Expedientes/${sessionNumber}`}
                style={{ color: "#2980b9", textDecoration: "none" }}
              >
                Sesion {sessionNumber}
              </Link>
              <button
                onClick={() => handleDeleteSession(sessionNumber)}
                style={{
                  padding: "5px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete Session
              </button>
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sesiones;
