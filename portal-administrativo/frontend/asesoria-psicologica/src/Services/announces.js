import axios from "axios";

export async function loadAnnounces() {
    const options = {
        method: 'GET', 
        url: 'http://localhost:3001/announces/sections'
    };
    
    const response = await axios.request(options);
    //console.log(response.data);
    return response.data;
}

export async function DeleteAnnounces(id_announces) {
    const options = {
        method: 'DELETE',
        url: 'http://localhost:3001/announces/delete',
        params: {id: id_announces},
        
      };
      //console.log("id_announces",id_announces);
      axios.request(options).then(function (response) {
        console.log("exito");
      }).catch(function (error) {
        console.error(error);
      });
      
}

export async function CreateAnnounces(data) {
 
  const options = {
    method: 'POST',
    url: 'http://localhost:3001/announces/create',
    data: {
      message: data.message,
      title: data.title,
      section_id: data.section_id,
      user_id: data.user_id,
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export async function UpdateAnnouncesTitle(data) {
 
  const options = {
    method: 'PUT',
    url: 'http://localhost:3001/announces/update/title',
    params: {id: data.id},
    data: {title_new: data.title}
  };

  axios.request(options).then(function (response) {
    //console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export async function UpdateAnnouncesDecription(data) {
 
  const options = {
    method: 'PUT',
    url: 'http://localhost:3001/announces/update/Descrip',
    params: {id: data.id},
    data: {description_new: data.description}
  };

  axios.request(options).then(function (response) {
    //console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}