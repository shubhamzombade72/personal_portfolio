const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
    summary: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    location: { type: String, required: false },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" }
    },
    resumeLink: { type: String, required: false },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.models.About || mongoose.model("About", AboutSchema);
