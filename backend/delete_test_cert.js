const mongoose = require("mongoose");
const Certification = require("./src/models/Certification");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

async function deleteTestCert() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        // Find and delete the test certification
        const result = await Certification.deleteOne({
            name: "Test Cert 1765659192868"
        });

        if (result.deletedCount > 0) {
            console.log("✅ Successfully deleted test certification");
        } else {
            console.log("⚠️  Test certification not found");
        }

        // Show remaining certifications
        const remaining = await Certification.find({});
        console.log("\nRemaining certifications:", remaining.length);
        remaining.forEach(cert => {
            console.log(`  - ${cert.name} (${cert.issuer}, ${cert.year})`);
        });

        await mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

deleteTestCert();
