const express = require("express");
const router = express.Router();
const admins = require("../Controller/admin-controller");

//GETS
router.get("/", admins.getAdmins);
router.get("/teachers", admins.getTeachers);
router.get("/students", admins.getStudents);

//UPDATE
router.put("/update", admins.updateUser);

//DELETE
router.delete("/delete", admins.deleteAdmin);

//POST
router.post("/register", admins.registerAdmin);
router.post("/login", admins.loginUser);

//COOKIES
router.get("/getCookies", (req, res) => {
  res.send(req.signedCookies);
});

router.get("/deletecookie", (req, res) => {
  res.clearCookie("email"); // Borra la cookie "username"
  res.status(200).send();
});

module.exports = router;
