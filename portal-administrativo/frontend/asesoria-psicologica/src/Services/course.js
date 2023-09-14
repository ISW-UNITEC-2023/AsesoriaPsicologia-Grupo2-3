import axios from "axios";

export async function loadModules() {
  const options = {
    method: "GET",
    url: "http://localhost:3001/modulos/all",
  };
  const response = await axios.request(options);
  return response.data;
}

export async function deleteModule(id) {
  const options = {
    method: "DELETE",
    url: "http://localhost:3001/modulos",
    data: { id: id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}