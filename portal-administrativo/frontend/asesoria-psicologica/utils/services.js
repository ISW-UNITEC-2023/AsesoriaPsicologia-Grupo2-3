import axios from "axios";

async function postLogin(email, password) {
  const options = {
    method: "POST",
    url: "http://localhost:3001/user/login",
    data: { email: email, password: password },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return {
      message: e.response.data.error,
    };
  }
}

async function getUsers() {
  const options = {
    method: "GET",
    url: "http://localhost:3001/user/list",
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
    method: 'GET',
    url: 'http://localhost:3001/modulos/all',
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}


async function getSeccionbyModu() {
  const options = {
    method: "GET",
    url: "http://localhost:3001/user/list",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function registerUser(id_account, role, name, email, password, active){
  const options = {
    method: 'POST',
    url: 'http://localhost:3001/user/register',
    data: {id_account, role, name, email, password, active}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateUser(id_account, role, active){
  const options = {
    method: 'PUT',
    url: 'http://localhost:3001/user/update',
    data: {id_account, role, active}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function deleteUser(id_account){
  const options = {
    method: 'DELETE',
    url: 'http://localhost:3001/user/delete',
    data: {id_account}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateUserPassword(id_account, password){
  const options = {
    method: 'PUT',
    url: 'http://localhost:3001/user/updatePassword',
    data: {id_account, password}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateUserEmail(id_account, email){
  const options = {
    method: 'PUT',
    url: 'http://localhost:3001/user/updateEmail',
    data: {id_account, email}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postLogin,
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateUserEmail,
};
