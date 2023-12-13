const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../Controller/documents-controller");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/descargar-archivo/:id", controller.downloadFile);
router.get("/listar-archivos", controller.listFiles);
router.get("/listar-archivos/:id", controller.listFilesId);
router.get("/getAppointment", controller.getAppointment);

router.post("/subir-archivo", upload.single("archivo"), controller.uploadFile);

router.put("/updateIdFile", controller.updateId_file);
router.put("/updateIdAppointment", controller.updateId_Appointment);
router.put("/updateDocumentName", controller.updateDocumentName);

router.delete("/deleteDocument", controller.deleteDocument);

module.exports = router;
