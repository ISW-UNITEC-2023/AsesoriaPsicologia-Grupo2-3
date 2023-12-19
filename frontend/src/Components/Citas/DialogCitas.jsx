import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Button,
  Input,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import useSWR from "swr";
import user_services from "../../Utilities/user-services";

const host = process.env.REACT_APP_API_URL;

export default function DialogCitas({
  titulo,
  nombreDoctor,
  fecha,
  hora,
  open,
  updateOpen,
}) {
  const [nombreDoctorN, setNombreDoctorN] = useState(nombreDoctor);
  const [fechaN, setFechaN] = useState(fecha);
  const [horaN, setHoraN] = useState(hora);
  const [modalidad, setModalidad] = useState("");
  const {
    data: fetchedUsers,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR(host + "/users/viewUsers", user_services.getUsers);
  const {
    data: fetchedRoles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useSWR(host + "/roles/viewAll", user_services.getAllUsersRoles);

  useEffect(() => {
    setNombreDoctorN(nombreDoctor);
    setFechaN(fecha);
    setHoraN(hora);
  }, []);

  if (usersLoading || rolesLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  if (usersError || rolesError) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Ha ocurrido un error al cargar los usuarios</p>
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

  const handleOpen = () => {
    updateOpen(!open);
  };

  const idPaciente = localStorage.getItem("id_patient");

  const handleConfirmC = async () => {
    // combinar los iso de fecha y hora
    const fechaHora = fechaN + " " + horaN + ":00.000Z";
    // Obtener él, id del doctor seleccionado
    const id_doctor = doctores.filter(
      (doctor) => doctor.id_user === nombreDoctorN
    )[0].id_user;

    try {
      axios
        .post(host + "/appointment/create", {
          id_user: localStorage.getItem("user_id"),
          appointment_date: fechaHora,
          id_clinic: localStorage.getItem("id_clinic"),
          id_doctor: id_doctor,
          id_file: idPaciente,
          user_creator: localStorage.getItem("user_id"),
          appointment_type: modalidad,
        })
        .then((res) => {
          //console.log(fechaHora);
          handleOpen();
          toast(
            "Cita Agendada Correctamente",
            {
              type: "success",
              bodyStyle: { width: "1000%" },
            },

            axios
              .post(host + "/calendar/events/create", {
                id_event: res.data.appoId[0],
                title: `${modalidad} - ${localStorage.getItem("namePatient")}`,
                url: "",
                start: `${fechaN} ${horaN}`,
                end: null,
                id_clinic: localStorage.getItem("id_clinic"),
              })
              .catch((error) => {
                toast(
                  "Ha ocurrido un error al agregar la cita al calendario: " +
                    error.message,
                  { type: "error" }
                );
              })
          );
        })
        .catch((error) => {
          toast("Ha ocurrido un error al agendar la cita: " + error.message, {
            type: "error",
          });
        });
    } catch (error) {
      toast("Ha ocurrido un error al agendar la cita: " + error.message, {
        type: "error",
      });
    }
  };

  const handleConfirmM = () => {
    handleOpen();
    toast("Cita Modificada Correctamente", {
      type: "success",
      bodyStyle: { width: "1000%" },
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-gray-100 sm:p-6 sm:pb-4'>
                  <div className=''>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-xl font-semibold leading-6 text-gray-900'
                      >
                        {titulo}
                      </Dialog.Title>
                      <div className='mt-4'>
                        <div className='flex flex-col gap-3'>
                          <div className='flex flex-row gap-2 items-center'>
                            <Typography
                              className='whitespace-nowrap text-sm text-black'
                              variant='h6'
                              color='blue-gray'
                            >
                              Nombre Doctor:
                            </Typography>
                            <Select
                              label='Nombre del doctor'
                              value={nombreDoctorN}
                              onChange={(e) => setNombreDoctorN(e)}
                            >
                              {doctores.map((doctor) => (
                                <Select.Option value={doctor.id_user}>
                                  {doctor.name_user}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                          <div className='flex flex-row gap-2 items-center'>
                            <Typography
                              className='whitespace-nowrap text-sm text-black mt-2'
                              variant='h6'
                              color='blue-gray'
                            >
                              Fecha - Calendario:
                            </Typography>
                            <Input
                              type='date'
                              variant='standard'
                              label='Fecha de la Cita'
                              value={fechaN}
                              onChange={(e) => setFechaN(e.target.value)}
                            />
                          </div>
                          <div className='flex flex-row gap-3 items-center'>
                            <Typography
                              className='whitespace-nowrap text-sm text-black mt-2'
                              variant='h6'
                              color='blue-gray'
                            >
                              Hora de la Cita:
                            </Typography>
                            <Input
                              type='time'
                              variant='standard'
                              label='Hora de la Cita'
                              value={horaN}
                              onChange={(e) => setHoraN(e.target.value)}
                            />
                          </div>
                          <div className='flex flex-row gap-3 items-center'>
                            <Typography
                              className='whitespace-nowrap text-sm text-black mt-2'
                              variant='h6'
                              color='blue-gray'
                            >
                              Modalidad de la Cita:
                            </Typography>
                            <Select
                              label='Formato'
                              value={modalidad}
                              onChange={(e) => setModalidad(e)}
                            >
                              <Select.Option value={"PRESENCIAL"}>
                                Presencial
                              </Select.Option>
                              <Select.Option value={"VIRTUAL"}>
                                Virtual
                              </Select.Option>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='gap-5 px-4 py-3 flex flex-row justify-end'>
                  <Button
                    size='sm'
                    variant='outlined'
                    color='red'
                    className='hover:bg-red-700  text-red-700'
                    type='button'
                    onClick={handleOpen}
                  >
                    Cancelar
                  </Button>
                  {titulo === "Agendar Cita" ? (
                    <Button
                      size='sm'
                      variant='filled'
                      color='green'
                      type='button'
                      onClick={handleConfirmC}
                    >
                      Agendar Cita
                    </Button>
                  ) : (
                    <Button
                      size='sm'
                      variant='filled'
                      color='green'
                      type='button'
                      onClick={handleConfirmM}
                    >
                      Modificar Cita
                    </Button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
