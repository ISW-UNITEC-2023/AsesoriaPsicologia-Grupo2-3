import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

export async function loadModules() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/courses/getCourses",
    withCredentials: true,
  };
  const response = await axios.request(options);
  return response.data;
}

export async function createModules(module) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "POST",
    url: "http://localhost:8000/courses/create", // Correct endpoint URL
    withCredentials: true,
    data: module, // Use the 'module' parameter
  };
  const response = await axios.request(options);
  return response.data;
}

export async function deleteModule(id) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const url = "http://localhost:8000/courses/delete";
  const data = { id: id };

  try {
    const response = await axios.delete(url, { data });

    if (response.status === 200) {
      return { status: response.status };
    } else {
      return { message: "Error deleting module" };
    }
  } catch (error) {
    return {
      message:
        error.response?.data?.error ||
        "An error occurred while deleting module",
    };
  }
}
