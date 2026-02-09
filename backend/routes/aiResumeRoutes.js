const express = require("express");
const router = express.Router();

const { improveAndSaveResume } = require("../controllers/aiResumeController");
const validateResumeData = require("../middleware/validateResumeData");
const protect = require("../middleware/authMiddleware");

router.post(
  "/improve-and-save",
  protect,
  validateResumeData,
  improveAndSaveResume
);

module.exports = router;
