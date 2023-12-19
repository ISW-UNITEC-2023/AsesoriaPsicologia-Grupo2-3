const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

const {
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
} = require("date-fns");
const esLocale = require("date-fns/locale/es");

// Get
async function getStatsDay() {
  const currentDate = new Date();

  const fixedTime = setSeconds(setMinutes(setHours(currentDate, 18), 0), 0);

  const formattedDate = format(fixedTime, "yyyy-MM-dd HH:mm:ss");

  try {
    const result = await knex("appointments")
      .select(knex.raw("SUM(payment_amount) as total_payment_amount"))
      .whereRaw("appointment_date = ?", [formattedDate])
      .andWhere("state_appointment", "PROCESADO");

    const totalPaymentAmount = result[0].total_payment_amount || 0;

    return parseFloat(totalPaymentAmount.toFixed(2));
  } catch (error) {
    console.error("Error al obtener las estadísticas del día:", error);
    throw error;
  }
}

async function getStatsWeek() {
  const currentDate = new Date();

  const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // 1 for Monday as the first day of the week
  const lastDayOfWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

  try {
    const result = await knex("appointments")
      .select(knex.raw("SUM(payment_amount) as total_payment_amount"))
      .whereBetween("appointment_date", [firstDayOfWeek, lastDayOfWeek])
      .andWhere("state_appointment", "PROCESADO");

    const totalPaymentAmount = result[0].total_payment_amount || 0;

    return parseFloat(totalPaymentAmount.toFixed(2));
  } catch (error) {
    console.error("Error al obtener las estadísticas de la semana:", error);
    throw error;
  }
}

async function getStatsMonth() {
  const currentDate = new Date();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  try {
    const result = await knex("appointments")
      .select(knex.raw("SUM(payment_amount) as total_payment_amount"))
      .whereBetween("appointment_date", [firstDayOfMonth, lastDayOfMonth])
      .andWhere("state_appointment", "PROCESADO")
      .first();

    const totalPaymentAmount = result.total_payment_amount || 0;

    return parseFloat(totalPaymentAmount.toFixed(2));
  } catch (error) {
    console.error("Error al obtener las estadísticas del mes:", error);
    throw error;
  }
}

async function getWeekSales() {
  const currentDate = new Date();
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  try {
    const results = await knex("appointments")
      .select("appointment_date", "payment_amount")
      .whereBetween("appointment_date", [startDate, endDate])
      .andWhere("state_appointment", "PROCESADO");

    const ventasPorDiasS = {};

    const daysOfWeek = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    for (let i = 0; i < 7; i++) {
      ventasPorDiasS[daysOfWeek[i]] = 0;
    }

    results.forEach((row) => {
      const formattedDate = format(row.appointment_date, "yyyy-MM-dd HH:mm:ss");

      const parsedDate = parseISO(formattedDate);

      const nombreDia = format(parsedDate, "EEEE", { locale: esLocale }); // Obtener el nombre del día de la semana en español
      const nombreDiaCapitalizado =
        nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);

      if (!ventasPorDiasS[nombreDiaCapitalizado]) {
        ventasPorDiasS[nombreDiaCapitalizado] = 0;
      }

      // Sumar el monto para el día actual
      ventasPorDiasS[nombreDiaCapitalizado] += row.payment_amount;
    });

    // Redondear los totales de ventas por día a 2 decimales
    for (const key in ventasPorDiasS) {
      ventasPorDiasS[key] = parseFloat(ventasPorDiasS[key].toFixed(2));
    }

    return ventasPorDiasS;
  } catch (error) {
    console.error("Error al obtener las estadísticas de la semana:", error);
    throw error;
  }
}

async function getMonthSales() {
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const stardateformt = `${currentDate.getFullYear()}:01:1`;
  const enddateformt = `${currentDate.getFullYear()}:12:31`;
  try {
    const results = await knex("appointments")
      .select("appointment_date", "payment_amount")
      .whereBetween("appointment_date", [stardateformt, enddateformt])
      .andWhere("state_appointment", "PROCESADO");

    const ventasPorMesS = {};

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    for (let i = 0; i < 12; i++) {
      ventasPorMesS[months[i]] = 0;
    }

    results.forEach((row) => {
      const formattedDate = format(row.appointment_date, "yyyy-MM-dd HH:mm:ss");
      const parsedDate = parseISO(formattedDate);
      const nombreMes = format(parsedDate, "MMMM", { locale: esLocale }); // Obtener el nombre del mes en español
      const nombreMesCapitalizado =
        nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);

      if (!ventasPorMesS[nombreMesCapitalizado]) {
        ventasPorMesS[nombreMesCapitalizado] = 0;
      }

      // Sumar el monto para el mes actual
      ventasPorMesS[nombreMesCapitalizado] += row.payment_amount;
    });

    // Redondear los totales de ventas por mes a 2 decimales
    for (const key in ventasPorMesS) {
      ventasPorMesS[key] = parseFloat(ventasPorMesS[key].toFixed(2));
    }

    return ventasPorMesS;
  } catch (error) {
    console.error("Error al obtener las estadísticas del mes:", error);
    throw error;
  }
}

module.exports = {
  getStatsDay,
  getStatsWeek,
  getStatsMonth,
  getWeekSales,
  getMonthSales,
};
