import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import BreadCrumbsC from "./BreadCrumbsC";
import React, { useEffect, useState } from "react";
import DialogCitas from "./DialogCitas";
import axios from "axios";
import useSWR from "swr";
import user_services from "../../Utilities/user-services";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const TABLE_HEAD = [
  " ",
  "Fecha de Consulta",
  "Doctor Responsable",
  "Observaciones",
  "",
];

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function TableConsultas({ page }) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [montoConsulta, setMontoConsulta] = useState("");
  const [montoError, setMontoError] = useState(false);
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [ordenesMedicas, setOrdenesMedicas] = useState("");
  const [titulo, setTitulo] = useState("");
  const [nombreDoctor, setNombreDoctor] = useState("");
  const [fecha, setFecha] = useState("");
  const id = localStorage.getItem("id_patient");
  const {
    data: fetchedRoles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useSWR(
    "http://localhost:8000/roles/viewAll",
    user_services.getAllUsersRoles
  );
  const {
    data: data,
    error,
    isLoading,
  } = useSWR(`http://localhost:8000/appointment/getById/${id}`, fetcher, {
    refreshInterval: 1000,
  });
  const {
    data: fetchedUsers,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR("http://localhost:8000/users/viewUsers", user_services.getUsers);

  // Obtiene el nombre del paciente del localStorage
  const nombre = localStorage.getItem("namePatient");

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    let hour = "" + d.getHours();
    let minutes = "" + d.getMinutes();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour.length < 2) hour = "0" + hour;
    if (minutes.length < 2) minutes = "0" + minutes;

    return [day, month, year].join("/") + " " + [hour, minutes].join(":");
  };

  const handleOpen = () => {
    setOpen(true);
    setTitulo("Agendar Cita");
  };

  const handleOpenE = (id) => {
    data.data.map(({ appointment_date, id_file, id_doctor }, index) => {
      setNombreDoctor(getDoctorName(id_doctor));
      setFecha(appointment_date);

      setOpen(true);
      setTitulo("Modificar Cita");
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/appointment/deleteById/${id}`)
      .then(() => {
        toast.success("Cita eliminada con éxito");
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error al eliminar la cita " + err);
      });

    axios
      .delete(`http://localhost:8000/calendar/events/deleteById/${id}`)
      .catch((err) => {
        toast.error("Ha ocurrido un error al eliminar la cita del calendario " + err);
      });
  };

  const updateIsOpen = (isOpen) => {
    setOpen(isOpen);
  };

  useEffect(() => {
    updateIsOpen(open);
  }, [open]);

  if (isLoading || usersLoading || rolesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || usersError || rolesError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Ha ocurrido un error al cargar las citas</p>
      </div>
    );
  }

  const usersWithRoles = fetchedUsers.map((user) => {
    const userRoles = fetchedRoles
      .filter((role) => user.id_user === role.id_user)
      .map((role) => [role.id_role, role.name_role]);
    return { ...user, roles: userRoles };
  });

  const doctores = Array.isArray(usersWithRoles)
    ? usersWithRoles.filter((user) => user.roles.some((role) => role[0] === 3))
    : [];

  const getDoctorName = (id) => {
    if (usersLoading) {
      return <Spinner />;
    }

    const doctor = fetchedUsers.find((user) => user.id_user === id);
    return doctor.name_user;
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);
  const handleTerminarConsulta = (id) => {
    if (montoConsulta.trim() === "") {
      setMontoError(true);
    } else {
      try {
        axios
          .put("http://localhost:8000/appointment/addConsultation", {
            id_appointment: id,
            id_file: localStorage.getItem("id_patient"),
            id_doctor: localStorage.getItem("id_doctor"),
            id_clinic: localStorage.getItem("id_clinic"),
            user_creator: localStorage.getItem("user_id"),
            observations: observaciones,
            amount: montoConsulta,
            medic_orders: ordenesMedicas,
          })
          .then((r) => r);
        toast.success("Consulta guardada con éxito", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setShowModal(false);
        setMontoError(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleGuardarConsulta = () => {
    setMontoError(false);
    const doctorName = document.getElementById("doctorName").value;
    const motivoConsulta = document.getElementById("consultaMotivo").value;
    const observaciones = document.getElementById("observaciones").value;
    const ordenesMedicas = document.getElementById("ordenesMedicas").value;
    const consulta = {
      doctorName,
      motivoConsulta,
      observaciones,
      montoConsulta,
      ordenesMedicas,
    };

    localStorage.setItem("consultaGuardada", JSON.stringify(consulta));
    console.log("Consulta guardada:", consulta);
    localStorage.clear();
    setShowModal(false);
  };

  return (
    <Card className="h-auto w-auto ml-2 mr-2 md:ml-20 md:mr-20">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-row justify-between items-center w-full">
          {page === "Cita" && (
            <div className="flex flex-row gap-2 items-center">
              <BreadCrumbsC />
            </div>
          )}
          {page === "Cita" && (
            <div>
              <Button
                style={{ background: "#113946" }}
                variant={"gradient"}
                onClick={handleOpen}
              >
                Agendar Cita
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between mt-4 md:flex-row md:items-center">
          <div className="flex flex-row">
            <Typography
              color="blue-gray"
              style={{ color: "#113946" }}
              variant="h6"
            >
              Historial de Citas
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-x-auto px-0 p-0"
        style={{ maxHeight: "calc(100vh - 130px)" }}
      >
        {data.data.map(({ appointment_date, id_doctor, id_appointment }) => {
          {
            return (
              <div
                className="ml-2 mr-2 md:ml-10 md:mr-10 mt-4 mb-4 p-4 flex flex-col justify-between
                                 md:flex-row md:items-center bg-white rounded-md border border-black"
              >
                <div className="flex flex-col justify-between gap-2">
                  <Typography
                    color="blue-gray"
                    style={{ color: "#113946" }}
                    variant="h6"
                  >
                    Paciente: {nombre}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    style={{ color: "#113946" }}
                    variant="h6"
                  >
                    Doctor: {getDoctorName(id_doctor)}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    style={{ color: "#113946" }}
                    variant="h6"
                  >
                    Fecha y hora de cita: {formatDate(appointment_date)}
                  </Typography>
                </div>
                <div className="flex flex-col justify-between gap-2 items-center">
                  <div className="flex flex-row gap-2">
                    <Button
                      className="w-32"
                      style={{ background: "#113946" }}
                      variant="gradient"
                      type="button"
                      onClick={() => handleShow(id_appointment)}
                    >
                      Iniciar Consulta
                    </Button>
                    <Button
                      className="w-32"
                      style={{ background: "#cb3939" }}
                      variant={"gradient"}
                      onClick={() => handleOpenE(id_appointment)}
                    >
                      Modificar Cita
                    </Button>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Button
                      className="w-32"
                      style={{ background: "#cb3939" }}
                      variant={"gradient"}
                      onClick={() => handleDelete(id_appointment)}
                    >
                      Eliminar Cita
                    </Button>
                    <Link to={"/expedientes"}>
                      <Button
                        className="w-32"
                        style={{ background: "#cb3939" }}
                        variant="gradient"
                        type="button"
                      >
                        Ver expediente
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
        {open && (
          <DialogCitas
            nombreDoctor={nombreDoctor}
            fecha={fecha}
            titulo={titulo}
            open={open}
            updateOpen={updateIsOpen}
          />
        )}
        <div className={`pop-iniciar-consulta ${showModal ? "show" : ""}`}>
          <div className="pop-iniciar-consulta-content">
            <div className="pop-iniciar-consulta-header">
              <h1>Consulta Médica</h1>

              <buttons className="button-save" onClick={handleGuardarConsulta}>
                Guardar Consulta
              </buttons>
            </div>
            <div className="pop-iniciar-consulta-body">
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="doctorName">Nombre del Médico:</label>
                <Select
                  label="Nombre del médico"
                  className="select-doctor"
                  placeholder="Seleccione un médico"
                >
                  {doctores.map((doctor) => (
                    <Option
                      key={doctor.id_user}
                      value={doctor.id_user}
                      onClick={() => {
                        localStorage.setItem("id_doctor", doctor.id_user);
                      }}
                    >
                      {doctor.name_user}
                    </Option>
                  ))}
                </Select>
              </div>
              <form className="pop-iniciar-consulta-form">
                <label htmlFor="consultaMotivo">Motivo de Consulta:</label>
                <textarea
                  id="consultaMotivo"
                  rows={3}
                  placeholder="Ingrese motivo de consulta"
                  value={motivoConsulta}
                  onChange={(e) => setMotivoConsulta(e.target.value)}
                />

                <label htmlFor="observaciones">Observaciones:</label>
                <textarea
                  id="observaciones"
                  rows={3}
                  placeholder="Ingrese observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
                <label htmlFor="montoConsulta">Monto de Consulta:</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "0.3rem" }}>Lps.</span>
                  <input
                    type="text"
                    id="montoConsulta"
                    placeholder="Ingrese monto de consulta"
                    value={montoConsulta}
                    onChange={(e) => setMontoConsulta(e.target.value)}
                  />
                </div>
                {montoError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    El campo de Monto de Consulta no puede estar vacío
                  </p>
                )}
                <label htmlFor="ordenesMedicas">Órdenes Médicas:</label>
                <textarea
                  id="ordenesMedicas"
                  rows={3}
                  placeholder="Ingrese órdenes médicas"
                  value={ordenesMedicas}
                  onChange={(e) => setOrdenesMedicas(e.target.value)}
                />
              </form>
            </div>
            <div className="pop-iniciar-consulta-footer">
              <buttons
                className="close-button-sesiones"
                type="button"
                class="btn btn-outline-danger"
                onClick={handleClose}
              >
                Cerrar
              </buttons>
              <buttons
                className="button-terminar"
                onClick={handleTerminarConsulta}
              >
                Terminar Consulta
              </buttons>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TableConsultas;
