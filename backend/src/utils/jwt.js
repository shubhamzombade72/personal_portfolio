const jwt = require("jsonwebtoken");

const { getEnv } = require("../config/env");

function signAdminJwt(payload) {
  const secret = getEnv("JWT_SECRET");
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyJwt(token) {
  const secret = getEnv("JWT_SECRET");
  return jwt.verify(token, secret);
}

module.exports = {
  signAdminJwt,
  verifyJwt
};
