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
async function createFile(file) {
  return knex("files").insert({
    first_name: file.first_name,
    middle_name: file.middle_name,
    last_name: file.last_name,
    second_surname: file.second_surname,
    birthdate: file.birthdate,
    email: file.email,
    phone_number: file.phone_number,
    address: file.address,
    civil_status: file.civil_status,
    observation: file.observation,
    identidad: file.identidad,
    substance_usage: file.substance_usage,
    id_clinic: file.id_clinic,
    active: file.active,
    user_editor: file.user_editor,
    user_creator: file.user_creator,
  });
}
//Put
async function updateFirstName(file) {
  return knex("files").where("id_file", file.id).update({
    first_name: file.first_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateMiddleName(file) {
  return knex("files").where("id_file", file.id).update({
    middle_name: file.middle_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function existFile(id) {
  let file = await knex("files").where("id_file", id).select("*");
  file = JSON.stringify(file);
  return JSON.parse(file);
}

async function existFilebyEmail(email) {
  let file = await knex("files").where("email", email).andWhere("active", 1).select("*");
  file = JSON.stringify(file);
  return JSON.parse(file);
}


async function updateLastName(file) {
  return knex("files").where("id_file", file.id).update({
    last_name: file.last_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateSecondLastName(file) {
  return knex("files").where("id_file", file.id).update({
    second_surname: file.second_last_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateBirthday(file) {
  return knex("files").where("id_file", file.id).update({
    birthdate: file.birthday,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateAddress(file) {
  return knex("files").where("id_file", file.id).update({
    address: file.address,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateEmail(file) {
  return knex("files").where("id_file", file.id).update({
    email: file.email,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}


async function updatePhoneNumber(file) {
  return knex("files").where("id_file", file.id).update({
    phone_number: file.phone_number,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateIdentidad(file) {
  return knex("files").where("id_file", file.id).update({
    identidad: file.identidad,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateCivilStatus(file) {
  return knex("files").where("id_file", file.id).update({
    civil_status: file.civil_status,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateObservation(file) {
  return knex("files").where("id_file", file.id).update({
    observation: file.observation,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateSubstanceUsage(file) {
  return knex("files").where("id_file", file.id).update({
    substance_usage: file.substance_usage,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateFirstImpressions(file) {
  return knex("files").where("id_file", file.id).update({
    first_impressions: file.first_impressions,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateTreatment(file) {
  return knex("files").where("id_file", file.id).update({
    treatment_plan: file.treatment,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateFilescol(file) {
  return knex("files").where("id_file", file.id).update({
    filescol: file.filescol,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateActive(file) {
  return knex("files").where("id_file", file.id).update({
    active: file.active,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateIdClinic(file) {
  return knex("files").where("id_file", file.id).update({
    id_clinic: file.id_clinic,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function getFileById(id) {
  let file = await knex.select().from("files").where("id_file", id);
  file = JSON.stringify(file);
  return JSON.parse(file);
}

async function getAllFiles() {
  let file = await knex.select().from("files");
  file = JSON.stringify(file);
  return JSON.parse(file);
}

async function getClinicFiles(id) {
  let file = await knex.select().from("files").where("id_clinic", id).andWhere("active", 1);
  file = JSON.stringify(file);
  return JSON.parse(file);
}

//Delete
async function deleteFile(id) {
  return knex("files").where("id_file", id).del();
}

module.exports = {
  createFile,
  updateBirthday,
  updateAddress,
  updateEmail,
  updatePhoneNumber,
  updateIdentidad,
  updateCivilStatus,
  updateObservation,
  updateSubstanceUsage,
  updateFirstImpressions,
  updateTreatment,
  getFileById,
  getClinicFiles,
  deleteFile,
  getAllFiles,
  updateFirstName,
  updateMiddleName,
  existFile,
  updateLastName,
  updateSecondLastName,
  updateFilescol,
  updateActive,
  updateIdClinic,
  existFilebyEmail,
};
