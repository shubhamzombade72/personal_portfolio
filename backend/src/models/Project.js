const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, default: 'Web' },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    imageUrls: { type: [String], default: [] },
    liveUrl: { type: String, required: false, default: null },
    githubUrl: { type: String, required: false, default: null },
    order: { type: Number, required: true },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
