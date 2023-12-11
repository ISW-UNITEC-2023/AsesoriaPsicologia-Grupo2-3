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
//obtiene las citas de la clinica
router.get("/viewAllAppointments", clinicControllers.viewAllAppointments);
//obtiene la clinica del usuario
router.get("/viewAllUser", clinicControllers.viewAllUserClinics);

//delete
router.delete("/delete", clinicControllers.deleteClinic);

module.exports = router;
