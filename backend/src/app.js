const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const { corsMiddleware } = require("./config/cors");
const { connectToDatabase } = require("./db/mongoose");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const { apiRateLimiters } = require("./middleware/rateLimit");
const routes = require("./routes");

const app = express();

// Security + basics
app.disable("x-powered-by");
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging (disable in Vercel if you want; harmless to keep)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// Ensure MongoDB is connected for each request in serverless mode
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    next(err);
  }
});

// Targeted rate limits
app.use("/api/auth", apiRateLimiters.auth);
app.use("/api/public/messages", apiRateLimiters.publicMessages);
app.use("/api/public/contact", apiRateLimiters.publicMessages);

// Optional request logging for debugging (keep off by default)
if (String(process.env.DEBUG_HTTP || "").toLowerCase() === "true") {
  app.use((req, res, next) => {
    const hasAuth = Boolean(req.headers.authorization);
    // eslint-disable-next-line no-console
    console.log(`[http] ${req.method} ${req.originalUrl} content-type=${req.headers["content-type"] || ""} auth=${hasAuth}`);
    // eslint-disable-next-line no-console
    console.log("[http] body=", req.body);
    next();
  });
}

// Routes
app.use(routes);

// 404 + errors
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
