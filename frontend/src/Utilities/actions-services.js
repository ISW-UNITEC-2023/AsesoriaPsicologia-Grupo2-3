import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function getActions() {
    try {
        const options = {
            method: 'GET', 
            url: "http://localhost:8000/actions"
        };

        const response = await axios.request(options);
        console.log("actions", response);
        return response.data;
    } catch (e) {
        console.error("Error al obtener acciones:", e);
        return null;
    }   
}

export default {
    getActions,
}