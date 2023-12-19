const statsService = require("../Service/stats-services");

async function getStatsDay(req, res) {
  try {
    const stats = await statsService.getStatsDay();
    res.send({ message: "Se han obtenido las estadísticas", data: stats });
  } catch (error) {
    res.send({
      message: "No se pudieron obtener las estadísticas",
      err: error.message,
    });
  }
}

async function getStatsWeek(req, res) {
  try {
    const stats = await statsService.getStatsWeek();

    res.send({ message: "Se han obtenido las estadísticas", data: stats });
  } catch (error) {
    res.send({
      message: "No se pudieron obtener las estadísticas",
      err: error.message,
    });
  }
}

async function getStatsMonth(req, res) {
  try {
    const stats = await statsService.getStatsMonth();
    res.send({ message: "Se han obtenido las estadísticas", data: stats });
  } catch (error) {
    res.send({
      message: "No se pudieron obtener las estadísticas",
      err: error.message,
    });
  }
}

async function geWeekSales(req, res) {
  try {
    const stats = await statsService.getWeekSales();
    res.send({ message: "Se han obtenido las estadísticas", data: stats });
  } catch (error) {
    res.send({
      message: "No se pudieron obtener las estadísticas",
      err: error.message,
    });
  }
}

async function getMonthSales(req, res) {
  try {
    const stats = await statsService.getMonthSales();
    res.send({ message: "Se han obtenido las estadísticas", data: stats });
  } catch (error) {
    res.send({
      message: "No se pudieron obtener las estadísticas",
      err: error.message,
    });
  }
}

module.exports = {
  getStatsDay,
  getStatsWeek,
  getStatsMonth,
  geWeekSales,
  getMonthSales,
};
