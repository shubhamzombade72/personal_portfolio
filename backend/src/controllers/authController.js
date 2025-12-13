const Admin = require("../models/Admin");

const { getEnv } = require("../config/env");
const { sendMail } = require("../config/mailer");
const { asyncHandler } = require("../middleware/asyncHandler");
const { signAdminJwt } = require("../utils/jwt");
const { hashPassword, verifyPassword } = require("../utils/password");
const { generateToken, sha256 } = require("../utils/crypto");

async function ensureSingleAdminBootstrapped() {
  const count = await Admin.countDocuments();

  if (count === 0) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      const err = new Error(
        "No admin user exists yet. Set ADMIN_EMAIL and ADMIN_PASSWORD to bootstrap the single admin."
      );
      err.statusCode = 500;
      throw err;
    }

    const passwordHash = await hashPassword(password);
    await Admin.create({ email: String(email).toLowerCase(), passwordHash });
    return;
  }

  if (count > 1) {
    const err = new Error("Invalid state: more than one admin user exists");
    err.statusCode = 500;
    throw err;
  }
}

function buildResetUrl(token) {
  const template = getEnv("ADMIN_RESET_URL", { required: false });
  if (!template) return null;

  if (template.includes("{token}")) return template.replace("{token}", token);

  const joinChar = template.includes("?") ? "&" : "?";
  return `${template}${joinChar}token=${encodeURIComponent(token)}`;
}

const login = asyncHandler(async (req, res) => {
  await ensureSingleAdminBootstrapped();

  const email = req.body.email.toLowerCase();
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(req.body.password, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signAdminJwt({ sub: String(admin._id), email: admin.email });
  return res.json({ token });
});

const me = asyncHandler(async (req, res) => {
  // req.admin comes from JWT middleware
  res.json({ admin: req.admin });
});

const forgotPassword = asyncHandler(async (req, res) => {
  await ensureSingleAdminBootstrapped();

  const email = req.body.email.toLowerCase();
  const admin = await Admin.findOne({ email });

  // Always return 200 to avoid account enumeration.
  if (!admin) return res.json({ ok: true });

  const rawToken = generateToken(32);
  const tokenHash = sha256(rawToken);

  admin.resetPasswordTokenHash = tokenHash;
  admin.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await admin.save();

  const resetUrl = buildResetUrl(rawToken);
  const subject = "Reset your admin password";
  const text = resetUrl
    ? `A password reset was requested for your admin account.\n\nReset link: ${resetUrl}\n\nIf you did not request this, ignore this email.`
    : `A password reset was requested for your admin account.\n\nToken: ${rawToken}\n\nIf you did not request this, ignore this email.`;

  await sendMail({
    to: admin.email,
    subject,
    text
  });

  return res.json({ ok: true });
});

const resetPassword = asyncHandler(async (req, res) => {
  await ensureSingleAdminBootstrapped();

  const tokenHash = sha256(req.body.token);

  const admin = await Admin.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpiresAt: { $gt: new Date() }
  });

  if (!admin) return res.status(400).json({ error: "Invalid or expired token" });

  admin.passwordHash = await hashPassword(req.body.newPassword);
  admin.resetPasswordTokenHash = null;
  admin.resetPasswordExpiresAt = null;
  await admin.save();

  return res.json({ ok: true });
});

module.exports = {
  ensureSingleAdminBootstrapped,
  login,
  me,
  forgotPassword,
  resetPassword
};
