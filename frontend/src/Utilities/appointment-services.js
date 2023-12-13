import axios from "axios";
const host = process.env.REACT_APP_API_BASE_URL;

export async function getChequeo(idClinic) {
    try {
      const response = await axios.get(`${host}/appointment/getChequeo`);
      return response.data;
    } catch (error) {
      console.error("Error al obtenerlo:", error);
      throw error;
    }
  }
