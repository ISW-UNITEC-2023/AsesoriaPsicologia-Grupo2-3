import axios from "axios";

async function getAllRoles(){
    const options = {
        method: "GET",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/roles/viewAll",
        data: {}
    }
    let roles = await axios.request(options);
    return roles.data
}

export default {
    getAllRoles
}