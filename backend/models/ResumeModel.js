const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  resumeData: Object,
});

module.exports = mongoose.model("Resume", ResumeSchema);
