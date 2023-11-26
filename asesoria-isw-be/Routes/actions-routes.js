const express = require("express");
const router = express.Router();

const actionsController = require("../Controller/actions-controller");

//Get
router.get("/", actionsController.getActions);

module.exports = router;