const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ===============================
   STRIPE WEBHOOK (MUST BE FIRST)
   =============================== */
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  require("./controllers/stripeWebhookController").handleStripeWebhook
);

/* ===============================
   NORMAL MIDDLEWARES
   =============================== */
app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
   =============================== */
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/ai", require("./routes/aiRoutes"));

app.use("/api/ai-resume", require("./routes/aiResumeRoutes"));

app.use("/api/payments", require("./routes/paymentRoutes"));

app.use("/api/pdf", require("./routes/pdfRoutes"));

/* ===============================
   TEST ROUTES (DEV ONLY)
   =============================== */
if (process.env.NODE_ENV === "development") {
  app.use("/api/test", require("./routes/testRoutes"));
}

/* ===============================
   HEALTH CHECK
   =============================== */
app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
