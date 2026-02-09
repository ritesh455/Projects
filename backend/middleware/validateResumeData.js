module.exports = function validateResumeData(req, res, next) {
  const { personalInfo, experience, projects, skills } = req.body;

  if (!personalInfo?.summary?.trim()) {
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
    if (!exp.description?.trim()) {
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
    if (!proj.description?.trim()) {
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
