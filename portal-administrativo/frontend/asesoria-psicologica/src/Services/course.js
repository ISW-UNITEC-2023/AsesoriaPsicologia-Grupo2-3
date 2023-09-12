import axios from "axios";

export async function loadModules() {
  const options = {
    method: "GET",
    url: "http://localhost:3001/modulos/all",
  };
  const response = await axios.request(options);
  return response.data;
}
