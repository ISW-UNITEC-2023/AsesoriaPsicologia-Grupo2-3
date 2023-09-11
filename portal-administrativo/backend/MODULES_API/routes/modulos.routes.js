const express = require("express");
const router = express.Router();

const modulosController = require("../controllers/modulos.controllers");

router.get("/all", modulosController.getModulos);
router.post("", modulosController.createMod);
router.put("/modNom", modulosController.updateModName);
router.put("/modDes", modulosController.updateModDes);
router.delete("", modulosController.deleteMod);

module.exports = router;
