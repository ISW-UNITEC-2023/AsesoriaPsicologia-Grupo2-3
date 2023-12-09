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
  await knex("clinics").insert({
    active_clinic: clinic.active_clinic,
    user_creator: clinic.user_creator,
    creation_date: new Date(),
  });
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

async function viewAllAppointments(id) {
  let appointments = await knex("clinics")
    .join("appointments", "clinics.id_clinic", "=", "appointments.id_clinic")
    .select("*")
    .where("clinics.id_clinic", id);

  appointments = JSON.stringify(appointments);
  return JSON.parse(appointments);
}

async function deleteClinic(id) {
  await knex("clinics").where("id_clinic", id).del();
}

async function viewAllUserClinics(id) {
  let clinics = await knex("users")
    .join("clinics", "clinics.id_clinic", "=", "users.id_clinic")
    .select(
      "users.id_user",
      "users.name_user",
      "users.email_user",
      "users.number_user",
      "users.active_user",
      "clinics.id_clinic",
      "clinics.active_clinic"
    )
    .where("users.id_user", id);

  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

//Marcados para borrar
async function changePsychologist(clinic) {
  await knex("clinics")
    .update({
      id_psychologist: clinic.psychologist,
      user_editor: clinic.editor,
      last_modification: new Date(),
    })
    .where("id_clinic", clinic.id_clinic);
}

async function viewAllSectionClinics(id) {
  let clinics = await knex("clinics").select("*").where("id_section", id);
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

async function viewAllPsychologistClinics(id) {
  let clinics = await knex("clinics").select("*").where("id_psychologist", id);
  clinics = JSON.stringify(clinics);
  return JSON.parse(clinics);
}

module.exports = {
  createClinic,
  viewAllSectionClinics,
  viewAllPsychologistClinics,
  setActiveClinic,
  changePsychologist,
  viewAllClinics,
  existClinic,
  viewAllAppointments,
  deleteClinic,
  viewAllUserClinics,
};
