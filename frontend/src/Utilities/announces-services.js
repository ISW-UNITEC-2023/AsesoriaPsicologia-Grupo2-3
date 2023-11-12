import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

export async function loadAnnounces() {
  const options = {
    method: "GET",
    url: host + "/announce/all",
  };

  const response = await axios.request(options);
  // console.log(response.data);
  return response.data;
}

export async function DeleteAnnounces(id_announces) {
  const options = {
    method: "DELETE",
    url: host + "/announce/delete",
    params: {
      id: id_announces,
    },
  };
  //console.log("id_announces",id_announces);
  axios
    .request(options)
    .then(function (response) {
      console.log("exito");
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function CreateAnnounce(info) {
  const options = {
    method: "POST",
    url: host + "/announce/create",
    data: {
      message: info.message,
      title: info.title,
      section_id: info.section_id,
      user_id: info.user_id,
    },
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

export async function UpdateAnnouncesTitle(id, title) {
  const options = {
    method: "POST",
    url: host + "/announce/update/title",
    data: {
      id: id,
      title_new: title,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function UpdateAnnouncesDecription(id, message) {
  const options = {
    method: "POST",
    url: host + "/announce/update/Descrip",
    data: {
      id: id,
      description_new: message,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
