const express = require("express");
const router = express.Router();
const multer = require("multer");
const clinicControllers = require("../Controller/clinics-controllers");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Post
router.post("/create", clinicControllers.createClinic);
//Put
router.put("/setActive", clinicControllers.setActiveClinic);
//Get
router.get("existClinic", clinicControllers.existClinic);

router.get("/viewAll", clinicControllers.viewAllClinics);


router.get("/descargar-archivo/:id", clinicControllers.downloadFile);

router.post("/subir-archivo", upload.single("archivo"), clinicControllers.uploadFile);

module.exports = router;
