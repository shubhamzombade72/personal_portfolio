const rateLimit = require("express-rate-limit");

const apiRateLimiters = {
  auth: rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false
  }),
  publicMessages: rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false
  })
};

module.exports = { apiRateLimiters };
