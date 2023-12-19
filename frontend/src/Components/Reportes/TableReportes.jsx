import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import services from "../../Utilities/reports-service";
import { startOfWeek, endOfWeek, format,parseISO } from "date-fns";

const TABLE_HEAD = ["Account", "Amount", "Date", "Status", "Transaction"];

// const TABLE_ROWS = [
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
//         name: "Spotify",
//         amount: "$2,500",
//         date: "Wed 3:00pm",
//         status: "paid",
//         account: "visa",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
//         name: "Amazon",
//         amount: "$5,000",
//         date: "Wed 1:00pm",
//         status: "paid",
//         account: "master-card",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
//         name: "Pinterest",
//         amount: "$3,400",
//         date: "Mon 7:40pm",
//         status: "pending",
//         account: "master-card",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
//         name: "Google",
//         amount: "$1,000",
//         date: "Wed 5:00pm",
//         status: "paid",
//         account: "visa",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
//         name: "netflix",
//         amount: "$14,000",
//         date: "Wed 3:30am",
//         status: "cancelled",
//         account: "visa",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-slack.svg",
//         name: "Slack",
//         amount: "$2,500",
//         date: "Wed 3:00pm",
//         status: "paid",
//         account: "visa",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
//         name: "Spotify",
//         amount: "$2,500",
//         date: "Wed 3:00pm",
//         status: "paid",
//         account: "visa",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
//         name: "Amazon",
//         amount: "$5,000",
//         date: "Wed 1:00pm",
//         status: "paid",
//         account: "master-card",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
//         name: "Pinterest",
//         amount: "$3,400",
//         date: "Mon 7:40pm",
//         status: "pending",
//         account: "master-card",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
//     {
//         img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
//         name: "Google",
//         amount: "$1,000",
//         date: "Wed 5:00pm",
//         status: "paid",
//         account: "visa",
//         accountNumber: "1234",
//         expiry: "06/2026",
//     },
// ];

function TableReportes() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [dateRange, setDateRange] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReportes(
      format(startOfWeek(new Date()), "yyyy-MM-dd"),
      format(endOfWeek(new Date()), "yyyy-MM-dd")
    ).then((r) => r);
  }, []);

  async function getReportes(startformat, endformat) {
    try {
      let response = await services.getReport(startformat, endformat);

      setReports(response);

      console.log("reportes", response);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    // Cuando dejan de estar vacíos los dos campos de fecha, se activa el rango de fechas
    if (date1 && date2) {
      setDateRange(true);

      getReportes(date1, date2).then((r) => r);
    } else {
      setDateRange(false);
    }
  }, [date1, date2]);

  const handleDownloadExcel = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };

  const data = (appointment_date) => {
    return format(appointment_date, "yyyy-MM-dd HH:mm:ss");
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <h2
            className="text-3xl ml-0 md:ml-36 font-semibold"
            style={{ color: "#153946" }}
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
                style={{ borderColor: "#C4C4C4" }}
              />
            </div>
            <Button
              type={"button"}
              id="downloadButton"
              className="flex items-center gap-2 md:gap-3"
              size="sm"
              disabled={isDownloading}
              onClick={handleDownloadExcel}
              style={{ backgroundColor: "#153946" }}
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
              Descargar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-x-auto px-0 border-b border-blue-gray-50"
        style={{ maxHeight: "calc(100vh - 150px)" }}
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
            {reports.map(
              (
                {
                  id_file,
                  first_name,
                  middle_name,
                  last_name,
                  second_surname,
                  payment_amount,
                  appointment_date,
                  state_appointment,
                  payment_type,
                },
                index
              ) => {
                const isLast = index === reports.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

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
                        {payment_amount}
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
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default TableReportes;
