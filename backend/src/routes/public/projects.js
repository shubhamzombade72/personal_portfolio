const express = require("express");

const Project = require("../../models/Project");
const { createPublicListHandler } = require("../../controllers/publicController");

const router = express.Router();

router.get("/", createPublicListHandler({ Model: Project, sort: { order: 1, createdAt: 1 } }));

module.exports = router;
