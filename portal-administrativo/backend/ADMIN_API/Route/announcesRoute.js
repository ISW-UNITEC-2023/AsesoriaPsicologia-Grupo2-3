const express = require("express");
const router = express.Router();

const announces = require("../Controller/announcesController");

//GETS
router.get("/users", announces.GetAnnounForUsers);
router.get("/sections", announces.GetAnnounForSections);
router.get("/users/search", announces.GetAnnounceUser);
router.get("/sections/search", announces.GetAnnnounceSection);

//UPDATE
router.put("/update/title", announces.UpdateAnnounceTitle);
router.put("/update/title", announces.UpdateAnnounceDescrip);

//DELETE
router.delete("/delete", announces.DeleteAnnounce);

//POST
router.post("/create", announces.CreateAnnounce);

module.exports = router;
