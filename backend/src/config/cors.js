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
    // Allow everything to ensure connection works
    return cb(null, true);
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
});

module.exports = { corsMiddleware };
