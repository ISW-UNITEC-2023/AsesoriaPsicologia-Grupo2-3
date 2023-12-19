import axios from "axios";

export async function getFileById(idFile){
    const options = {
        method: "GET",
        url: "http://localhost:8000/files/getFileById",
        params: { id: idFile },
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (e) {
        return { message: e.response.data.error };
    }
}