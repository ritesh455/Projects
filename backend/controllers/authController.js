const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { addToBlacklist } = require("../utils/tokenBlacklist");

/* ===============================
   Generate JWT Token
================================ */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===============================
   REGISTER USER
================================ */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
        isPro: false,
        proExpiresAt: null,
    });

    // ✅ generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token, // 🔥 added
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===============================
   LOGIN USER
================================ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // ✅ generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token, // 🔥 added
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
         isPro: user.isPro,
    proExpiresAt: user.proExpiresAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===============================
   LOGOUT USER (blacklist token)
================================ */
exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    // add token to blacklist
    addToBlacklist(token);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId).select(
      "name email isPro proExpiresAt"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // optional: auto-expire Pro
    if (user.isPro && user.proExpiresAt && user.proExpiresAt < new Date()) {
      user.isPro = false;
      user.proExpiresAt = null;
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error("GetMe error:", error.message);
    res.status(500).json({
      message: "Failed to fetch user info",
    });
  }
};