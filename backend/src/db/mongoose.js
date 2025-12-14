const mongoose = require("mongoose");

// Serverless-friendly global cache
let cached = global.__MONGOOSE_CONN__;
if (!cached) {
  cached = global.__MONGOOSE_CONN__ = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables");
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);

    const debug = String(process.env.DEBUG_DB || "").toLowerCase() === "true";
    if (debug) {
      console.log("[db] Connecting to MongoDB...");
    }

    cached.promise = mongoose
      .connect(uri)
      .then((mongooseInstance) => {
        console.log("[db] MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("[db] MongoDB connection failed", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectToDatabase };
