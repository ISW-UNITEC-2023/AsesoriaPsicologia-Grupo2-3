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
  return await knex("files").insert({
    id_patient: file.patient,
    birthday: file.birthday,
    address: file.address,
    user_creator: file.creator,
  });
}
//Put
async function updateFirstName(file) {
  return await knex("files").where("id_file", file.id).update({
    first_name: file.first_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateMiddleName(file) {
  return await knex("files").where("id_file", file.id).update({
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

async function updateLastName(file) {
  return await knex("files").where("id_file", file.id).update({
    last_name: file.last_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateSecondLastName(file) {
  return await knex("files").where("id_file", file.id).update({
    second_surname: file.second_last_name,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateBirthday(file) {
  return await knex("files").where("id_file", file.id).update({
    birthdate: file.birthday,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateAddress(file) {
  return await knex("files").where("id_file", file.id).update({
    address: file.address,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateCivilStatus(file) {
  return await knex("files").where("id_file", file.id).update({
    civil_status: file.civil_status,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateMedicalHistory(file) {
  return await knex("files").where("id_file", file.id).update({
    medical_history: file.medical_history,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateSubstanceUsage(file) {
  return await knex("files").where("id_file", file.id).update({
    substance_usage: file.substance_usage,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateFirstImpressions(file) {
  return await knex("files").where("id_file", file.id).update({
    first_impressions: file.first_impressions,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateTreatment(file) {
  return await knex("files").where("id_file", file.id).update({
    treatment_plan: file.treatment,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateFilescol(file) {
  return await knex("files").where("id_file", file.id).update({
    filescol: file.filescol,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateActive(file) {
  return await knex("files").where("id_file", file.id).update({
    active: file.active,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function updateIdClinic(file) {
  return await knex("files").where("id_file", file.id).update({
    id_clinic: file.id_clinic,
    user_editor: file.editor,
    last_modification: new Date(),
  });
}

async function getFileById(id) {
  let file = await knex("files").where("id_file", id).select("*");
  file = JSON.stringify(file);
  return JSON.parse(file);
}

async function getPatientFiles(id) {
  let file = await knex("files").where("id_patient", id).select("*");
  file = JSON.stringify(file);
  return JSON.parse(file);
}

//Delete
async function deleteFile(id) {
  return await knex("files").where("id_file", id).del();
}

module.exports = {
  createFile,
  updateBirthday,
  updateAddress,
  updateCivilStatus,
  updateMedicalHistory,
  updateSubstanceUsage,
  updateFirstImpressions,
  updateTreatment,
  getFileById,
  getPatientFiles,
  deleteFile,
  updateFirstName,
  updateMiddleName,
  existFile,
  updateLastName,
  updateSecondLastName,
  updateFilescol,
  updateActive,
  updateIdClinic,
};
