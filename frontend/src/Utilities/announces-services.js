import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

export async function loadAnnounces() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/announcements/viewAll",
  };

  const response = await axios.request(options);
  // console.log(response.data);
  return response.data;
}

export async function DeleteAnnounces(id_announces) {
  const options = {
    method: "DELETE",
    url: "http://localhost:8000/announcements/delete",
    data: {
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
    url: "http://localhost:8000/announcements/create",
    data: info
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
    url: "http://localhost:8000/announcements/updateTitle",
    data: {
      id: id,
      title: title,
      editor: 13
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
    url: "http://localhost:8000/announcements/updateMessage",
    data: {
      id: id,
      message: message,
      editor: 13
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
