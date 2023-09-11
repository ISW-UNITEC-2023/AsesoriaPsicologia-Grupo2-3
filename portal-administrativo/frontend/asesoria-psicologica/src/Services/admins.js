import axios from "axios";

export async function GetTeachers() {
  const host = "http://localhost:3001";
  // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "http://localhost:3001";
  const options = {
    method: "GET",
    url: `${host}/admins/teachers`,
  };

  const response = await axios.request(options);
  //console.log("GetProducts response data"+response.data);
  return response.data;
}
