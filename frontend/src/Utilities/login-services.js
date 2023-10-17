import axios from "axios";

async function postLogin(email, password) {
  const options = {
    method: "POST",
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/admins/login",
    data: { email, password },
  };
  const response = await axios.request(options)
  return response.data;
}

async function getUsers() {
  const options = {
    method: "GET",
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/list",
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
    url: 'https://asesoria-isw-be-a2c92def0737.herokuapp.com/modulos/all',
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
    url: "https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/list",
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
    url: 'https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/register',
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
    url: 'https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/update',
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
    url: 'https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/delete',
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
    url: 'https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/updatePassword',
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
    url: 'https://asesoria-isw-be-a2c92def0737.herokuapp.com/user/updateEmail',
    data: {id_account, email}
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
};
