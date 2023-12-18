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
import { useEffect, useState } from "react";
import DialogCitas from "./DialogCitas";
import axios from "axios";
import useSWR from "swr";
import user_services from "../../Utilities/user-services";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateAppointmentWithoutAmount,
  getStateInitials,
} from "../../Utilities/appointment-services";
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
  const [hora, setHora] = useState("");
  const [formato, setFormato] = useState("");
  const [idAppo, setIdAppo] = useState("");
  const id = localStorage.getItem("id_patient");
  const [id_appointmentRef, setIdAppointment] = useState(null);
  const [dataAppointment, setDataAppointment] = useState(null);
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

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleOpen = () => {
    setOpen(true);
    setTitulo("Agendar Cita");
  };

  const handleOpenE = (id) => {
    data.data.map(
      ({ appointment_date, appointment_hour, id_doctor, appointment_type }) => {
        setIdAppo(id);
        setNombreDoctor(id_doctor);
        const fecha = formatDate(appointment_date);
        setFecha(fecha);
        setHora(appointment_hour);
        setFormato(appointment_type);
        setOpen(true);
        setTitulo("Modificar Cita");
      }
    );
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
  };

  const updateIsOpen = (isOpen) => {
    setOpen(isOpen);
  };

  useEffect(() => {
    fecha && setFecha(fecha);
    hora && setHora(hora);
    nombreDoctor && setNombreDoctor(nombreDoctor);
    idAppo && setIdAppo(idAppo);
  }, [fecha, hora, nombreDoctor, idAppo]);

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
  const handleShow = async (id_appointment) => {
    setShowModal(true);
    setIdAppointment(id_appointment);

    const data = await getStateInitials(id_appointment);

    setDataAppointment(data);
  };

  const handleTerminarConsulta = async () => {
    if (montoConsulta.trim() === "") {
      setMontoError(true);
    } else {
      try {
        await axios.put("http://localhost:8000/appointment/addConsultation", {
          id_appointment: id_appointmentRef,
          id_file: localStorage.getItem("id_patient"),
          id_doctor: localStorage.getItem("id_doctor"),
          id_clinic: localStorage.getItem("id_clinic"),
          user_editor: localStorage.getItem("user_id"),
          observations: observaciones,
          payment_amount: montoConsulta,
          medic_orders: ordenesMedicas,
          state_appointment: "TERMINADO",
        });
        toast.success("Consulta guardada con éxito", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setShowModal(false);
        setMontoError(false);
        setIdAppointment(null);
        setDataAppointment(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGuardarConsulta = async () => {
    setMontoError(false);

    try {
      await updateAppointmentWithoutAmount(
        id_appointmentRef,
        localStorage.getItem("id_patient"),
        localStorage.getItem("id_doctor"),
        localStorage.getItem("id_clinic"),
        localStorage.getItem("user_id"),
        observaciones,
        ordenesMedicas,
        "INICIADO"
      );

      toast.success("Consulta guardada con éxito", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      setShowModal(false);
      setDataAppointment(null);
      setIdAppointment(null);
    } catch (error) {
      console.error("Error al actualizar la cita:", error);

      toast.error("Error al guardar la consulta", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
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
        {data.data.map(
          ({
            appointment_date,
            appointment_hour,
            id_doctor,
            id_appointment,
          }) => {
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
                      Fecha y hora de cita: {formatDate(appointment_date)}{" "}
                      {appointment_hour}
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
          }
        )}
        {open && (
          <DialogCitas
            idAppo={idAppo}
            nombreDoctor={nombreDoctor}
            fecha={fecha}
            hora={hora}
            formato={formato}
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
                  value={
                    dataAppointment.AppInfo
                      ? dataAppointment.AppInfo[0].observations
                      : observaciones
                  }
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
                  value={
                    dataAppointment.AppInfo
                      ? dataAppointment.AppInfo[0].medic_orders
                      : ordenesMedicas
                  }
                  onChange={(e) => setOrdenesMedicas(e.target.value)}
                />
              </form>
            </div>
            <div className="pop-iniciar-consulta-footer">
              <buttons
                className="close-button-sesiones btn btn-outline-danger"
                type="button"
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
