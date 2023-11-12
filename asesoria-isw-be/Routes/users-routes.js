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

//Cookies
router.get("/getCookies", userController.getCookie);

//Get
router.get("/viewUsers", userController.getAllusers);
router.get("/viewTeachers", userController.getTeachers);
router.get("/viewRoles", userController.getAllUsersRoles);
//COOKIES

router.get("/getCookies", userController.getCookie);
router.post("/getRoles", userController.getUserRoles)


//COOKIES

router.get("/getCookies", userController.getCookie);
router.delete("/removeCookie", userController.removeCookie);

//obtener los roles de usuario por id

//Delete
router.delete("/removeRole", userController.removeRole);
router.delete("/deleteCookies", userController.deleteCookies);

module.exports = router;
