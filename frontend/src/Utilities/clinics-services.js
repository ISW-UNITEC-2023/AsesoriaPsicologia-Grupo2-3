import axios from "axios";

export async function getClinics() {
    const host = process.env.REACT_APP_API_BASE_URL;
    // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
    const options = {
      method: "GET",
      url: `${host}/clinics/viewAll`,
    };
  
    const response = await axios.request(options);
    return response.data;
  }