const express = require("express");
const router = express.Router();

const privilegesControllers = require("../Controller/privileges-controller");

//Get
router.get("/viewAll", privilegesControllers.getPrivileges);

//Post
router.post("/create", privilegesControllers.createPrivilege);
router.post("/updateElement", privilegesControllers.updatePrivilegeElement);
router.post("/updateDescription", privilegesControllers.updateDescription);

//Delete
router.delete("/delete", privilegesControllers.deletePrivilege);

module.exports = router;
