const express = require("express");
const router = express.Router();

const calendarController = require("../Controller/calendar-controller");

//Post
router.post("/createEvent", calendarController.createEvent);


//Cookies
//router.get("/getCookies", calendarController.getCookie);


//Get
router.get("/getEvents", calendarController.getEvents);




module.exports = router;
