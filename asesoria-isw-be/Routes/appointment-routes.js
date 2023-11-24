const express = require("express");
const router = express.Router();

const appointmentControllers = require("../Controller/appointment-controller");

//POST
router.post("/create", appointmentControllers.createAppointment);

//PUT
router.put("/updateOrder", appointmentControllers.updateOrder);
router.put("/updatePayment", appointmentControllers.updatePaymentMedic);
router.put("/updateObservations", appointmentControllers.updateObservations);
router.put("/updateAppointment", appointmentControllers.updateAppointment);
router.put("/updateState", appointmentControllers.updateStateMedic);

//Get

router.get("/getAll", appointmentControllers.getAppointments);
router.get("/getById", appointmentControllers.getAppointmentById);

//Delete
router.delete("/deleteById", appointmentControllers.deleteAppointment);

module.exports = router;