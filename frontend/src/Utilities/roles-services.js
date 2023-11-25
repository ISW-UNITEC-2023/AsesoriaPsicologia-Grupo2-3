import axios from "axios";

async function getAllRoles(){
    const options = {
        method: "GET",
        url: "http://localhost:8000/roles/viewAll",
        data: {}
    }
    let roles = await axios.request(options);
    return roles.data
}

export default {
    getAllRoles
}