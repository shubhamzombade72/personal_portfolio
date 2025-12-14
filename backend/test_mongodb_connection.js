const mongoose = require("mongoose");

// Your new MongoDB URI
const MONGODB_URI = "mongodb+srv://szombade4589v_db_user:aq3iDtbQ7zMZ8z1F@portfolio.hj1jne3.mongodb.net/?appName=portfolio";

console.log("🔄 Testing MongoDB connection...");
console.log("URI:", MONGODB_URI.replace(/:[^:@]+@/, ":****@")); // Hide password in logs

mongoose.set("strictQuery", true);

mongoose
    .connect(MONGODB_URI)
    .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully!");
        console.log("Database name:", mongooseInstance.connection.name);
        console.log("Host:", mongooseInstance.connection.host);
        console.log("Port:", mongooseInstance.connection.port);
        console.log("Ready state:", mongooseInstance.connection.readyState);

        // Close the connection
        return mongoose.connection.close();
    })
    .then(() => {
        console.log("✅ Connection closed gracefully");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:");
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        if (err.reason) {
            console.error("Reason:", err.reason);
        }
        process.exit(1);
    });
