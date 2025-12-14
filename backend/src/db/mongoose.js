const mongoose = require("mongoose");

const { getEnv } = require("../config/env");

// Serverless-friendly global cache
let cached = global.__MONGOOSE_CONN__;
if (!cached) {
  cached = global.__MONGOOSE_CONN__ = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = getEnv("MONGODB_URI");

    mongoose.set("strictQuery", true);

    const debug = String(process.env.DEBUG_DB || "").toLowerCase() === "true";
    if (debug) {
      // eslint-disable-next-line no-console
      console.log(`[db] Connecting to MongoDB: ${uri}`);
    }

    const clientOptions = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    cached.promise = mongoose
      .connect(uri, clientOptions)
      .then((mongooseInstance) => {
        if (debug) {
          // eslint-disable-next-line no-console
          console.log(`[db] MongoDB connected. db=${mongooseInstance.connection.name}`);
        }
        return mongooseInstance;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[db] MongoDB connection failed", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectToDatabase };
