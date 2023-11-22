const express = require("express");
const router = express.Router();

const fileControllers = require("../Controller/files-controllers");

//Post
router.post("/create", fileControllers.createFile);

//Put
router.put("/updateFirtName", fileControllers.updateFirstName);
router.put("/updateMiddleName", fileControllers.updateMiddleName);
router.put("/updateLastName", fileControllers.updateLastName);
router.put("/updateSecondName", fileControllers.updateSecondLastName);
router.put("/updateBirthday", fileControllers.updateBirthday);
router.put("/updateAddress", fileControllers.updateAddress);
router.put("/updateCivilStatus", fileControllers.updateCivilStatus);
router.put("/updateMedicalHistory", fileControllers.updateMedicalHistory);
router.put("/updateFirstImpresions", fileControllers.updateFirstImpressions);
router.put("/updateSubstanceUsage", fileControllers.updateSubstanceUsage);
router.put("/updateTreatment", fileControllers.updateTreatment);
router.put("/updateFilescol", fileControllers.updateFilescol);
router.put("/updateAcive", fileControllers.updateActive);
router.put("/updateIdClinic", fileControllers.updateIdClinic);

router.post("/getPatientFiles", fileControllers.getPatientFiles);

//Get
router.get("/existFile", fileControllers.existFile);
router.get("/getFileById", fileControllers.getFileById);
router.get("/getClinicFiles", fileControllers.getClinicFiles);

//Delete
router.delete("/delete", fileControllers.deleteFile);

module.exports = router;
