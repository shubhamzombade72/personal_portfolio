
const mongoose = require("mongoose");
const Admin = require("./src/models/Admin");
const bcrypt = require("bcryptjs");

// Load env 
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

async function resetPassword() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        const email = "admin@example.com";
        const newPassword = "password123";

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        let admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("Admin not found, creating new one.");
            admin = new Admin({ email, passwordHash: hash });
        } else {
            console.log("Admin found, updating password.");
            admin.passwordHash = hash;
        }

        await admin.save();
        console.log("Password reset successfully for", email);

        await mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

resetPassword();
