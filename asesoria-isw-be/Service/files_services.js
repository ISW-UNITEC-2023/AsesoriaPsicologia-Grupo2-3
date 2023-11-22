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
    first_name: file.first_name,
    middle_name: file.middle_name,
    last_name: file.last_name,
    second_surname: file.second_surname,
    birthdate: file.birthdate,
    address: file.address,
    civil_status: file.civil_status,
    medical_history: file.medical_history,
    substance_usage: file.substance_usage,
    first_impressions: file.first_impressions,
    treatment_plan: file.treatment_plan,
    filescol: file.filescol,
    id_clinic: file.id_clinic,
    active: file.active,
    user_editor:file.user_editor,
    user_creator: file.user_creator,
  });
}

async function updateBirthday(file) {
  return await knex("files").where("id_file", file.id).update({
    birthday: file.birthday,
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

async function getFileById(id) {
  let file = await knex.select()
  .from('files').where("id_file", id)
  file = JSON.stringify(file);
  return JSON.parse(file);
}

async function getClinicFiles(id){
  let file = await knex.select().from('files').where("id_clinic", id)
  
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
  getClinicFiles,
  deleteFile
};
