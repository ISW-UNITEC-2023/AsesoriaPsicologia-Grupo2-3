import axios from "axios";
const host = process.env.REACT_APP_API_BASE_URL;

//obtener reportes
async function getReport(startDate, endDate) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${host}/reports/getReport?startDate=${startDate}&endDate=${endDate}`,
    headers: {},
  };

  let response = await axios.request(config);

  return response.data;
}

export default {
  getReport,
};
