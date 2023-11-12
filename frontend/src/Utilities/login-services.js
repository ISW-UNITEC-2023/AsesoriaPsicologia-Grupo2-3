import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function postLogin(email, password) {
  const options = {
    method: "POST",
    url: process.env.REACT_APP_API_BASE_URL + "/users/login",
    data: { email, password },
    withCredentials: true, // Esto es para que axios envíe las cookies
  };
  const response = await axios.request(options);
  return response.data;
}

async function getUsers() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/users/viewUsers",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getModulesAll() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/modulos/all",
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

async function getSeccionbyModu() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/user/list",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function registerUser(name, email, phone, password, type, active) {
  const options = {
    method: "POST",
    url: process.env.REACT_APP_API_BASE_URL + "/user/register",
    data: { name, email, phone, password, type, active },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateUser(id_account, role, active) {
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL + "/user/update",
    data: { id_account, role, active },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function deleteUser(id_account) {
  const options = {
    method: "DELETE",
    url: process.env.REACT_APP_API_BASE_URL + "/user/delete",
    data: { id_account },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateUserPassword(id_account, password) {
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL + "/user/updatePassword",
    data: { id_account, password },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateUserEmail(id_account, email) {
  const options = {
    method: "PUT",
    url: process.env.REACT_APP_API_BASE_URL + "/user/updateEmail",
    data: { id_account, email },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export async function getCookies() {
  try {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_API_BASE_URL + "/users/getCookies",
      withCredentials: true,
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return null; // O maneja el error de otra manera
  }
}

export async function deleteCookies() {
  try {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_API_BASE_URL + "/admins/deletecookie",
      withCredentials: true,
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return null;
  }
}
async function getAdmins() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/user/admins",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getTeachers() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/users/viewTeachers",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getStudents() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/user/students",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getPatients() {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_API_BASE_URL + "/user/patients",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export default {
  postLogin,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateUserEmail,
  getAdmins,
  getTeachers,
  getStudents,
  getPatients,
};
