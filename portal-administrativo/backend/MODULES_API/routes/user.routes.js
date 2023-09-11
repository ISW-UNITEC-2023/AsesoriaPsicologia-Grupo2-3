const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/list", userController.getUserList);

module.exports = router;
