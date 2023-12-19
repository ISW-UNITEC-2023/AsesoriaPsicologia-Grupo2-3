import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function postLogin(email, password) {
  const options = {
    method: "POST",
    url: host+"/users/login",
    data: { email, password },
    withCredentials: true, // Esto es para que axios envíe las cookies
  };
  const response = await axios.request(options);
  return response.data;
}

async function getUsers() {
  const options = {
    method: "GET",
    url: host+"/users/viewUsers",
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
    url: host+"/modulos/all",
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
    url: host+"/user/list",
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
    url: host+"/user/register",
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
    url: host+"/user/update",
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
    url: host+"/user/delete",
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
    url: host+"/user/updatePassword",
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
    url: host+"/user/updateEmail",
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
      url: host+"/users/getCookies",
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
      url: host+"/users/removeCookie",
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
    url: host+"/user/admins",
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
    url: host+"/users/viewTeachers",
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
    url: host+"/user/students",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getPatients(id) {

  let options = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:8000/files/getClinicFiles?id=${id}`,
    headers: { }
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
