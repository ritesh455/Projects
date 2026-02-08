const Resume = require("../models/ResumeModel");

exports.saveResume = async (req, res) => {
  const resume = new Resume({ resumeData: req.body });
  await resume.save();
  res.json({ message: "Saved" });
};
