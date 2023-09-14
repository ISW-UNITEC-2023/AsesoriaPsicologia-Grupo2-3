import axios from "axios";

export async function GetSections() {
  const host = "http://localhost:3001";
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "http://localhost:3001";
  const options = {
    method: "GET",
    url: `${host}/sections/`,
  };

  const response = await axios.request(options);
  //console.log("GetProducts response data"+response.data);
  return response.data;
}

export async function createSection(section) {
  const host = "http://localhost:3001";
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "http://localhost:3001";
  const options = {
    method: "POST",
    url: `${host}/sections/create`,
    data: section,
  };

  const response = await axios.request(options);

  return response.data;
}

export async function getInfoSection(data) {
  const options = {
    method: "GET",
    url: "http://localhost:3001/sections/search",
    params: { course_id: data },
  };
  const response = await axios.request(options);
  return response.data;
}


export async function getInfoSectionMod() {
  const options = {
    method: "GET",
    url: "http://localhost:3001/sections/search2",
  };

  const response = await axios.request(options);
  console.log(response.data);
  return response.data;
}

export async function deleteSection(id) {
  const options = {
    method: "DELETE",
    url: "http://localhost:3001/sections/delete",
    params: { id: id },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
