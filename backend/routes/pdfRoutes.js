const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const proMiddleware = require("../middleware/proMiddleware");
const { generatePdf } = require("../controllers/pdfController");

// ⚠️ METHOD MUST MATCH
router.post(
  "/download",
  authMiddleware,
  proMiddleware,
  generatePdf
);

module.exports = router;
