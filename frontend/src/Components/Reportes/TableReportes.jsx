import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";
import {Button, Card, CardBody, CardHeader, Chip, Input, Spinner, Typography,} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {endOfWeek, format, parseISO, startOfWeek} from "date-fns";
import {toast} from "react-toastify";
import ExcelJS from "exceljs";
import useSWR, {mutate} from "swr";
import axios from "axios";
import {formatMoney} from "../../Helpers";

const TABLE_HEAD = ["Cliente", "Monto", "Fecha", "Estado", "Metodo de pago"];

const fetcher = (url) => axios.get(url).then((res) => res.data);
const host = process.env.REACT_APP_API_URL;

function TableReportes() {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [startDate] = useState(startOfWeek(new Date(), {weekStartsOn: 1}));
    const [endDate] = useState(endOfWeek(new Date(), {weekStartsOn: 1}));

    const startDateF = format(startDate, 'yyyy-MM-dd');
    const endDateF = format(endDate, 'yyyy-MM-dd');

    const {
        data: reports,
        error: errorReports,
        isLoading: loadingReports,
    } = useSWR(
        () => {
            if (date1 !== "" && date2 !== "") {
                return `${host}/reports/getReport?startDate=${date1}&endDate=${date2}`;
            } else {
                return `${host}/reports/getReport?startDate=${startDateF}&endDate=${endDateF}`;
            }
        },
        fetcher,
        {
            refreshInterval: 5000,
        });

    useEffect(() => {
        if (date1 !== "" && date2 !== "") {
            handleSearchDateRange().then(r => r);
        }
    }, [date1, date2]);

    const handleSearchDateRange = async () => {
        if (date1 !== "" && date2 !== "") {
            try {
                const {data} = await axios.get(`${host}/reports/getReport?startDate=${date1}&endDate=${date2}`);
                await mutate(`${host}/reports/getReport?startDate=${date1}&endDate=${date2}`, data, false);
            } catch (error) {
                toast.error("Error al cargar los reportes");
            }
        }
    };

    function getPaymentTypeString(paymentType) {
        switch (paymentType) {
            case 1:
                return "Efectivo";
            case 2:
                return "Transferencia";
            case 3:
                return "Tarjeta de Crédito";
            case 4:
                return "Tarjeta de Débito";
            default:
                return "Sin Metodo de Pago";
        }
    }

    const handleDownloadExcel = async () => {
        if (isDownloading) {
            return;
        }
        setIsDownloading(true);

        try {
            const workbook = new ExcelJS.Workbook();

            if (date1 !== "" && date2 !== "") {
                workbook.creator = `Reporte de ${date1} a ${date2}`;
            } else {
                workbook.creator = "Reporte general";
            }

            const worksheet = workbook.addWorksheet("Reporte");

            worksheet.columns = [
                {header: "ID", key: "id_file", width: 10},
                {header: "Nombre", key: "first_name", width: 20},
                {header: "Apellido", key: "last_name", width: 20},
                {header: "Monto", key: "payment_amount", width: 20},
                {header: "Fecha", key: "appointment_date", width: 20},
                {header: "Estado", key: "state_appointment", width: 20},
                {header: "Metodo de pago", key: "payment_type", width: 20},
            ];

            worksheet.getRow(1).font = {bold: true};
            worksheet.getColumn("appointment_date").numFmt = "dd/mm/yyyy";
            worksheet.getColumn("payment_amount").numFmt = "L#,##0.00"

            reports.data.forEach((report) => {
                worksheet.addRow({
                    id_file: report.id_file,
                    first_name: report.first_name,
                    last_name: report.last_name,
                    payment_amount: report.payment_amount,
                    appointment_date: new Date(report.appointment_date),
                    state_appointment: report.state_appointment,
                    payment_type: getPaymentTypeString(report.payment_type),
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            if (date1 !== "" && date2 !== "") {
                link.download = `Reporte de ${date1} a ${date2}.xlsx`;
            } else {
                link.download = "Reporte general.xlsx";
            }

            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            toast.error("Error al descargar el reporte");
        } finally {
            setIsDownloading(false);
        }
    }

    if (loadingReports) {
        return (
            <div className="flex justify-center items-center mt-10">
                <Spinner/>
            </div>
        );
    }

    if (errorReports) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">Error al cargar los reportes</p>
            </div>
        );
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
                    <h2
                        className="text-3xl ml-0 md:ml-36 font-semibold"
                        style={{color: "#153946"}}
                    >
                        Reportes
                    </h2>
                    <div className="flex flex-col md:flex-row gap-2 md:w-full md:justify-end">
                        <div className="flex flex-col md:flex-row gap-2">
                            <Input
                                type="date"
                                color={"blue-gray"}
                                size="md"
                                placeholder="Buscar por mes"
                                value={date1}
                                className="pr-2 w-full"
                                onChange={(e) => setDate1(e.target.value)}
                            />
                            <Input
                                type="date"
                                color="blue-gray"
                                size="md"
                                placeholder="Buscar por fecha"
                                value={date2}
                                className="pr-2 w-full"
                                onChange={(e) => setDate2(e.target.value)}
                                style={{borderColor: "#C4C4C4"}}
                            />
                        </div>
                        <Button
                            type={"button"}
                            id="downloadButton"
                            className="flex items-center gap-2 md:gap-3"
                            size="sm"
                            disabled={isDownloading}
                            onClick={handleDownloadExcel}
                            style={{backgroundColor: "#153946"}}
                        >
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4"/>
                            Descargar
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody
                className="overflow-x-auto px-0 border-b border-blue-gray-50"
                style={{maxHeight: "calc(100vh - 150px)"}}
            >
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
                    {Array.isArray(reports.data) ? (
                        reports.data.map(({
                                              id_file,
                                              first_name,
                                              middle_name,
                                              last_name,
                                              second_surname,
                                              payment_amount,
                                              appointment_date,
                                              state_appointment,
                                              payment_type,
                                          }, index) => {
                            const isLast = index === reports.data.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={id_file}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {`${first_name} ${middle_name} ${last_name} ${second_surname}`}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {formatMoney(payment_amount)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {format(parseISO(appointment_date), 'yyyy-MM-dd HH:mm:ss ')}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={
                                                    state_appointment === null
                                                        ? "PENDIENTE"
                                                        : state_appointment
                                                }
                                                color={
                                                    state_appointment === "PROCESADO"
                                                        ? "green"
                                                        : state_appointment === null
                                                            ? "amber"
                                                            : state_appointment === "CANCELADA"
                                                                ? "red"
                                                                : "brown"
                                                                    ? "amber"
                                                                    : state_appointment === "INICIADO"
                                                                        ? "amber"
                                                                        : state_appointment === "PENDIENTE"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {payment_type === 1
                                                        ? "Efectivo"
                                                        : payment_type === 2
                                                            ? "Transferencia"
                                                            : payment_type === 3
                                                                ? "Tarjeta de Crédito"
                                                                : payment_type === 4
                                                                    ? "Tarjeta de Débito"
                                                                    : "Sin Metodo de Pago"}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                                No hay datos disponibles.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}

export default TableReportes;
