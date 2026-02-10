// const express = require("express");
// const router = express.Router();

// const { improveAndSaveResume,getMyResume, } = require("../controllers/aiResumeController");
// const validateResumeData = require("../middleware/validateResumeData");
// const protect = require("../middleware/authMiddleware");

// router.post(
//   "/improve-and-save",
//   protect,
//   validateResumeData,
//   improveAndSaveResume
// );



// /* Fetch current user's resume */
// router.get("/me", protect, getMyResume);

// module.exports = router;



const express = require("express");
const router = express.Router();

const {
  improveAndSaveResume,
  getMyResume,
} = require("../controllers/aiResumeController");

const validateResumeData = require("../middleware/validateResumeData");
const protect = require("../middleware/authMiddleware");
const AIResumeVersion = require("../models/AIResumeVersion");

/* ---------------------------------------
   Improve resume with AI + save
---------------------------------------- */
router.post(
  "/improve-and-save",
  protect,
  validateResumeData,
  improveAndSaveResume
);

/* ---------------------------------------
   Save resume ONLY (NO AI)
---------------------------------------- */
router.post(
  "/save",
  protect,                 // ✅ FIXED
  validateResumeData,      // ✅ KEEP DATA SAFE
  async (req, res) => {
    try {
      const userId = req.user._id;
      const resume = req.body;

      const record = await AIResumeVersion.findOneAndUpdate(
        { userId },
        {
          userId,
          ...resume,
        },
        { new: true, upsert: true }
      );

      res.status(200).json({
        message: "Resume saved successfully",
        data: record,
      });
    } catch (error) {
      console.error("Save Resume Error:", error.message);
      res.status(500).json({
        message: "Failed to save resume",
      });
    }
  }
);

/* ---------------------------------------
   Fetch current user's resume
---------------------------------------- */
router.get("/me", protect, getMyResume);

module.exports = router;
