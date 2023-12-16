import axios from "axios";
// const host = process.env.REACT_APP_API_BASE_URL;
const host = "http://localhost:8000";
async function descargarArchivo(fileId) {
  const options = {
    method: "GET",
    url: `${host}/documents/descargar-archivo/${fileId}`,
    responseType: "blob",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getDocuments() {
  const options = {
    method: "GET",
    url: `${host}/documents/listar-archivos`,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getDocumentId(id_file) {
  const options = {
    method: "GET",
    url: `${host}/documents/listar-archivos/${id_file}`,
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
    const formData = new FormData();
    formData.append("document_name", file.name);
    formData.append("document_type", file.type);
    formData.append("document_size", file.size);
    formData.append("buffer", file.buffer);
    formData.append("id_file", file.id_file);
    formData.append("user_creator", file.user_creator);

    const response = await axios.post(`${host}/documents/subir-archivo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error;
  }
}

async function updateFile(id, id_file, user_editor) {
  const options = {
    method: "PUT",
    url: `${host}/documents/updateIdFile`,
    data: { id: id, id_file: id_file, user_editor: user_editor },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function updateDocumentName(id, name, user_editor) {
  const options = {
    method: "PUT",
    url: `${host}/documents/updateDocumentName`,
    data: { id: id, nombre_archivo: name, user_editor: user_editor },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function deleteDocument(id) {
  const options = {
    method: "DELETE",
    url: `${host}/documents/deleteDocument`,
    data: { id: id },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

async function getAppointment(id_file, id_appointment) {
  const options = {
    method: "GET",
    url: `${host}/documents/getAppointment`,
    params: { id_file: id_file, id_appointment: id_appointment },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return { message: e.response.data.error };
  }
}

export default {
  descargarArchivo,
  getDocuments,
  getDocumentId,
  uploadFile,
  updateFile,
  getAppointment,
  updateDocumentName,
  deleteDocument,
};
