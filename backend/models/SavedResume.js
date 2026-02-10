const mongoose = require("mongoose");

const SavedResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  template: {
    type: String,
    default: "default",
  },

  formData: {
    type: Object, // FULL resume snapshot
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("SavedResume", SavedResumeSchema);
