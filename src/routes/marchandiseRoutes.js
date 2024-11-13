const express = require("express");
const router = express.Router();
const marchandiseController = require("../controllers/marchandiseController");
const auth = require("../middleware/auth");

router.get("/marchandises", marchandiseController.getAllMarchandises);
router.get("/marchandise/:id", marchandiseController.getMarchandise);
router.post("/createMarchandise", marchandiseController.createMarchandise);
router.put("/updateMarchandise/:id", marchandiseController.updateMarchandise);
router.delete(
  "/deleteMarchandise/:id",
  marchandiseController.deleteMarchandise
);

module.exports = router;
