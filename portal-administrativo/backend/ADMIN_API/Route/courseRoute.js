const express = require("express");
const router = express.Router();

const course = require("../Controller/courseController");

//GETS
router.get("/", course.GetCourses);

module.exports = router;
