import axios from "axios";

export async function GetSections() {
  const host = process.env.REACT_APP_API_BASE_URL;
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
  const options = {
    method: "GET",
    url: `${host}/sections/`,
  };

  const response = await axios.request(options);
  return response.data;
}

export async function createSection(section) {
  const host = process.env.REACT_APP_API_BASE_URL;
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
  const options = {
    method: "POST",
    url: `${host}/sections/create`,
    data: section,
  };
  const response = await axios.request(options);
  return response.data;
}

export async function getInfoSection(id) {
  const options = {
    method: "GET",
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/sections/search",
    params: { course_id: id },
  };
  const response = await axios.request(options);
  console.log(response.data);
  return response.data;
}

export async function getInfoSectionMod() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL+"/sections/search2",
  };

  const response = await axios.request(options);
  console.log(response.data);
  return response.data;
}

export async function deleteSection(id) {
  const options = {
    method: "DELETE",
    url: process.env.REACT_APP_API_BASE_URL+"/sections/delete",
    params: { id: id },
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
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL+"/sections/update/teacher/",
    params: { id: id },
    data: { teacher_id: teacher_id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updateYear(id, year) {
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL+"/sections/update/year/",
    params: { id: id },
    data: { year: year },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function updateQuarter(id, quarter) {
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL+"/sections/update/quarter/",
    params: { id: id },
    data: { quarter: quarter },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
