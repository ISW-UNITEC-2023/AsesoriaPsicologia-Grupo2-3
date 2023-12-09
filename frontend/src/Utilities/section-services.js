import axios from "axios";

export async function GetSections() {
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "GET",
    url: "http://localhost:8000/sections/getAll",
  };

  const response = await axios.request(options);
  return response.data;
}

export async function createSection(section) {
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "POST",
    url: "http://localhost:8000/sections/create",
    data: section,
  };
  const response = await axios.request(options);
  return response.data;
}

export async function getInfoSection(id) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "GET",
    url: "http://localhost:8000/sections/search",
    params: { course_id: id },
    withCredentials: true,
  };
  const response = await axios.request(options);

  return response.data;
}

export async function getInfoSectionMod() {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "GET",
    url: "http://localhost:8000/sections/search2",
  };

  const response = await axios.request(options);
  console.log(response.data);
  return response.data;
}

export async function deleteSection(id) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "DELETE",
    url: "http://localhost:8000/sections/delete",
    data: { id: id },
    withCredentials: true,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

//Modificar
export async function updateTeacher(id, teacher_id) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "PUT",
    url: "http://localhost:8000/sections/updateTeacher",

    data: { id_sections: id, id_teacher: teacher_id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updateYear(id, year) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "PUT",
    url: "http://localhost:8000/sections/updateYear",

    data: { id_sections: id, year: year },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updateQuarter(id, quarter) {
  const host = process.env.REACT_APP_API_BASE_URL;
  const options = {
    method: "PUT",
    url: "http://localhost:8000/sections/updateQuarter",

    data: { id_sections: id, quarter: quarter },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updateActive(id, active) {
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL + "/sections/updateActive",

    data: { id_sections: id, active_section: active },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
