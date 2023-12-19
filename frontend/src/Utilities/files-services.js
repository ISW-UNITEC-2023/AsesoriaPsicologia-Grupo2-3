import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

export async function getFileById(idFile) {
  const options = {
    method: "GET",
    url: host + "/files/getFileById",
    params: { id: idFile },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}
