import {PencilIcon} from "@heroicons/react/20/solid";
import {Button, Card, CardBody, CardHeader, Chip, Typography,} from "@material-tailwind/react";
import {EyeIcon} from "@heroicons/react/24/solid";
import BreadCrumbsC from "./BreadCrumbsC";
import {useEffect, useState} from "react";
import DialogCitas from "./DialogCitas";

const TABLE_HEAD = [" ", "Fecha de Consulta", "Doctor Responsable", "Observaciones", ""];

const TABLE_ROWS = [
    {
        name: "Spotify",
        amount: "12/11/2021",
        date: "Dr. Juan Perez",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
    },
    {
        name: "Amazon",
        amount: "14/11/2021",
        date: "Dr. Juan Perez",
        status: "paid",
        account: "master-card",
        accountNumber: "1234",
        expiry: "06/2026",
    },
    {
        name: "Pinterest",
        amount: "15/11/2021",
        date: "Dr. Juan Perez",
        status: "pending",
        account: "master-card",
        accountNumber: "1234",
        expiry: "06/2026",
    },
    {
        name: "Google",
        amount: "16/11/2021",
        date: "Dr. Juan Perez",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
    },
    {
        name: "netflix",
        amount: "17/11/2021",
        date: "Dr. Juan Perez",
        status: "cancelled",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
    },
];

export function TableConsultas() {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setTitulo("Agendar Cita");
    }

    const handleOpenE = () => {
        setOpen(true);
        setTitulo("Modificar Cita");
    }

    const updateIsOpen = (isOpen) => {
        setOpen(isOpen);
    }

    useEffect(() => {
        updateIsOpen(open);
    }, [open]);

    return (
        <Card className="h-auto w-auto ml-2 mr-2 md:ml-20 md:mr-20">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-row gap-2 items-center">
                        <BreadCrumbsC nombrePaciente={"Juan Perez"}/>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Button variant={"gradient"} onClick={handleOpen}>
                            Agendar Cita
                        </Button>
                    </div>
                </div>
                <div className="mt-4 mb-4 p-4 flex flex-col justify-between gap-8 md:flex-row md:items-center bg-white
                rounded-md border border-black">
                    <div className="flex flex-col gap-4">
                        <Typography color="blue-gray" variant="h6">
                            Paciente: Juan Perez
                        </Typography>
                        <Typography color="blue-gray" variant="h6">
                            Doctor: Dr. Juan Perez
                        </Typography>
                        <Typography color="blue-gray" variant="h6">
                            Fecha y Hora de Cita: 11/11/2021 10:30 AM
                        </Typography>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-row gap-2">
                            <Button variant="gradient" type="button" onClick={handleOpenE}>Modificar</Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex flex-row gap-2">
                        <Typography color="blue-gray" variant="h6">
                            Historial de Consultas
                        </Typography>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button variant="gradient" type="button">Agregar Consulta</Button>
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
                    {TABLE_ROWS.map(
                        (
                            {
                                img,
                                name,
                                amount,
                                date,
                                status,
                                account,
                                accountNumber,
                                expiry,
                            },
                            index,
                        ) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <div className="flex items-center">
                                            <EyeIcon/>
                                            <PencilIcon/>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {amount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={status}
                                                color={
                                                    status === "paid"
                                                        ? "green"
                                                        : status === "pending"
                                                            ? "amber"
                                                            : "red"
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    {open && <DialogCitas titulo={titulo} open={open} updateOpen={updateIsOpen}/>}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}

export default TableConsultas;
