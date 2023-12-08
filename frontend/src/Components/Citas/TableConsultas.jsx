import {PencilIcon} from "@heroicons/react/24/solid";
import {Button, Card, CardBody, CardHeader, IconButton, Spinner, Typography,} from "@material-tailwind/react";
import {EyeIcon} from "@heroicons/react/20/solid";
import BreadCrumbsC from "./BreadCrumbsC";
import {useEffect, useState} from "react";
import DialogCitas from "./DialogCitas";
import axios from "axios";
import useSWR from "swr";
import user_services from "../../Utilities/user-services";

const TABLE_HEAD = [" ", "Fecha de Consulta", "Doctor Responsable", "Observaciones", ""];

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function TableConsultas({page}) {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [nombreDoctor, setNombreDoctor] = useState("");
    const [fecha, setFecha] = useState("");
    const id = localStorage.getItem("id_patient");
    const {data: data, error, isLoading} = useSWR(`http://localhost:8000/appointment/getById/${id}`, fetcher,
        {refreshInterval: 1000});
    const {
        data: fetchedUsers,
        error: usersError,
        isLoading: usersLoading
    } = useSWR('http://localhost:8000/users/viewUsers', user_services.getUsers);

    // Obtiene el nombre del paciente del localStorage
    const nombre = localStorage.getItem("namePatient");

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        let hour = '' + d.getHours();
        let minutes = '' + d.getMinutes();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minutes.length < 2)
            minutes = '0' + minutes;

        return [day, month, year].join('/') + " " + [hour, minutes].join(':');
    }

    const handleOpen = () => {
        setOpen(true);
        setTitulo("Agendar Cita");
    }

    const handleOpenE = () => {
        data.data.map(
            (
                {
                    appointment_date,
                    id_file,
                    id_doctor,
                },
                index,
            ) => {
                setNombreDoctor(getDoctorName(id_doctor));
                setFecha(appointment_date);

                setOpen(true);
                setTitulo("Modificar Cita");
            }
        );
    }

    const updateIsOpen = (isOpen) => {
        setOpen(isOpen);
    }

    useEffect(() => {
        updateIsOpen(open);
    }, [open]);

    if (isLoading || usersLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner/>
            </div>
        )
    }

    if (error || usersError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Ha ocurrido un error al cargar las citas</p>
            </div>
        )
    }

    const getDoctorName = (id) => {
        if (usersLoading) {
            return <Spinner/>
        }

        const doctor = fetchedUsers.find((user) => user.id_user === id);
        return doctor.name_user;
    }

    return (
        <Card className="h-auto w-auto ml-2 mr-2 md:ml-20 md:mr-20">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-row justify-between items-center w-full">
                    {page === "Cita" && (
                        <div className="flex flex-row gap-2 items-center">
                            <BreadCrumbsC nombrePaciente={"Juan Perez"}/>
                        </div>
                    )}
                </div>
                {page === "Cita" && (
                    <div className="flex flex-row justify-between gap-4 mt-4 mb-4">
                        <div className="flex flex-row justify-between gap-2">
                            <Button style={{background: "#113946"}} variant={"gradient"} onClick={handleOpen}>
                                Agendar Cita
                            </Button>
                            <Button style={{background: "#113946"}} variant={"gradient"} onClick={handleOpenE}>
                                Modificar Cita
                            </Button>
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <Button style={{background: "#113946"}} variant="gradient" type="button">Ver
                                expediente</Button>
                        </div>
                    </div>
                )}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex flex-row gap-2">
                        <Typography color="blue-gray" style={{color: "#113946"}} variant="h6">
                            Historial de Consultas
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-auto px-0" style={{maxHeight: "calc(100vh - 350px)"}}>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.data.map(
                        (
                            {
                                appointment_date,
                                id_file,
                                id_doctor,
                                observations,
                            },
                            index,
                        ) => {
                            const isLast = index === data.data.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center">
                                            <IconButton variant="text">
                                                <EyeIcon className="w-5 h-5"/>
                                            </IconButton>
                                            <IconButton variant="text">
                                                <PencilIcon className="w-5 h-5"/>
                                            </IconButton>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {formatDate(appointment_date)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {getDoctorName(id_doctor)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {observations ? observations : "Sin observaciones"}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    {open && <DialogCitas nombreDoctor={nombreDoctor} fecha={fecha} titulo={titulo} open={open}
                                          updateOpen={updateIsOpen}/>}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}

export default TableConsultas;
