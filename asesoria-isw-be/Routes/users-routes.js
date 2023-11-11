const express = require("express");
const router = express.Router();

const userController = require("../Controller/users-controller");

//Post
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/updateName", userController.updateUserName);
router.post("/updateEmail", userController.updateUserEmail);
router.post("/updatePhone", userController.updateUserPhone);
router.post("/updatePassword", userController.updateUserPassword);
router.post("/changeActive", userController.updateUserActive);
router.post("/assignRole", userController.assignRole);

//Get
router.get("/viewUsers", userController.getAllusers);
router.get("/viewTeachers", userController.getTeachers);

//COOKIES

router.get("/getCookies", userController.getCookie);
//obtener los roles de usuario por id
router.get("/getRoles", userController.getRoles);
router.post("/getRoles", userController.getUserRoles)

//Get
router.get("/viewUsers", userController.getAllusers);
router.get("/viewRoles", userController.getAllUsersRoles);

//Delete
router.delete("/removeRole", userController.removeRole);

module.exports = router;
