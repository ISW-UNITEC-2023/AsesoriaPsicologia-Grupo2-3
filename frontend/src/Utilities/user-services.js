import axios from "axios";

async function getUsers(){
    const options = {
        method: "GET",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/viewUsers",
        data: {}
    }
    let users = await axios.request(options);
    return users.data
}

async function getAllUsersRoles(){
    const options = {
        method: "GET",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/viewRoles",
        data: {}
    }
    let roles = await axios.request(options);
    return roles.data.rolesInfo[0]
}

async function createUser(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/register",
        data: {
            name: user.name,
            email: user.email, 
            phone: user.phone,
            password: user.password, 
            type: user.type, 
            active: user.active
        }
    }
    let users = await axios.request(options);
    return users.data

}

export default {
    getUsers,
    getAllUsersRoles,
    createUser
}