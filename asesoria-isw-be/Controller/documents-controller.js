const documentsServices = require("../Service/documents-services");
const multer = require("multer");
const upload = multer();

async function uploadFile(req, res) {
  const data = {
    nombreArchivo: req.body.document_name,
    tipoArchivo: req.body.document_type,
    tamañoArchivo: req.body.document_size,
    contenidoArchivo: req.body.buffer,
    id_file: req.body.id_file,
    user_creator: req.body.user_creator,
  };

  try {
    await documentsServices.uploadFile(data);
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

async function listFiles(req, res) {
  try {
    const archivos = await documentsServices.listFiles();

    if (archivos.length === 0) {
      return res.status(404).send("No se encontraron archivos");
    }

    res.json(archivos);
  } catch (err) {
    res.status(500).send("Error interno del servidor");
  }
}

async function listFilesId(req, res) {
  const id_file = req.params.id;
  const errors = [];
  try {
    if (!id_file) {
      errors.push({ text: "Por favor ingrese un id_file" });
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
      return;
    }
    const archivo = await documentsServices.listFilesId(id_file);

    if (!archivo) {
      return res.status(404).send("Archivo no encontrado");
    }

    res.json(archivo);
  } catch (err) {
    res.status(500).send("Error interno del servidor");
  }
}

async function updateId_file(req, res) {
  const { id, id_file, user_editor } = req.body;
  const errors = [];
  if (!id) {
    errors.push({ text: "Por favor ingrese un id" });
  }
  if (!id_file) {
    errors.push({ text: "Por favor ingrese un id_file" });
  }
  if (!user_editor) {
    errors.push({ text: "Por favor ingrese un user_editor" });
  }
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    await documentsServices.updateId_file(id, id_file, user_editor);
    res.json({ message: "Archivo actualizado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
}

async function updateId_Appointment(req, res) {
  const { id, id_appointment, user_editor } = req.body;
  const errors = [];
  try {
    if (!id) {
      errors.push({ text: "Por favor ingrese un id" });
    }
    if (!id_appointment) {
      errors.push({ text: "Por favor ingrese un id_appointment" });
    }
    if (!user_editor) {
      errors.push({ text: "Por favor ingrese un user_editor" });
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
      return;
    }
    await documentsServices.updateId_Appointment(
      id,
      id_appointment,
      user_editor
    );
    res.json({ message: "Archivo actualizado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
}

async function updateDocumentName(req, res) {
  const { id, nombre_archivo, user_editor } = req.body;
  const errors = [];
  try {
    if (!id) {
      errors.push({ text: "Por favor ingrese un id" });
    }
    if (!nombre_archivo) {
      errors.push({ text: "Por favor ingrese un nombre_archivo" });
    }
    if (!user_editor) {
      errors.push({ text: "Por favor ingrese un user_editor" });
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
      return;
    }

    await documentsServices.updateDocumentName(id, nombre_archivo, user_editor);
    res.json({ message: "Archivo actualizado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
}

async function getAppointment(req, res) {
  const { id_file, id_appointment } = req.query;
  const errors = [];
  try {
    if (!id_file) {
      errors.push({ text: "Por favor ingrese un id_file" });
    }
    if (!id_appointment) {
      errors.push({ text: "Por favor ingrese un id_appointment" });
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
      return;
    }
    const response = await documentsServices.getAppointment(
      id_file,
      id_appointment
    );
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
}

async function deleteDocument(req, res) {
  const { id } = req.body;
  const errors = [];
  try {
    if (!id) {
      errors.push({ text: "Por favor ingrese un id" });
    }
    if (errors.length > 0) {
      res.status(400).send({ errors });
      return;
    }
    await documentsServices.deleteDocument(id);
    res.json({ message: "Archivo eliminado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  listFiles,
  listFilesId,
  updateId_file,
  updateId_Appointment,
  getAppointment,
  updateDocumentName,
  deleteDocument,
};
