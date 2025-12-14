const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: false, default: null },
    iconUrl: { type: String, required: false, default: '' },
    order: { type: Number, required: true },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
