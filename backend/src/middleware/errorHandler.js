const { ZodError } = require("zod");

function notFoundHandler(req, res) {
  res.status(404).json({ error: "Not Found" });
}

function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const _next = next;

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.issues
    });
  }

  if (err && err.name === "CastError") {
    return res.status(400).json({ error: "Invalid id" });
  }

  if (err && err.name === "ValidationError") {
    return res.status(400).json({ error: "Validation error", details: err.errors });
  }

  if (err && err.code === 11000) {
    return res.status(409).json({ error: "Duplicate key" });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500 ? "Internal Server Error" : err.message;

  // eslint-disable-next-line no-console
  if (statusCode >= 500) console.error(err);

  // Return specific error details if debugging is enabled
  if (process.env.DEBUG_ERRORS === "true" || process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      error: message,
      debug_error: err.message,
      stack: err.stack
    });
  }

  return res.status(statusCode).json({ error: message });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
