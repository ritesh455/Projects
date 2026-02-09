const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/ai", require("./routes/aiRoutes")); // 👈 AI Magic Button

app.use("/api/ai-resume", require("./routes/aiResumeRoutes"));


// Health check
app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
