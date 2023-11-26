import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function getActions() {
    try {
        const options = {
            method: 'GET', 
            url: host + "/actions"
        };

        const response = await axios.request(options);
        return response.data;
    } catch (e) {
        console.error("Error al obtener acciones:", error);
        return null;
    }   
}

export default {
    getActions,
}