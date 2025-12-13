const express = require("express");

const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const publicRoutes = require("./public");

const router = express.Router();

router.get("/api/health", (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

router.use("/api/auth", authRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/public", publicRoutes);

module.exports = router;
