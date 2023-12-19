
const reportServices = require("../Service/reports-services");

const {
    startOfDay, startOfWeek, endOfWeek, startOfMonth,
    endOfMonth, format,
    parseISO
} = require('date-fns');
async function getReport(req, res) {
    const startDate =req.query.startDate;
    const endDate =req.query.endDate;

    try {
        const response = await reportServices.getReports(startDate,endDate);

        res.send({ message: "Success", data: response });
      } catch (error) {
        res.send({ message: "Error", error: error.message });
      }
}

//estadisticas para la semana




module.exports = {
    getReport
  };
