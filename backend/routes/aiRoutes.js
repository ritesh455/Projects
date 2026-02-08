const express = require("express");
const { improveBulletPoint } = require("../controllers/aiController");

const router = express.Router();

router.post("/improve", improveBulletPoint);

module.exports = router;
