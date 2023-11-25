import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function getUsers() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/users/viewUsers",
    data: {},
  };
  let users = await axios.request(options);
  return users.data;
}

async function getAllUsersRoles() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/users/viewRoles",
    data: {},
  };
  let roles = await axios.request(options);
  return roles.data.rolesInfo[0];
}

async function createUser(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/register",
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      type: user.type,
      active: user.active,
    },
  };
  let users = await axios.request(options);
  return users.data;
}

async function editName(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/updateName",
    data: {
      id: user.id,
      name: user.name,
      editor: user.editor,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editPhone(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/updatePhone",
    data: {
      id: user.id,
      phone: user.phone,
      editor: user.editor,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editEmail(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/updateEmail",
    data: {
      id: user.id,
      newEmail: user.email,
      editor: user.editor,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editActive(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/changeActive",
    data: {
      id: user.id,
      active: user.active,
      editor: user.editor,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function editPassword(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/updatePassword",
    data: {
      id: user.id,
      newPassword: user.password,
      editor: user.editor,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function assignRole(user) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/assignRole",
    data: {
      id_user: user.id,
      id_role: user.role,
    },
  };
  const response = await axios.request(options);
  return response.data;
}

async function removeRole(user) {
  const options = {
    method: "DELETE",
    url: "http://localhost:8000/users/removeRole",
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
    url: "http://localhost:8000/users/login",
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
      url: "http://localhost:8000/users/getCookies",
      withCredentials: true,
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
      url: "http://localhost:8000/users/deletecookie",
      withCredentials: true,
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cookies:", error);
    return null;
  }
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
  removeRole,
  postLogin,
};
