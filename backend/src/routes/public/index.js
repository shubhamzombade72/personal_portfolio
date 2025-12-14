const express = require("express");

const homeRoutes = require("./home");
const aboutRoutes = require("./about");
const skillsRoutes = require("./skills");
const projectsRoutes = require("./projects");
const experienceRoutes = require("./experience");
const messagesRoutes = require("./messages");

const router = express.Router();

router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/skills", skillsRoutes);
router.use("/projects", projectsRoutes);
router.use("/experience", experienceRoutes);
router.use("/certifications", require("./certifications"));

router.use("/messages", messagesRoutes);
router.use("/contact", messagesRoutes);

module.exports = router;
