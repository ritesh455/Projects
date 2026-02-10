const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/pro-status", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId).select(
      "email isPro proExpiresAt"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // optional: auto-expire Pro if date passed
    let isPro = user.isPro;
    let proExpiresAt = user.proExpiresAt;

    if (isPro && proExpiresAt && proExpiresAt < new Date()) {
      isPro = false;
      proExpiresAt = null;
    }

    return res.json({
      email: user.email,
      isPro,
      proExpiresAt,
    });
  } catch (error) {
    console.error("Pro status check error:", error.message);
    res.status(500).json({
      message: "Failed to check Pro status",
    });
  }
});

module.exports = router;
