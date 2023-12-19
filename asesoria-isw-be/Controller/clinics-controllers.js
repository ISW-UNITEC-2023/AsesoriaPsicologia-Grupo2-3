const clinicServices = require("../Service/clinics-services");

async function createClinic(req, res) {
  const { name_clinic,user_creator } = req.body;
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
    let clinic_id = await clinicServices.createClinic({
      name: name_clinic,
      active_clinic: 1,
      user_creator: user_creator,
    });
    let id_clinic = `${clinic_id}`;
   
    res.send(clinic_id);
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



async function uploadFile(req, res) {
  const nombreArchivo = req.file.originalname;
  const tipoArchivo = req.file.mimetype;
  const tamañoArchivo = req.file.size;
  const contenidoArchivo = req.file.buffer;
  const id_clinic = req.body.id_clinic;
  const user_creator = req.body.user_creator;

  try {
    await documentsServices.uploadFile(
      nombreArchivo,
      tipoArchivo,
      tamañoArchivo,
      contenidoArchivo,
      id_clinic,
      user_creator
    );
    res.send({ message: "Se agrego exitosamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function downloadFile(req, res) {
  const archivoId = req.params.id;

  try {
    const archivo = await documentsServices.getDownloadFile(archivoId);
    if (!archivo) {
      return res.status(404).send("Archivo no encontrado");
    }

    const contenidoArchivo = archivo.content;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${archivo.document_name}"`
    );
    res.send(contenidoArchivo);
  } catch (err) {
    res.status(500).send("Error interno del servidor");
  }
}



module.exports = {
  createClinic,
  setActiveClinic,
  viewAllClinics,
  existClinic,
  uploadFile,
  downloadFile,
};
