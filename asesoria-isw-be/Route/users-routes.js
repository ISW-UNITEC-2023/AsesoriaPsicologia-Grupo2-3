const express = require("express");
const router = express.Router();

const userController = require("../Controller/users-controller");

//get
router.get("/", userController.getUser);
router.get("/list", userController.getUserList);
router.get("/admins", userController.getAdminsList);
router.get("/teachers",userController.getTeachersList);
router.get("/students",userController.getStudentsList);
router.get("/patients",userController.getPatientsList);

//post
router.post("/register", userController.registerUser)

//put
router.put("/update", userController.updateUserAdmin)
router.put("/updatePassword", userController.updateUserPassword)
router.put("/updateEmail", userController.updateUserEmail)

//delete
router.delete("/delete", userController.deleteUser)

module.exports = router;
