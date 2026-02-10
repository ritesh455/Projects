module.exports = function validateResumeData(req, res, next) {
  const { personalInfo, experience, projects, skills } = req.body;

  // Helper to safely extract a text string from a field that may be
  // either a plain string or an object like { old_summary, improved_summary }
  const extractText = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") {
      return (
        val.improved_summary || val.improved_description || val.improvedDescription ||
        val.old_summary || val.old_description || val.oldDescription ||
        ""
      );
    }
    return "";
  };

  const summaryText = extractText(personalInfo?.summary);
  if (!summaryText.trim()) {
    return res.status(400).json({
      message: "Professional summary is required",
    });
  }

  if (!Array.isArray(experience) || experience.length === 0) {
    return res.status(400).json({
      message: "At least one experience is required",
    });
  }

  for (const exp of experience) {
    const desc = extractText(exp.description);
    if (!desc.trim()) {
      return res.status(400).json({
        message: "Experience description is required",
      });
    }
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return res.status(400).json({
      message: "At least one project is required",
    });
  }

  for (const proj of projects) {
    const desc = extractText(proj.description);
    if (!desc.trim()) {
      return res.status(400).json({
        message: "Project description is required",
      });
    }
  }

  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      message: "Skills are required",
    });
  }

  next();
};
