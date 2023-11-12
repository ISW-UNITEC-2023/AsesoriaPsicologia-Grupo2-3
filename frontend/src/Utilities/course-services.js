import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

export async function loadModules() {
  const options = {
    method: "GET",
    url: host + "/modulos/all",
  };
  const response = await axios.request(options);
  return response.data;
}

export async function deleteModule(id) {
  const options = {
    method: "DELETE",
    url: host + "/modulos",
    data: { id: id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}