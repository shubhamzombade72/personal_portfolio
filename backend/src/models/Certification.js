
const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        issuer: { type: String, required: true },
        year: { type: String, required: true },
        link: { type: String, required: false },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Certification || mongoose.model("Certification", CertificationSchema);
