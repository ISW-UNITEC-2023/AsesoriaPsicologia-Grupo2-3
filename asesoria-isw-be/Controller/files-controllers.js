const fileServices = require("../Service/files_services");
const { isEmail, isPassword } = require("../Utils/validator");

async function createFile(req, res) {
  const {
    first_name,
    middle_name,
    last_name,
    second_surname,
    birthdate,
    email,
    phone_number,
    address,
    civil_status,
    observation,
    substance_usage,
    id_clinic,
    active,
    user_editor,
    user_creator,
    identidad,
  } = req.body;
  const errorMessages = [];

  const lengFname = first_name.toString();
  const lengMname = middle_name.toString();
  const lengSname = second_surname.toString();
  const lengLname = last_name.toString();

  const lengemail = email.toString();
  const lengphone_number = parseInt(phone_number, 10);

  const lengAdress = address.toString();
  const lengCstatus = civil_status.toString();
  const lengSubtance = substance_usage.toString();
  const lengactive = active.toString();
  const lengObservation = observation.toString();
  const lengIdentidad = identidad.toString();

  if (isNaN(lengphone_number) || !Number.isInteger(lengphone_number)) {
    errorMessages.push(
      "El campo de numeor de telefono esta mal debe ser un numero de celular"
    );
  }

  if (!isEmail(email)) {
    errorMessages.push("El correo electrónico no es valido");
  }

  if (
    lengFname.length > 45 ||
    lengFname.length == 0 ||
    typeof first_name != "string"
  ) {
    errorMessages.push(
      "Primer nombre invalido, solo debe mas de 1 caracter pero menos de 45 caracteres "
    );
  }

  if (
    lengMname.length > 45 ||
    lengMname.length == 0 ||
    typeof middle_name != "string"
  ) {
    errorMessages.push(
      "Segundo nombre invalido, solo debe mas de 1 caracter pero menos de 45 caracteres "
    );
  }

  if (
    lengLname.length > 45 ||
    lengLname.length == 0 ||
    typeof last_name != "string"
  ) {
    errorMessages.push(
      "Primer apellido invalido, solo debe mas de 1 caracter pero menos de 45 caracteres "
    );
  }

  if (
    lengSname.length > 45 ||
    lengSname.length == 0 ||
    typeof second_surname != "string"
  ) {
    errorMessages.push(
      "Segundo apellido invalido, solo debe mas de 1 caracter pero menos de 45 caracteres "
    );
  }

  if (
    lengAdress.length > 100 ||
    lengAdress.length == 0 ||
    typeof address != "string"
  ) {
    errorMessages.push(
      "La direccion es invalida, debe contener mas de un caracter pero menos de 100 caractes"
    );
  }

  if (
    lengCstatus.length > 10 ||
    lengCstatus.length == 0 ||
    typeof civil_status != "string"
  ) {
    errorMessages.push(
      "El estado civil es invalido, debe contener mas de 1 caracter pero menos de 10 caracteres"
    );
  }

  if (
    lengSubtance.length > 200 ||
    lengSubtance.length == 0 ||
    typeof substance_usage != "string"
  ) {
    errorMessages.push(
      'El campo de "Sustancias de uso" es invalido, debe contener mas de 1 caracter pero menos de 200 caracteres'
    );
  }

  if (lengactive > 1) {
    errorMessages.push("El campo de activo debe ser un numero 1 o 0");
  }

  if (lengObservation > 500) {
    errorMessages.push("El campo de observaciones es muy largo");
  }

  if (lengIdentidad.length > 13 || lengIdentidad.length == 0) {
    errorMessages.push(
      "El campo de identidad es invalido, debe contener mas de 1 caracter pero menos de 13 caracteres"
    );
  }

  if (errorMessages.length) {
    res.status(400).send({ error: errorMessages });
  } else {
    try {
      await fileServices.createFile({
        first_name,
        middle_name,
        last_name,
        second_surname,
        birthdate,
        email,
        phone_number,
        address,
        civil_status,
        observation,
        substance_usage,
        id_clinic,
        active,
        user_editor,
        user_creator,
        identidad,
      });
      res.send({ message: "Se ha creado el expediente" });
    } catch (error) {
      res.send({
        message: "Error",
        error: error.message,
      });
    }
  }
}

async function updateFirstName(req, res) {
  const { id, first_name, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!first_name) {
    errors.push("Falta el primer nombre");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateFirstName({ id, first_name, editor });
    res.send({ message: "Se ha actualizado el primer nombre" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateMiddleName(req, res) {
  const { id, middle_name, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!middle_name) {
    errors.push("Falta el segundo nombre");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateMiddleName({ id, middle_name, editor });
    res.send({ message: "Se ha actualizado el segundo nombre" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateLastName(req, res) {
  const { id, last_name, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!last_name) {
    errors.push("Falta el primer apellido");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateLastName({ id, last_name, editor });
    res.send({ message: "Se ha actualizado el primer apellido" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function existFile(req, res) {
  const { id } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const file = await fileServices.existFile(id);
    res.send({
      fileInfo: file,
      message: "Se ha recuperado la información del archivo",
    });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateSecondLastName(req, res) {
  const { id, second_last_name, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!second_last_name) {
    errors.push("Falta el segundo apellido");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateSecondLastName({ id, second_last_name, editor });
    res.send({ message: "Se ha actualizado el segundo apellido" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateBirthday(req, res) {
  const { id, birthday, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!birthday) {
    errors.push("Falta la fecha de nacimiento");
  } else {
    const isValidDate = !isNaN(Date.parse(birthday));
    if (!isValidDate) {
      errors.push("La fecha de nacimiento no es válida");
    }
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateBirthday({ id, birthday, editor });
    res.send({ message: "Se ha actualizado la fecha de nacimiento" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}
//
async function updateAddress(req, res) {
  const { id, address, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!address) {
    errors.push("Falta la dirección");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateAddress({ id, address, editor });
    res.send({ message: "Se ha actualizado la dirección" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateCivilStatus(req, res) {
  const { id, civil_status, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!civil_status) {
    errors.push("Falta el estado civil");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateCivilStatus({ id, civil_status, editor });
    res.send({ message: "Se ha actualizado el estado civil" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateObservation(req, res) {
  const { id, observation, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  if (!observation) {
    errors.push("Faltan las observaciones");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateObservation({ id, observation, editor });
    res.send({ message: "Se ha actualizado el historial médico" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateFirstImpressions(req, res) {
  const { id, first_impressions, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (!first_impressions) {
    errors.push("Falta las primeras impresiones");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateFirstImpressions({
      id,
      first_impressions,
      editor,
    });
    res.send({ message: "Se ha actualizado las primeras impresiones" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateSubstanceUsage(req, res) {
  const { id, substance_usage, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (!substance_usage) {
    errors.push("Falta el consumo de sustancias");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateSubstanceUsage({ id, substance_usage, editor });
    res.send({ message: "Se ha actualizado el consumo de sustancias" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateTreatment(req, res) {
  const { id, treatment, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);

  if (!treatment) {
    errors.push("Falta el plan de tratamiento");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el editor");
  }

  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateTreatment({ id, treatment, editor });
    res.send({ message: "Se ha actualizado el plan de tratamiento" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function getFileById(req, res) {
  const { id } = req.query;
  try {
    const file = await fileServices.getFileById(id);
    res.send({
      fileInfo: file,
      message: "Se ha recuperado la información del archivo",
    });
  } catch (error) {
    res.send({
      message: "No fue posible recuperar la información del archivo",
      error: error.message,
    });
  }
}

async function getAllFiles(req, res) {
  try {
    const file = await fileServices.getAllFiles();
    res.send(file);
  } catch (error) {
    res.send({ message: "Error", error: error.message });
  }
}

async function updateFilescol(req, res) {
  const { id, filescol, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);
  if (!filescol) {
    errors.push("Falta el expediente");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }
  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el id editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateFilescol({ id, filescol, editor });
    res.send({ message: "Se ha actualizado el expediente" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function getClinicFiles(req, res) {
  const clinics_id = req.query.id;

  try {
    const file = await fileServices.getClinicFiles(clinics_id);
    res.send({
      fileInfo: file,
      message: "Se han recuperado los archivos del paciente",
    });
  } catch (error) {
    res.send({
      message: "No fue posible recuperar los archivos del paciente",
      error: error.message,
    });
  }
}

async function updateActive(req, res) {
  const { id, active, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericActive = parseInt(active, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericActive) || !Number.isInteger(numericActive)) {
    errors.push("Falta el active del expediente");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }
  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el id editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateActive({ id, active, editor });
    res.send({ message: "Se ha actualizado el estado del expediente" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function deleteFile(req, res) {
  const { id } = req.body;

  try {
    await fileServices.deleteFile(id);
    res.send({ message: "Se ha eliminado el archivo" });
  } catch (error) {
    res.send({
      message: "No fue posible eliminar el archivo",
      error: error.message,
    });
  }
}

async function updateIdClinic(req, res) {
  const { id, id_clinic, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericIdClinic = parseInt(id_clinic, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericIdClinic) || !Number.isInteger(numericIdClinic)) {
    errors.push("Falta el id de la clínica");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }
  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el id editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateIdClinic({ id, id_clinic, editor });
    res.send({ message: "Se ha actualizado la clínica del expediente" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateEmail(req, res) {
  const { id, email, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);
  if (!email) {
    errors.push("Falta el email del expediente");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }
  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el id editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateEmail({ id, email, editor });
    res.send({ message: "Se ha actualizado el email del expediente" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updatePhoneNumber(req, res) {
  const { id, phone_number, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericEditor = parseInt(editor, 10);
  if (!phone_number) {
    errors.push("Falta el numero de telefono del expediente");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }
  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el id editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updatePhoneNumber({ id, phone_number, editor });
    res.send({
      message: "Se ha actualizado el numero de telefono del expediente",
    });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

async function updateIdentidad(req, res) {
  const { id, identidad, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericIdentidad = parseInt(identidad, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericIdentidad) || !Number.isInteger(numericIdentidad)) {
    errors.push("Falta la identidad del expediente");
  }

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id del expediente");
  }
  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el id editor");
  }
  const file = await fileServices.existFile(id);
  if (file.length === 0) {
    errors.push("No existe el expediente");
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await fileServices.updateIdentidad({ id, identidad, editor });
    res.send({ message: "Se ha actualizado la identidad del expediente" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });
  }
}

module.exports = {
  createFile,
  updateBirthday,
  updateAddress,
  updateCivilStatus,
  updateObservation,
  updateEmail,
  updatePhoneNumber,
  updateIdentidad,
  updateFirstImpressions,
  updateSubstanceUsage,
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
};
