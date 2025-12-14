const cors = require("cors");

function parseOrigins() {
  const raw = process.env.CORS_ORIGINS;
  const defaultOrigins = [
    "https://shubhamzombade-portfolio.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ];

  if (!raw) return new Set(["*", ...defaultOrigins]);

  const origins = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return new Set([...origins, ...defaultOrigins]);
}

const allowedOrigins = parseOrigins();

const corsMiddleware = cors({
  origin(origin, cb) {
    // Allow non-browser requests (curl, server-to-server)
    if (!origin) return cb(null, true);

    if (allowedOrigins.has("*") || allowedOrigins.has(origin)) {
      return cb(null, true);
    }

    const err = new Error("Not allowed by CORS");
    err.statusCode = 403;
    return cb(err);
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
});

module.exports = { corsMiddleware };
