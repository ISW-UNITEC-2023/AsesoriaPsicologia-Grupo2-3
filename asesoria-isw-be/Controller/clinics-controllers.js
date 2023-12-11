const clinicServices = require("../Service/clinics-services");

async function createClinic(req, res) {
  const { user_creator } = req.body;
  const errors = [];

  const numericId = parseInt(user_creator, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el user_creator de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await clinicServices.createClinic({
      active_clinic: 1,
      user_creator: user_creator,
    });
    res.send({ message: "Se ha creado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function setActiveClinic(req, res) {
  const { id, active, editor } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);
  const numericActive = parseInt(active, 10);
  const numericEditor = parseInt(editor, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id_clinic de la clinica");
  }

  if (isNaN(numericActive) || !Number.isInteger(numericActive)) {
    errors.push("Falta el active_clinic de la clinica");
  }

  if (isNaN(numericEditor) || !Number.isInteger(numericEditor)) {
    errors.push("Falta el user_editor de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  const exist = await clinicServices.existClinic(id);
  if (!exist) {
    res.status(400).send({ message: "No existe la clinica" });
    return;
  }

  try {
    await clinicServices.setActiveClinic({
      id_clinic: id,
      active_clinic: active,
      user_editor: editor,
    });
    res.send({ message: "Se ha actualizado la clinica exitosamente" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function viewAllAppointments(req, res) {
  const { id } = req.query;
  const errors = [];

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id_clinic de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  const exist = await clinicServices.existClinic(id);
  if (!exist) {
    res.status(400).send({ message: "No existe la clinica" });
    return;
  }

  try {
    const clinics = await clinicServices.viewAllAppointments(id);
    res.send({ clinicsInfo: clinics });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllClinics(req, res) {
  try {
    const clinics = await clinicServices.viewAllClinics();
    res.send({ clinicsInfo: clinics });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function existClinic(req, res) {
  const { id } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id_clinic de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const exist = await clinicServices.existClinic(id);
    res.send({ exist: exist });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function deleteClinic(req, res) {
  const { id } = req.body;
  const errors = [];

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id_clinic de la clinica");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  const exist = await clinicServices.existClinic(id);
  if (!exist) {
    res.status(400).send({ message: "No existe la clinica" });
    return;
  }

  try {
    await clinicServices.deleteClinic(id);
    res.send({ message: "Se ha eliminado la clinica exitosamente" });
  } catch (err) {
    res.send({ message: err.message });
  }
}

async function viewAllUserClinics(req, res) {
  const { id } = req.query;

  const errors = [];

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || !Number.isInteger(numericId)) {
    errors.push("Falta el id_user del usuario");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const clinics = await clinicServices.viewAllUserClinics(id);
    res.send({ clinicsInfo: clinics });
  } catch (err) {
    res.send({ message: err.message });
  }
}



module.exports = {
  createClinic,
  setActiveClinic,
  viewAllClinics,
  existClinic,
  viewAllAppointments,
  deleteClinic,
  viewAllUserClinics,
};
