const express = require("express");
const router = express.Router();

const appointmentControllers = require("../Controller/appointment-controller");

//POST
router.post("/create", appointmentControllers.createAppointment);

//PUT
router.put("/addConsultation", appointmentControllers.addConsultation);
router.put("/updateOrder", appointmentControllers.updateOrder);
router.put("/updatePayment", appointmentControllers.updatePaymentMedic);
router.put("/updateObservations", appointmentControllers.updateObservations);
router.put("/updateAppointment", appointmentControllers.updateAppointment);
router.put("/updateState", appointmentControllers.updateStateMedic);
router.put("/updateHour", appointmentControllers.updateHour);
router.put("/updatePaymentType", appointmentControllers.updatePaymentTypeMedic);

router.put("/updateZoomLink", appointmentControllers.updateZoomLink);

//Get

router.get("/getAll", appointmentControllers.getAppointments);
router.get("/getById/:id", appointmentControllers.getById);
router.get("/getCreator", appointmentControllers.getCreator);
router.get("/getDoctor", appointmentControllers.getDoctor);
router.get("/getClinic", appointmentControllers.getClinic);

router.get("/getChequeo", appointmentControllers.getChequeo);
//Delete
router.delete("/deleteById/:id", appointmentControllers.deleteAppointment);

module.exports = router;
