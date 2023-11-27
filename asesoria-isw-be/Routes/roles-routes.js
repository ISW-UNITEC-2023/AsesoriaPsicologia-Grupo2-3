const express = require("express");
const router = express.Router();

const rolesController = require("../Controller/roles-controller");

//Post
router.post("/create", rolesController.createRole);
router.post("/assignPrivilege", rolesController.assignPrivilegesToRole);
router.post("/removePrivilege", rolesController.removePrivilegeFromRole);
router.post("/updateName", rolesController.updateRoleName);
router.post("/updateDescription", rolesController.updateRoleDescription);
router.post("/viewPrivileges", rolesController.getRolePrivileges);

//Get
router.get("/viewAll", rolesController.getRoles);

//Delete
router.delete("/delete", rolesController.deleteRole);
router.delete("/deletePrivilege", rolesController.removePrivilegeFromRole);

module.exports = router;
