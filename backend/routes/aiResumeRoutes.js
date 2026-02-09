const express = require("express");
const router = express.Router();

const { improveAndSaveResume,getMyResume, } = require("../controllers/aiResumeController");
const validateResumeData = require("../middleware/validateResumeData");
const protect = require("../middleware/authMiddleware");

router.post(
  "/improve-and-save",
  protect,
  validateResumeData,
  improveAndSaveResume
);

/* Fetch current user's resume */
router.get("/me", protect, getMyResume);

module.exports = router;
