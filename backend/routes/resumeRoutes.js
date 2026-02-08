const router = require("express").Router();
const { saveResume } = require("../controllers/resumeController");

router.post("/save", saveResume);

module.exports = router;
