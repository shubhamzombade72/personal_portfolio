const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
