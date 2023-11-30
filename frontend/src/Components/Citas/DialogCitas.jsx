import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {Button, Input, Typography} from "@material-tailwind/react";
import {toast} from "react-toastify";

export default function DialogCitas({titulo, nombreDoctor, fecha, hora, open, updateOpen}) {
    const [nombreDoctorN, setNombreDoctorN] = useState(nombreDoctor);
    const [fechaN, setFechaN] = useState(fecha);
    const [horaN, setHoraN] = useState(hora);

    const handleOpen = () => {
        updateOpen(!open);
    };

    const handleConfirmC = () => {
        handleOpen();
        toast("Cita Agendada Correctamente", {
            type: "success",
            bodyStyle: {width: "1000%"}
        });
    };

    const handleConfirmM = () => {
        handleOpen();
        toast("Cita Modificada Correctamente", {
            type: "success",
            bodyStyle: {width: "1000%"}
        });
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-100 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-xl font-semibold leading-6 text-gray-900">
                                                {titulo}
                                            </Dialog.Title>
                                            <div className="mt-4">
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <Typography className="whitespace-nowrap text-sm text-black"
                                                                    variant="h6"
                                                                    color="blue-gray">
                                                            Nombre Doctor:
                                                        </Typography>
                                                        <Input
                                                            type="search"
                                                            variant="standard"
                                                            label="Nombre del Doctor"
                                                            value={nombreDoctorN}
                                                            onChange={(e) => setNombreDoctorN(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <Typography
                                                            className="whitespace-nowrap text-sm text-black mt-2"
                                                            variant="h6"
                                                            color="blue-gray">
                                                            Fecha - Calendario:
                                                        </Typography>
                                                        <Input
                                                            type="date"
                                                            variant="standard"
                                                            label="Fecha de la Cita"
                                                            value={fechaN}
                                                            onChange={(e) => setFechaN(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-row gap-3 items-center">
                                                        <Typography
                                                            className="whitespace-nowrap text-sm text-black mt-2"
                                                            variant="h6"
                                                            color="blue-gray">
                                                            Hora de la Cita:
                                                        </Typography>
                                                        <Input
                                                            type="time"
                                                            variant="standard"
                                                            label="Hora de la Cita"
                                                            value={horaN}
                                                            onChange={(e) => setHoraN(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gap-5 px-4 py-3 flex flex-row justify-end">
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        color="red"
                                        className="hover:bg-red-700  text-red-700"
                                        type="button"
                                        onClick={handleOpen}
                                    >
                                        Cancelar
                                    </Button>
                                    {titulo === "Agendar Cita" ? (
                                        <Button
                                            size="sm"
                                            variant="filled"
                                            color="green"
                                            type="button"
                                            onClick={handleConfirmC}
                                        >
                                            Agendar Cita
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="filled"
                                            color="green"
                                            type="button"
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
