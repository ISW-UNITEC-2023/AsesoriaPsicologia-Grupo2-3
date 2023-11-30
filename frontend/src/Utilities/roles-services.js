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

async function getAllPrivileges(){
    const options = {
        method: "GET",
        url: "http://localhost:8000/privileges/viewAll",
        data: {}
    }
    let privileges = await axios.request(options);
    return privileges.data
}

async function getAllRolesPrivileges(id){
    const options = {
        method: "POST",
        url: "http://localhost:8000/roles/viewPrivileges",
        data: {
            id: id
        }
    }
    let rolesPrivileges = await axios.request(options);
    return rolesPrivileges.data
}

async function assignPrivilegesToRole(id_role, id_privilege){
    const options = {
        method: "POST",
        url: "http://localhost:8000/roles/assignPrivilege",
        data: {
            id_role: id_role,
            id_privilege: id_privilege,
            creator: parseInt(localStorage.getItem("user_id"))
        }
    }
    let response = await axios.request(options);
    return response.data
}

async function removePrivilegeFromRole(id_role, id_privilege){
    const options = {
        method: "DELETE",
        url: "http://localhost:8000/roles/removePrivilege",
        data: {
            id_role: id_role,
            id_privilege: id_privilege
        }
    }
    let response = await axios.request(options);
    return response.data
}

async function createRole(name, description){
    const options = {
        method: "POST",
        url: "http://localhost:8000/roles/create",
        data: {
            name: name,
            description: description,
            creator: parseInt(localStorage.getItem("user_id"))
        }
    }
    let response = await axios.request(options);
    return response.data
}

async function deleteRole(idRol){
    const options = {
        method: "DELETE",
        url: "http://localhost:8000/roles/delete",
        data: {
            id_role: idRol
        }
    }
    let response = await axios.request(options);
    return response.data
}

async function updateName(id_role, name){
    const options = {
        method: "POST",
        url: "http://loclahost:8000/roles/updateName",
        data: {
            id_role: id_role, 
            name: name, 
            editor: parseInt(localStorage.getItem("user_id"))
        }
    }
    let response = await axios.request(options);
    return response.data;
}

async function updateDescription(id_role, description){
    const options = {
        method: "POST",
        url: "http://loclahost:8000/roles/updateDescription",
        data: {
            id_role: id_role, 
            description: description, 
            editor: parseInt(localStorage.getItem("user_id"))
        }
    }
    let response = await axios.request(options);
    return response.data;
}

export default {
    getAllRoles,
    getAllPrivileges,
    getAllRolesPrivileges,
    assignPrivilegesToRole,
    removePrivilegeFromRole,
    createRole,
    deleteRole,
    updateDescription,
    updateName
}