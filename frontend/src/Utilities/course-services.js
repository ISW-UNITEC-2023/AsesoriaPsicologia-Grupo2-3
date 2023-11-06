import axios from "axios";

export async function loadModules() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL+"/courses/getCourses",
    withCredentials: true,
  };
  const response = await axios.request(options);
  return response.data;
}

export async function createModules(module) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "POST",
    url: `${host}/courses/create`, // Correct endpoint URL
    withCredentials: true,
    data: module, // Use the 'module' parameter
  };
  const response = await axios.request(options);
  return response.data;
}

export async function deleteModule(id) {
  const options = {
    method: "DELETE",
    url: process.env.REACT_APP_API_BASE_URL+"/modulos",
    data: { id: id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
