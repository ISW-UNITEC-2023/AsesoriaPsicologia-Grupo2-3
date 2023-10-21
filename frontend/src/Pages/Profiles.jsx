import { useState, useEffect } from "react";
import Services from "../Utilities/login-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

function ProfilesPage(){
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("all");

    const handleOpcionCambiada = (e) => {
      setOpcionSeleccionada(e.target.id);
    };

    const [admins, setAdmins] = useState([])
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [patients, setPatients] = useState([])

    async function initialLists() {
        const arregloAdmins = await Services.getAdmins();
        const arregloTeachers = await Services.getTeachers();
        const arregloStudents = await Services.getStudents();
        const arregloPatients = await Services.getPatients();
        const arregloAdminsMandar = [];
        const arregloTeachersMandar = [];
        const arregloStudentsMandar = [];
        const arregloPatientsMandar = [];
    
        arregloAdmins.map((admin) => {
          return arregloAdminsMandar.push({
            id: admin.id,
            id_account:  admin.id_account,
            name: admin.name,
            active: admin.active,
          });
        });

        arregloTeachers.map((teacher) => {
          return arregloTeachersMandar.push({
            id: teacher.id,
            id_account:  teacher.id_account,
            name: teacher.name,
            active: teacher.active,
          });
        });

        arregloStudents.map((student) => {
          return arregloStudentsMandar.push({
            id: student.id,
            id_account:  student.id_account,
            name: student.name,
            active: student.active,
          });
        });

        arregloPatients.map((patient) => {
          return arregloPatientsMandar.push({
            id: patient.id,
            id_account:  patient.id_account,
            name: patient.name,
            active: patient.active,
          });
        });
    
        setAdmins(arregloAdminsMandar);
        setTeachers(arregloTeachersMandar);
        setStudents(arregloStudentsMandar);
        setPatients(arregloPatientsMandar);
      }
    
      useEffect(() => {
        initialLists();
      }, []);

    return (
        <div>
          <div>
            <h1>LISTA DE PARTICIPANTES</h1>
            <div style={{width:'200px'}}>
            <Form>
            <Form.Check
              type="radio"
              label="Todos"
              name="opciones"
              id="all"
              onChange={handleOpcionCambiada}
              checked={opcionSeleccionada === "all"}
            />
            <Form.Check
              type="radio"
              label="Activos"
              name="opciones"
              id="active"
              onChange={handleOpcionCambiada}
              checked={opcionSeleccionada === "active"}
            />
            <Form.Check
              type="radio"
              label="Inactivos"
              name="opciones"
              id="inactive"
              onChange={handleOpcionCambiada}
              checked={opcionSeleccionada === "inactive"}
            />
          </Form>
            </div>
          </div>
          <h2>Administradores</h2>
          <ul style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50%, 50%))'}}>  
            {admins.map((admin) => (
              <li>
                {opcionSeleccionada === "all" &&
                  <div className="nombre-box">
                  <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                  <span className="nombre" style={{ width: "400%" }}>
                  <Link to={"/a"}>{admin.name}</Link>
                  </span>
  
                  <button>Enviar Correo</button>
                  <button>Editar</button>
                  </div>
                }
                {opcionSeleccionada === "active" && admin.active === 1 &&
                  <div className="nombre-box">
                  <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                  <span className="nombre" style={{ width: "400%" }}>
                  <Link to={"/a"}>{admin.name}</Link>
                  </span>
  
                  <button>Enviar Correo</button>
                  <button>Editar</button>
                  </div>
                }
                {opcionSeleccionada === "inactive" && admin.active === 0 &&
                  <div className="nombre-box">
                  <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                  <span className="nombre" style={{ width: "400%" }}>
                  <Link to={"/a"}>{admin.name}</Link>
                  </span>
  
                  <button>Enviar Correo</button>
                  <button>Editar</button>
                  </div>
                }
              </li>
            ))}
            { opcionSeleccionada === "active" && !admins.find((admin) => admin.active === 1) &&
              <h3>No hay admins activos.</h3>
            }
            { opcionSeleccionada === "inactive" && !admins.find((admin) => admin.active === 0) &&
              <h3>No hay admins inactivos.</h3>
            }
          </ul>

          <h2>Docentes</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50%, 50%))' }}>  
            {teachers.map((teacher) => (
              <li>
                {opcionSeleccionada === "all" &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{teacher.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
                {opcionSeleccionada === "active" && teacher.active === 1 &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{teacher.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
                {opcionSeleccionada === "inactive" && teacher.active === 0 &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{teacher.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
              </li>
            ))}
            { opcionSeleccionada === "active" && !teachers.find((teacher) => teacher.active === 1) &&
              <h3>No hay maestros activos.</h3>
            }
            { opcionSeleccionada === "inactive" && !teachers.find((teacher) => teacher.active === 0) &&
              <h3>No hay maestros inactivos.</h3>
            }
          </ul>

          <h2>Estudiantes</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50%, 50%))' }}>  
            {students.map((student) => (
              <li>
                {opcionSeleccionada === "all" &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{student.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
                {opcionSeleccionada === "active" && student.active === 1 &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{student.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
                {opcionSeleccionada === "inactive" && student.active === 0 &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{student.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
              </li>
            ))}
            { opcionSeleccionada === "active" && !students.find((student) => student.active === 1) &&
              <h3>No hay estudiantes activos.</h3>
            }
            { opcionSeleccionada === "inactive" && !students.find((student) => student.active === 0) &&
              <h3>No hay estudiantes inactivos.</h3>
            }
          </ul>    

          <h2>Pacientes</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50%, 50%))' }}>  
            {patients.map((patient) => (
              <li>
                {opcionSeleccionada === "all" &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{patient.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
                {opcionSeleccionada === "active" && patient.active === 1 &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{patient.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
                {opcionSeleccionada === "inactive" && patient.active === 0 &&
                <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                <Link to={"/a"}>{patient.name}</Link>
                </span>

                <button>Enviar Correo</button>
                <button>Editar</button>
                </div>
                }
              </li>
            ))}
            { opcionSeleccionada === "active" && !patients.find((patient) => patient.active === 1) &&
              <h3>No hay pacientes activos.</h3>
            }
            { opcionSeleccionada === "inactive" && !patients.find((patient) => patient.active === 0) &&
              <h3>No hay pacientes inactivos.</h3>
            }
          </ul>
        </div>
    )
}

export default ProfilesPage;