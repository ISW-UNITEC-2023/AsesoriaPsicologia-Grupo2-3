import axios from "axios";

export async function loadModules() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/courses/getCourses",
    withCredentials: true,
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
