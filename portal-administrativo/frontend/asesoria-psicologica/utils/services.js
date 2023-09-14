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


export default {
  postLogin,
  getUsers,
  getModulesAll,
};
