// const express = require("express");
// const { improveBulletPoint } = require("../controllers/aiController");

// const router = express.Router();

// router.post("/improve", improveBulletPoint);

// module.exports = router;


const express = require("express");
const {
  improveBulletPoint,
  generateCoverLetter,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");
const requirePro = require("../middleware/proMiddleware");

const router = express.Router();

/* ===============================
   FREE / BASIC FEATURE
   =============================== */
// router.post("/improve", protect, improveBulletPoint);
router.post("/improve", improveBulletPoint);

/* ===============================
   PRO-ONLY FEATURE
   =============================== */
router.post(
  "/cover-letter",
  protect,
  requirePro,
  generateCoverLetter
);

module.exports = router;