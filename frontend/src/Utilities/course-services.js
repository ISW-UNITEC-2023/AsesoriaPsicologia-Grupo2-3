import axios from "axios";

export async function loadModules() {
  const options = {
    method: "GET",
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/modulos/all",
  };
  const response = await axios.request(options);
  return response.data;
}

export async function deleteModule(id) {
  const options = {
    method: "DELETE",
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/modulos",
    data: { id: id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
