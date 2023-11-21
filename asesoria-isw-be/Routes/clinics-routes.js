const express = require("express");
const router = express.Router();

const clinicControllers = require("../Controller/clinics-controllers");

//Post
router.post("/create", clinicControllers.createClinic);
//Put
router.put("/setActive", clinicControllers.setActiveClinic);
//Get
router.get("existClinic", clinicControllers.existClinic);
router.get("/viewAll", clinicControllers.viewAllClinics);
router.get("/viewAllAppointments", clinicControllers.viewAllAppointments);
router.get("/viewAllUser", clinicControllers.viewAllUserClinics);

//delete
router.delete("/delete", clinicControllers.deleteClinic);

//marcados para borrar
router.post("/changePsychologist", clinicControllers.changePsychologist);
router.post("/viewAllSectionClinics", clinicControllers.viewAllSectionClinics);
router.post(
  "/viewAllPsychologistClinics",
  clinicControllers.viewAllPsychologistClinics
);

module.exports = router;
