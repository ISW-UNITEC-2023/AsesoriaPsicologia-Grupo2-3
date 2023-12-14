import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function postLogin(email, password, registro) {
  const options = {
    method: "POST",
    url: "http://localhost:8000/users/login",
    data: { email, password, registro },
    withCredentials: true, // Esto es para que axios envíe las cookies
  };
  const response = await axios.request(options);
  return response.data;
}

async function getUsers() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/users/viewUsers",
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
    url: "http://localhost:8000/modulos/all",
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
    url: "http://localhost:8000/user/list",
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
    url: "http://localhost:8000/user/register",
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
    url: "http://localhost:8000/user/update",
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
    url: "http://localhost:8000/user/delete",
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
    url: "http://localhost:8000/user/updatePassword",
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
    url: "http://localhost:8000/user/updateEmail",
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
      url: "http://localhost:8000/users/getCookies",
      withCredentials: true,
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function deleteCookies() {
  try {
    const options = {
      method: "DELETE",
      url: "http://localhost:8000/users/removeCookie",
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
    url: "http://localhost:8000/user/admins",
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
    url: "http://localhost:8000/users/viewTeachers",
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
    url: "http://localhost:8000/user/students",
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
    url: "http://localhost:8000/users/viewPatients",
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
