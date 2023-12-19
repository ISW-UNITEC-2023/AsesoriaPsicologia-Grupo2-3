const express = require("express");
const router = express.Router();

const calendarController = require("../Controller/calendar-controller");

//Post
router.post("/create", calendarController.createEvent);


//Put
router.put("/update", calendarController.updateEventById)

//Get
router.get("/get", calendarController.getEvents);
router.get("/getByClinicId/:id", calendarController.getEventsByClinicId)

//Delete
router.delete("/deleteById/:id", calendarController.deleteEventById);


module.exports = router;
