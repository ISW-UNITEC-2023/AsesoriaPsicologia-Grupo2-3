import axios from "axios";

export async function GetTeachers() {
  //const host = "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
  const host = process.env.REACT_APP_API_BASE_URL;
  //const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
  const options = {
    method: "GET",
    url: `${host}/admins/teachers`,
  };

  const response = await axios.request(options);
  //console.log("GetProducts response data"+response.data);
  return response.data;
}

export default {
  GetTeachers,
}
