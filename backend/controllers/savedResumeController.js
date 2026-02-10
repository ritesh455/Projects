const SavedResume = require("../models/SavedResume");
const AIResumeVersion = require("../models/AIResumeVersion");

/* 1️⃣ SAVE CURRENT ACTIVE RESUME */
exports.saveResumeVersion = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, description, template } = req.body;

    const activeResume = await AIResumeVersion.findOne({ userId });

    if (!activeResume) {
      return res.status(400).json({
        message: "No active resume to save",
      });
    }

    await SavedResume.create({
      userId,
      name,
      description,
      template,
      formData: activeResume.toObject(),
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({
      message: "Failed to save resume version",
    });
  }
};

/* 2️⃣ GET LIST OF SAVED RESUMES */
exports.getSavedResumes = async (req, res) => {
  try {
    const userId = req.user._id;

    const resumes = await SavedResume.find({ userId })
      .select("name description template createdAt")
      .sort({ createdAt: -1 });

    res.json({ data: resumes });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch saved resumes",
    });
  }
};

/* 3️⃣ LOAD SAVED RESUME → REPLACE ACTIVE TEST RESUME */
exports.getSavedResumeById = async (req, res) => {
  try {
    const userId = req.user._id;
    const resumeId = req.params.id;

    const savedResume = await SavedResume.findOne({
      _id: resumeId,
      userId,
    });

    if (!savedResume) {
      return res.status(404).json({
        message: "Saved resume not found",
      });
    }

    await AIResumeVersion.findOneAndUpdate(
      { userId },
      savedResume.formData,
      { upsert: true }
    );

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({
      message: "Failed to load saved resume",
    });
  }
};
