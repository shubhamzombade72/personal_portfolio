const nodemailer = require("nodemailer");

const { getEnv, getEnvBool, getEnvInt } = require("./env");

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = getEnv("SMTP_HOST", { required: false });
  if (!host) return null;

  const port = getEnvInt("SMTP_PORT", { required: false, defaultValue: "587" });
  const secure = getEnvBool("SMTP_SECURE", { required: false, defaultValue: "false" });

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: getEnv("SMTP_USER", { required: false }),
      pass: getEnv("SMTP_PASS", { required: false })
    }
  });

  return cachedTransporter;
}

async function sendMail({ to, subject, text }) {
  const transporter = getTransporter();
  if (!transporter) {
    // Email is optional for local dev; for production you should configure SMTP.
    return { skipped: true };
  }

  const from = getEnv("SMTP_FROM", { required: false, defaultValue: "no-reply@example.com" });

  await transporter.sendMail({
    from,
    to,
    subject,
    text
  });

  return { sent: true };
}

module.exports = { sendMail };
