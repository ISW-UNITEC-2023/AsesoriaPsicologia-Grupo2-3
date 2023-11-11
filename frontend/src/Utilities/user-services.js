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

async function editName(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/updateName",
        data: {
            id: user.id,
            name: user.name,
            editor: user.editor
        }
    }
    const response = await axios.request(options);
    return response.data
}

async function editPhone(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/updatePhone",
        data: {
            id: user.id,
            phone: user.phone,
            editor: user.editor
        }
    }
    const response = await axios.request(options);
    return response.data
}

async function editEmail(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/updateEmail",
        data: {
            id: user.id,
            newEmail: user.email,
            editor: user.editor
        }
    }
    const response = await axios.request(options);
    return response.data
}

async function editActive(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/changeActive",
        data: {
            id: user.id,
            active: user.active,
            editor: user.editor
        }
    }
    const response = await axios.request(options);
    return response.data
}

async function editPassword(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/updatePassword",
        data: {
            id: user.id,
            newPassword: user.password,
            editor: user.editor
        }
    }
    const response = await axios.request(options);
    return response.data
}

async function assignRole(user){
    const options = {
        method: "POST",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/assignRole",
        data: {
            id_user: user.id,
            id_role: user.role
        }
    }
    const response = await axios.request(options);
    return response.data
}

async function removeRole(user){
    const options = {
        method: "DELETE",
        url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/users/removeRole",
        data: {
            id_user: user.id,
            id_role: user.role
        }
    }
    const response = await axios.request(options);
    return response.data
}

export default {
    getUsers,
    getAllUsersRoles,
    createUser,
    editName,
    editPhone,
    editEmail,
    editPassword,
    editActive,
    assignRole,
    removeRole
}