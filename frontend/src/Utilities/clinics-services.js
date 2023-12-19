import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

 async function getClinics() {
    // const host = process.env.BACKEND_API ? process.env.BACKEND_API : "https://asesoria-isw-be-a2c92def0737.herokuapp.com";
    const options = {
      method: "GET",
      url: host+"/clinics/viewAll",
    };
  
    const response = await axios.request(options);
    return response.data;
  }



  async function crearClinica(name, user_creator) {
    
    let data = JSON.stringify({

      "user_creator": user_creator,
      "name_clinic": name
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: host + '/clinics/create',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  }


  async function descargarArchivo(fileId) {
    const options = {
      method: "GET",
      url: `${host}/clinics/descargar-archivo/${fileId}`,
      responseType: "blob",
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (e) {
      return { message: e.response.data.error };
    }
  }


  async function uploadFile(file) {
    try {
      const response = await axios.post(`${host}/clinics/subir-archivo`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error(
        "Error al subir el archivo:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  export default {
    crearClinica,
    uploadFile,
    descargarArchivo,
    getClinics,
  };
  
