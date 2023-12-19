import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function getUsers() {
  const options = {
    method: "GET",
    url: host + "/users/viewUsers",
    data: {},
  };
  let users = await axios.request(options);
  return users.data;
}

async function getPatients() {
  const options = {
    method: "GET",
    url: host + "/users/viewPatients",
    data: {},
  };
  let users = await axios.request(options);
  return users.data;
}

async function getAllUsersRoles() {
  const options = {
    method: "GET",
    url: host + "/users/viewRoles",
    data: {},
  };
  let roles = await axios.request(options);
  return roles.data.rolesInfo[0];
}

async function createUser(user) {
  const options = {
    method: "POST",
    url: host + "/users/register",
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      type: user.type,
      active: user.active,
      creator: parseInt(localStorage.getItem("user_id")),
    },
  };
  let users = await axios.request(options);
  return users.data;
}

async function createUserByclinic(user) {
  console.log("user", user);

  const options = {
    method: "POST",
    url: host + "/users/register",
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      type: user.type,
      active: user.active,
      creator: 13,
      clinicid: user.clinicid,
    },
  };
  let users = await axios.request(options);
  return users.data;
}

async function editName(user) {
  const options = {
    method: "POST",
    url: host + "/users/updateName",
    data: {
      id: user.id,
      name: user.name,
      editor: parseInt(localStorage.getItem("user_id")),
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editPhone(user) {
  const options = {
    method: "POST",
    url: host + "/users/updatePhone",
    data: {
      id: user.id,
      phone: user.phone,
      editor: parseInt(localStorage.getItem("user_id")),
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editEmail(user) {
  const options = {
    method: "POST",
    url: host + "/users/updateEmail",
    data: {
      id: user.id,
      newEmail: user.email,
      editor: parseInt(localStorage.getItem("user_id")),
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editActive(user) {
  const options = {
    method: "POST",
    url: host + "/users/changeActive",
    data: {
      id: user.id,
      active: user.active,
      editor: parseInt(localStorage.getItem("user_id")),
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editPassword(user) {
  const options = {
    method: "POST",
    url: host + "/users/updatePassword",
    data: {
      id: user.id,
      newPassword: user.password,
      editor: parseInt(localStorage.getItem("user_id")),
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function assignRole(user) {
  const options = {
    method: "POST",
    url: host + "/users/assignRole",
    data: {
      id_user: user.id,
      id_role: user.role,
      creator: user.editor,
      editor: user.creator,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function removeRole(user) {
  const options = {
    method: "DELETE",
    url: host + "/users/removeRole",
    data: {
      id_user: user.id,
      id_role: user.role,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function postLogin(email, password) {
  const options = {
    method: "POST",
    url: host + "/users/login",
    data: { email, password },
    withCredentials: true,
  };
  const response = await axios.request(options);
  return response.data;
}

export async function getCookies() {
  try {
    const options = {
      method: "GET",
      url: host + "/users/getCookies",
      withCredentials: true,
      credentials: "include",
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cookies:", error);
    return null; // O maneja el error de otra manera
  }
}

export async function deleteCookies() {
  try {
    const options = {
      method: "GET",
      url: host + "/users/deletecookie",
      withCredentials: true,
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cookies:", error);
    return null;
  }
}

export async function getUserById(id) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: host + `/users/getUserById?id=${id}`,
      headers: {},
    };
    const response = await axios.request(config);
    return JSON.stringify(response.data);
  } catch (error) {
    console.error("Error al obtener nombre de usuario:", error);
    return null; // O maneja el error de otra manera
  }
}

export async function getVerify(id) {
  try {
    const options = {
      method: "GET",
      url: host + "/users/getVerify",
      params: { id_user: id },
      withCredentials: true,
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error al obtener getVerify:", error);
    return null;
  }
}

export default {
  getUsers,
  getPatients,
  getAllUsersRoles,
  createUser,
  editName,
  editPhone,
  editEmail,
  editPassword,
  editActive,
  assignRole,
  removeRole,
  postLogin,
  getUserById,
  createUserByclinic,
};
