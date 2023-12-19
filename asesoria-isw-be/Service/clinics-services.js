const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

//Post
async function createClinic(clinic) {
  let clinics = await knex("clinics").insert({
    active_clinic: clinic.active_clinic,
    user_creator: clinic.user_creator,
    name_clinic: clinic.name,
    creation_date: new Date(),
  });
  
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

async function setActiveClinic(clinic) {
  await knex("clinics")
    .update({
      active_clinic: clinic.active_clinic,
      user_editor: clinic.user_editor,
      last_modification: new Date(),
    })
    .where("id_clinic", clinic.id_clinic);
}

//Get
async function viewAllClinics() {
  let clinics = await knex("clinics").select("*");

  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

async function existClinic(id) {
  let clinic = await knex("clinics").select("*").where("id_clinic", id);
  if (clinic.length === 0) {
    return false;
  }
  return true;
}


//funciones para la imagen de clinica

async function uploadFile(
  nombreArchivo,
  tipoArchivo,
  tamañoArchivo,
  contenidoArchivo,
  id_clinic,
  user_creator
) {
  try {
    await knex("clinic_image").insert({
      document_name: nombreArchivo,
      document_type: tipoArchivo,
      document_size: tamañoArchivo,
      content: contenidoArchivo,
      id_clinic: id_clinic,
      user_creator: user_creator,
      creation_date: new Date(),
    });
  } catch (err) {
    throw err;
  }
}

async function getDownloadFile(archivoId) {
  const archivo = await knex("clinic_image")
    .where("idclinic_image", archivoId)
    .first();
  return archivo;
}


module.exports = {
  createClinic,
  setActiveClinic,
  viewAllClinics,
  uploadFile,
  existClinic,
  getDownloadFile
};
