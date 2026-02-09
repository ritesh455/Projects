const mongoose = require("mongoose");

const AIResumeVersionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      location: { type: String, required: true },
      website: { type: String },
      linkedin: { type: String },

      summary: {
        old_summary: { type: String, required: true },
        improved_summary: { type: String, required: true },
      },
    },

    education: [
      {
        qualification: { type: String, required: true },
        institution: { type: String, required: true },
        percentage: { type: String, required: true },
        yearOfPassing: { type: String, required: true },
        branch: { type: String },
      },
    ],

    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        duration: { type: String, required: true },
        technologies: { type: String, required: true },

        description: {
          old_description: { type: String, required: true },
          improved_description: { type: String, required: true },
        },
      },
    ],

    projects: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        technologies: { type: String, required: true },

        description: {
          old_description: { type: String, required: true },
          improved_description: { type: String, required: true },
        },
      },
    ],

    skills: {
      type: [String],
      required: true,
    },

    atsScore: Number,
    aiLatencyMs: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AIResumeVersion",
  AIResumeVersionSchema
);
