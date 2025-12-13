const express = require("express");

const { requireAdmin } = require("../../middleware/auth");

const homeRoutes = require("./home");
const aboutRoutes = require("./about");
const skillsRoutes = require("./skills");
const projectsRoutes = require("./projects");
const experienceRoutes = require("./experience");
const messagesRoutes = require("./messages");

const router = express.Router();

// Protect everything under /api/admin/*
router.use(requireAdmin);

router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/skills", skillsRoutes);
router.use("/projects", projectsRoutes);
router.use("/experience", experienceRoutes);
router.use("/messages", messagesRoutes);

module.exports = router;
