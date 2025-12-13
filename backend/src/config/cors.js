const cors = require("cors");

function parseOrigins() {
  const raw = process.env.CORS_ORIGINS || "";
  const origins = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return new Set(origins);
}

const allowedOrigins = parseOrigins();

const corsMiddleware = cors({
  origin(origin, cb) {
    // Allow non-browser requests (curl, server-to-server)
    if (!origin) return cb(null, true);

    if (allowedOrigins.size === 0) {
      // If not configured, deny browser origins by default.
      const err = new Error("CORS is not configured (CORS_ORIGINS is empty)");
      err.statusCode = 500;
      return cb(err);
    }

    if (allowedOrigins.has(origin)) return cb(null, true);
    const err = new Error("Not allowed by CORS");
    err.statusCode = 403;
    return cb(err);
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
});

module.exports = { corsMiddleware };
