const fileServices = require("../Service/files_services");

async function createFile(req, res) {
  const { first_name, middle_name, last_name, second_surname ,birthdate,address,civil_status,medical_history,substance_usage,
  first_impressions,treatment_plan,filescol,id_clinic,active,user_editor,user_creator} = req.body;
  const errorMessages=[];

  const lengFname = first_name.toString();
  const lengMname = middle_name.toString();
  const lengSname = second_surname.toString();
  const lengLname = last_name.toString();

  const lengAdress = address.toString();
  const lengCstatus = civil_status.toString();
  const lengMedical = medical_history.toString();
  const lengSubtance = substance_usage.toString();
  const lengFimpressions = first_impressions.toString();
  const lengTreatment = treatment_plan.toString();
  const lengFiles = filescol.toString();
  const lengactive = active.toString();
  
  

  if(lengFname.length > 45 ||lengFname.length == 0  || typeof first_name != "string")
  {
    errorMessages.push("Primer nombre invalido, solo debe mas de 1 caracter pero menos de 45 caracteres ")
  }

  if(lengMname.length > 45 ||lengMname.length == 0  || typeof middle_name != "string")
  {
    errorMessages.push("Segundo nombre invalido, solo debe mas de 1 caracter pero menos de 45 caracteres ")
  }
  
  if(lengLname.length > 45 ||lengLname.length == 0 || typeof last_name != "string")
  {
    errorMessages.push("Primer apellido invalido, solo debe mas de 1 caracter pero menos de 45 caracteres ")
  }

  if(lengSname.length > 45 ||lengSname.length == 0 || typeof second_surname != "string")
  {
    errorMessages.push("Segundo apellido invalido, solo debe mas de 1 caracter pero menos de 45 caracteres ")
  }

  if(lengAdress.length > 100 ||lengAdress.length == 0 || typeof address != "string")
  {
    errorMessages.push("La direccion es invalida, debe contener mas de un caracter pero menos de 100 caractes")
  }

  if(lengCstatus.length > 10 ||lengCstatus.length == 0 || typeof civil_status != "string")
  {
    errorMessages.push("El estado civil es invalido, debe contener mas de 1 caracter pero menos de 10 caracteres")
  }

  if(lengMedical.length > 500 ||lengMedical.length == 0 || typeof medical_history != "string")
  {
    errorMessages.push("Historial medico es invalido, debe contener mas de 1 caracter pero menos de 500 caracteres")
  }

  if(lengSubtance.length > 200 ||lengSubtance.length == 0 || typeof substance_usage != "string")
  {
    errorMessages.push("El campo de \"Sustancias de uso\" es invalido, debe contener mas de 1 caracter pero menos de 200 caracteres")
  }

  if(lengFimpressions.length > 500 ||lengFimpressions.length == 0 || typeof first_impressions != "string")
  {
    errorMessages.push("El campo de \"primeras impresiones\" es invalido, debe contener mas de 1 caracter pero menos de 500 caracteres")
  }
  
  if(lengTreatment.length > 500||lengTreatment.length == 0  || typeof treatment_plan != "string")
  {
    errorMessages.push("El campo de \"plan de tratamiento\" es invalido, debe contener mas de 1 caracter pero menos de 500 caracteres")
  }

  if(lengFiles.length > 45 ||lengFiles.length == 0 || typeof filescol != "string")
  {
    errorMessages.push("El campo de \"filescol\" es invalido, debe contener mas de 1 caracter pero menos de 45 caracteres")
  }

  if(lengactive > 1)
  {
    errorMessages.push("El campo de activo debe ser un numero 1 o 0")
  }
  
  if(errorMessages.length){
    res.status(400).send({error: errorMessages});
  }else{
    try {
      await fileServices.createFile({ first_name, middle_name, last_name, second_surname ,birthdate,address,civil_status,medical_history,substance_usage,
        first_impressions,treatment_plan,filescol,id_clinic,active,user_editor, user_creator });
      res.send({ message: "Se ha creado el expediente" });
    } catch (error) {
      res.send({
        message: "Error",
        error: error.message,
      });
    }
  }
}

async function updateBirthday(req, res) {
  const { id, birthday, editor } = req.body;

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

async function updateAddress(req, res) {
  const { id, address, editor } = req.body;

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

async function updateMedicalHistory(req, res) {
  const { id, medical_history, editor } = req.body;

  try {
    await fileServices.updateMedicalHistory({ id, medical_history, editor });
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

  try {
    await fileServices.updateFirstImpressions({ id, first_impressions, editor });
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

async function getFileById(req, res){
  const file_id = req.query.id;

  try {
    const file = await fileServices.getFileById(file_id);
    res.send({ fileInfo: file, message: "Se ha recuperado la información del archivo" });
  } catch (error) {
    res.send({
      message: "Error",
      error: error.message,
    });

  }
}

async function getClinicFiles(req, res){
  const clinics_id = req.query.id;

  try{
    const file = await fileServices.getClinicFiles(clinics_id);
    res.send({ fileInfo: file, message: "Se han recuperado los archivos del paciente" })
  }catch(error){
    res.send({
      message: "No fue posible recuperar los archivos del paciente",
      error: error.message
    })
  }
}

async function deleteFile(req, res){
  const { id } = req.body;

  try{
    await fileServices.deleteFile(id);
    res.send({ message: "Se ha eliminado el archivo" })
  }catch(error){
    res.send({
      message: "No fue posible eliminar el archivo",
      error: error.message
    })
  }
}

module.exports = {
  createFile,
  updateBirthday,
  updateAddress,
  updateCivilStatus,
  updateMedicalHistory,
  updateFirstImpressions,
  updateSubstanceUsage,
  updateTreatment,
  getFileById,
  getClinicFiles,
  deleteFile
};
