import axios from "axios";

const host = "http://localhost:8000";

async function getActions() {
    try {
        const options = {
            method: 'GET', 
            url: host + "/actions"
        };

        const response = await axios.request(options);
        return response.data;
    } catch (e) {
        console.error("Error al obtener acciones:", e);
        return null;
    }   
}

export default {
    getActions,
}