const express = require("express");
const router = express.Router();

const reportController = require("../Controller/reports-controller");

//Get
router.get("/getReport", reportController.getReport);

module.exports = router;