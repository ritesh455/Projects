const express = require("express");
const { register, login, logout, getMe  } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
