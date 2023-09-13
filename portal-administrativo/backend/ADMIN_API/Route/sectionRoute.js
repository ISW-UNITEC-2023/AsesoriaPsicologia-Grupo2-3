const express = require("express");
const router = express.Router();

const sections = require("../Controller/sectionController");

router.get("/", sections.getSections);
router.get("/search", sections.InfoSection);

router.put("/update", sections.UpdateSection);
router.post("/create", sections.sectionCreate);
router.delete("/delete", sections.EraseSection);
module.exports = router;
