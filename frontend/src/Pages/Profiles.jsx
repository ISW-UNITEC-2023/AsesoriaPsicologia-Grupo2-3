import { useState, useEffect } from "react";
import Services from "../Utilities/login-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import CrearUser from "../Components/PopUp_CrearUser";
import EmailPopUP from "../Components/emailPopUp";
import ProfilePopUp from "../Components/profilePopUp";
function ProfilesPage() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenProfile, setIsPopupOpenProfile] = useState(false);
  const [nombres, setNombres] = useState([]);
  const [id_accountID, setId_account] = useState(null);
  const [activeID, setActive] = useState(null);
  const [nameId, setNameId] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [showCrearPopup, setShowCrearPopup] = useState(false);
  const handleOpcionCambiada = (e) => {
    setOpcionSeleccionada(e.target.id);
  };

  const toggleModify = (name, email) => {
    setEmailId(email);
    setNameId(name);
    setIsPopupOpen(true);
  };

  const viewProfile = (name, email, active, id_account) => {
    setEmailId(email);
    setNameId(name);
    setActive(active);
    setId_account(id_account);
    setIsPopupOpenProfile(true);
  };

  const [admins, setAdmins] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [patients, setPatients] = useState([]);

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
        id_account: admin.id_account,
        name: admin.name,
        email: admin.email,
        active: admin.active,
      });
    });

    arregloTeachers.map((teacher) => {
      return arregloTeachersMandar.push({
        id: teacher.id,
        id_account: teacher.id_account,
        name: teacher.name,
        email: teacher.email,
        active: teacher.active,
      });
    });

    arregloStudents.map((student) => {
      return arregloStudentsMandar.push({
        id: student.id,
        id_account: student.id_account,
        name: student.name,
        email: student.email,
        active: student.active,
      });
    });

    arregloPatients.map((patient) => {
      return arregloPatientsMandar.push({
        id: patient.id,
        id_account: patient.id_account,
        name: patient.name,
        email: patient.email,
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
  }, [nameId, emailId, activeID, id_accountID]);

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const closePopupProfile = () => {
    setIsPopupOpenProfile(false);
  };
  const openCrearPopup = () => {
    setShowCrearPopup(true);
  };

  const closeCrearPopup = () => {
    setShowCrearPopup(false);
  };
  const addPacienteAndUpdateList = async (newPaciente) => {
    // Agregar el nuevo paciente a la lista existente
    setNombres([...nombres, newPaciente]);
  };
  return (
    <div>
      <div>
        <h1>LISTA DE PARTICIPANTES</h1>
        <button className="crear-participante-button" onClick={openCrearPopup}>
          Crear participante
        </button>
        {showCrearPopup && (
          <CrearUser
            onClose={closeCrearPopup}
            isOpen={showCrearPopup}
            onUpdatePacientesList={addPacienteAndUpdateList} // Pasa la función aquí
          />
        )}
        <div style={{ width: "200px" }}>
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
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(50%, 50%))",
        }}
      >
        {admins.map((admin, index) => (
          <li key={index}>
            {opcionSeleccionada === "all" && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        admin.name,
                        admin.email,
                        admin.active,
                        admin.id_account
                      )
                    }
                  >
                    {admin.name}
                  </a>
                  {emailId === admin.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={admin.id_account}
                      name={admin.name}
                      email={admin.email}
                      active={admin.active}
                    />
                  )}
                </span>

                <button
                  onClick={() =>
                    toggleModify(
                      admin.name,
                      admin.email,
                      admin.active,
                      admin.id_account
                    )
                  }
                >
                  Enviar Correo
                </button>

                {emailId === admin.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={admin.name}
                    email={admin.email}
                  />
                )}

                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "active" && admin.active === 1 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        admin.name,
                        admin.email,
                        admin.active,
                        admin.id_account
                      )
                    }
                  >
                    {admin.name}
                  </a>
                  {emailId === admin.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={admin.id_account}
                      name={admin.name}
                      email={admin.email}
                      active={admin.active}
                    />
                  )}
                </span>

                <button onClick={() => toggleModify(admin.name, admin.email)}>
                  Enviar Correo
                </button>

                {emailId === admin.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={admin.name}
                    email={admin.email}
                  />
                )}

                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "inactive" && admin.active === 0 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        admin.name,
                        admin.email,
                        admin.active,
                        admin.id_account
                      )
                    }
                  >
                    {admin.name}
                  </a>
                  {emailId === admin.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={admin.id_account}
                      name={admin.name}
                      email={admin.email}
                      active={admin.active}
                    />
                  )}
                </span>

                <button onClick={() => toggleModify(admin.name, admin.email)}>
                  Enviar Correo
                </button>

                {emailId === admin.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={admin.name}
                    email={admin.email}
                  />
                )}

                <button>Editar</button>
              </div>
            )}
          </li>
        ))}
        {opcionSeleccionada === "active" &&
          !admins.find((admin) => admin.active === 1) && (
            <h3>No hay admins activos.</h3>
          )}
        {opcionSeleccionada === "inactive" &&
          !admins.find((admin) => admin.active === 0) && (
            <h3>No hay admins inactivos.</h3>
          )}
      </ul>

      <h2>Docentes</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(50%, 50%))",
        }}
      >
        {teachers.map((teacher) => (
          <li>
            {opcionSeleccionada === "all" && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        teacher.name,
                        teacher.email,
                        teacher.active,
                        teacher.id_account
                      )
                    }
                  >
                    {teacher.name}
                  </a>
                  {emailId === teacher.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={teacher.id_account}
                      name={teacher.name}
                      email={teacher.email}
                      active={teacher.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(teacher.name, teacher.email)}
                >
                  Enviar Correo
                </button>

                {emailId === teacher.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={teacher.name}
                    email={teacher.email}
                  />
                )}

                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "active" && teacher.active === 1 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        teacher.name,
                        teacher.email,
                        teacher.active,
                        teacher.id_account
                      )
                    }
                  >
                    {teacher.name}
                  </a>
                  {emailId === teacher.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={teacher.id_account}
                      name={teacher.name}
                      email={teacher.email}
                      active={teacher.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(teacher.name, teacher.email)}
                >
                  Enviar Correo
                </button>

                {emailId === teacher.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={teacher.name}
                    email={teacher.email}
                  />
                )}

                <button onClick={() => toggleOnClick()}>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "inactive" && teacher.active === 0 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        teacher.name,
                        teacher.email,
                        teacher.active,
                        teacher.id_account
                      )
                    }
                  >
                    {teacher.name}
                  </a>
                  {emailId === teacher.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={teacher.id_account}
                      name={teacher.name}
                      email={teacher.email}
                      active={teacher.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(teacher.name, teacher.email)}
                >
                  Enviar Correo
                </button>

                {emailId === teacher.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={teacher.name}
                    email={teacher.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
          </li>
        ))}
        {opcionSeleccionada === "active" &&
          !teachers.find((teacher) => teacher.active === 1) && (
            <h3>No hay maestros activos.</h3>
          )}
        {opcionSeleccionada === "inactive" &&
          !teachers.find((teacher) => teacher.active === 0) && (
            <h3>No hay maestros inactivos.</h3>
          )}
      </ul>

      <h2>Estudiantes</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(50%, 50%))",
        }}
      >
        {students.map((student) => (
          <li>
            {opcionSeleccionada === "all" && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        student.name,
                        student.email,
                        student.active,
                        student.id_account
                      )
                    }
                  >
                    {student.name}
                  </a>
                  {emailId === student.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={student.id_account}
                      name={student.name}
                      email={student.email}
                      active={student.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(student.name, student.email)}
                >
                  Enviar Correo
                </button>

                {emailId === student.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={student.name}
                    email={student.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "active" && student.active === 1 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        student.name,
                        student.email,
                        student.active,
                        student.id_account
                      )
                    }
                  >
                    {student.name}
                  </a>
                  {emailId === student.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={student.id_account}
                      name={student.name}
                      email={student.email}
                      active={student.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(student.name, student.email)}
                >
                  Enviar Correo
                </button>

                {emailId === student.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={student.name}
                    email={student.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "inactive" && student.active === 0 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        student.name,
                        student.email,
                        student.active,
                        student.id_account
                      )
                    }
                  >
                    {student.name}
                  </a>
                  {emailId === student.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={student.id_account}
                      name={student.name}
                      email={student.email}
                      active={student.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(student.name, student.email)}
                >
                  Enviar Correo
                </button>

                {emailId === student.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={student.name}
                    email={student.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
          </li>
        ))}
        {opcionSeleccionada === "active" &&
          !students.find((student) => student.active === 1) && (
            <h3>No hay estudiantes activos.</h3>
          )}
        {opcionSeleccionada === "inactive" &&
          !students.find((student) => student.active === 0) && (
            <h3>No hay estudiantes inactivos.</h3>
          )}
      </ul>

      <h2>Pacientes</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(50%, 50%))",
        }}
      >
        {patients.map((patient) => (
          <li>
            {opcionSeleccionada === "all" && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        patient.name,
                        patient.email,
                        patient.active,
                        patient.id_account
                      )
                    }
                  >
                    {patient.name}
                  </a>
                  {emailId === patient.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={patient.id_account}
                      name={patient.name}
                      email={patient.email}
                      active={patient.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(patient.name, patient.email)}
                >
                  Enviar Correo
                </button>

                {emailId === patient.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={patient.name}
                    email={patient.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "active" && patient.active === 1 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        patient.name,
                        patient.email,
                        patient.active,
                        patient.id_account
                      )
                    }
                  >
                    {patient.name}
                  </a>
                  {emailId === patient.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={patient.id_account}
                      name={patient.name}
                      email={patient.email}
                      active={patient.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(patient.name, patient.email)}
                >
                  Enviar Correo
                </button>

                {emailId === patient.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={patient.name}
                    email={patient.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
            {opcionSeleccionada === "inactive" && patient.active === 0 && (
              <div className="nombre-box">
                <FontAwesomeIcon icon={faUserCircle} className="icon-persona" />
                <span className="nombre" style={{ width: "400%" }}>
                  <a
                    href="#"
                    onClick={() =>
                      viewProfile(
                        patient.name,
                        patient.email,
                        patient.active,
                        patient.id_account
                      )
                    }
                  >
                    {patient.name}
                  </a>
                  {emailId === patient.email && (
                    <ProfilePopUp
                      isOpen={isPopupOpenProfile}
                      onClose={closePopupProfile}
                      id_account={patient.id_account}
                      name={patient.name}
                      email={patient.email}
                      active={patient.active}
                    />
                  )}
                </span>

                <button
                  onClick={() => toggleModify(patient.name, patient.email)}
                >
                  Enviar Correo
                </button>

                {emailId === patient.email && (
                  <EmailPopUP
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    name={patient.name}
                    email={patient.email}
                  />
                )}
                <button>Editar</button>
              </div>
            )}
          </li>
        ))}
        {opcionSeleccionada === "active" &&
          !patients.find((patient) => patient.active === 1) && (
            <h3>No hay pacientes activos.</h3>
          )}
        {opcionSeleccionada === "inactive" &&
          !patients.find((patient) => patient.active === 0) && (
            <h3>No hay pacientes inactivos.</h3>
          )}
      </ul>
    </div>
  );
}

export default ProfilesPage;
