const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  saveResumeVersion,
  getSavedResumes,
  getSavedResumeById,
} = require("../controllers/savedResumeController");

router.post("/save", protect, saveResumeVersion);
router.get("/", protect, getSavedResumes);
// router.get("/:id", protect, getSavedResumeById);
router.post("/:id/load", protect, getSavedResumeById);

module.exports = router;
