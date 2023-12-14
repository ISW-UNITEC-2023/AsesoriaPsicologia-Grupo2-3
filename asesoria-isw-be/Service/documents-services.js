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

async function uploadFile(
  nombreArchivo,
  tipoArchivo,
  tamañoArchivo,
  contenidoArchivo,
  id_file,
  user_creator
) {
  try {
    await knex("documents").insert({
      document_name: nombreArchivo,
      document_type: tipoArchivo,
      document_size: tamañoArchivo,
      content: contenidoArchivo,
      id_file: id_file,
      user_creator: user_creator,
      creation_date: new Date(),
    });
  } catch (err) {
    throw err;
  }
}

async function getDownloadFile(archivoId) {
  const archivo = await knex("documents")
    .where("id_document", archivoId)
    .first();
  return archivo;
}

async function listFiles() {
  const archivos = await knex("documents").select([
    "id_document",
    "document_name",
    "document_type",
    "document_size",
    "id_file",
    "id_appointment",
    "user_creator",
  ]);
  return archivos;
}

async function listFilesId(id_file) {
  const archivo = await knex("documents")
    .where("id_file", id_file)
    .select([
      "id_document",
      "document_name",
      "document_type",
      "document_size",
      "id_file",
      "id_appointment",
      "user_creator",
    ]);
  return archivo;
}

async function updateId_file(id, id_file, user_editor) {
  const archivo = await knex("documents").where("id_document", id).update({
    id_file: id_file,
    user_editor: user_editor,
    last_modification: new Date(),
  });
  return archivo;
}

async function updateId_Appointment(id, id_appointment, user_editor) {
  const archivo = await knex("documents").where("id_document", id).update({
    id_appointment: id_appointment,
    user_editor: user_editor,
    last_modification: new Date(),
  });
  return archivo;
}

async function updateDocumentName(id, nombre_archivo, user_editor) {
  const archivo = await knex("documents").where("id_document", id).update({
    document_name: nombre_archivo,
    last_modification: new Date(),
    user_editor: user_editor,
  });
  return archivo;
}

async function getAppointment(id_file, id_appointment) {
  const archivo = await knex("documents")
    .where("id_file", id_file)
    .where("id_appointment", id_appointment)
    .select([
      "id_document",
      "document_name",
      "document_type",
      "document_size",
      "id_file",
      "id_appointment",
      "user_creator",
    ]);
  return archivo;
}

async function deleteDocument(id) {
  const archivo = await knex("documents").where("id_document", id).del();
  return archivo;
}

module.exports = {
  uploadFile,
  getDownloadFile,
  listFiles,
  listFilesId,
  updateId_file,
  updateId_Appointment,
  getAppointment,
  updateDocumentName,
  deleteDocument,
};
