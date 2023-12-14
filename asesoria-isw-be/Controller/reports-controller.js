
const reportServices = require("../Service/reports-services");


async function getReport(req, res) {
    const startDate =req.query.startDate;
    const endDate =req.query.endDate;

    try {
        const response = await reportServices.getReports(startDate,endDate)
        //console.log(response);
        res.send(response);
      } catch (error) {
        res.send({ message: "Error", error: error.message });
      }
}

//estadisticas para la semana




module.exports = {
    getReport
  };
  