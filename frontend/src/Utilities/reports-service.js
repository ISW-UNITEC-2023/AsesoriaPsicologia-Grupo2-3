import axios from "axios";
import { format } from "date-fns";

//obtener reportes
async function getReport(startDate, endDate) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8000/reports/getReport?startDate=${startDate}&endDate=${endDate}`,
    headers: {},
  };

  let response = await axios.request(config);

  return response.data;
}

export default {
  getReport,
};
