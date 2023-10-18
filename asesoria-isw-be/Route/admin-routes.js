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
  console.log(req.signedCookies); // Accede a las cookies firmadas
  //acceder solo a la cookie
  //console.log(req.signedCookies.email);
  res.send("Reading Cookies!");
});

router.get("/deletecookie", (req, res) => {
  console.log(req.signedCookies); // Accede a las cookies firmadas
  res.clearCookie("email"); // Borra la cookie "username"
  res.send("Deleting cookies!");
});

module.exports = router;
