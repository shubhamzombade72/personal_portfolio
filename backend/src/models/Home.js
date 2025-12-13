const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    subtext: { type: String, required: true },
    ctaText: { type: String, required: true },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Home || mongoose.model("Home", HomeSchema);
