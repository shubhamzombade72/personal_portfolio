const Message = require("../models/Message");
const Admin = require("../models/Admin");

const { getEnv } = require("../config/env");
const { sendMail } = require("../config/mailer");
const { asyncHandler } = require("../middleware/asyncHandler");

const createPublicMessage = asyncHandler(async (req, res) => {
  const created = await Message.create({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  // Notify admin (best-effort; message is still stored even if email is skipped)
  let to = process.env.ADMIN_EMAIL;
  const admin = await Admin.findOne({}).select("email");
  if (admin?.email) to = admin.email;

  if (to) {
    const subject = `New portfolio message from ${created.name}`;
    const text = [
      `Name: ${created.name}`,
      `Email: ${created.email}`,
      "",
      created.message
    ].join("\n");

    await sendMail({ to, subject, text });
  } else {
    // If ADMIN_EMAIL isn't set and no admin exists, surface misconfig in logs via env helper.
    getEnv("ADMIN_EMAIL", { required: false });
  }

  res.status(201).json({ ok: true });
});

const listAdminMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

const updateAdminMessage = asyncHandler(async (req, res) => {
  const updated = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updated) return res.status(404).json({ error: "Not found" });
  return res.json(updated);
});

const deleteAdminMessage = asyncHandler(async (req, res) => {
  const deleted = await Message.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  return res.json({ ok: true });
});

module.exports = {
  createPublicMessage,
  listAdminMessages,
  updateAdminMessage,
  deleteAdminMessage
};
