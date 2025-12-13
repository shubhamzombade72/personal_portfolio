const express = require("express");

const Skill = require("../../models/Skill");
const { createPublicListHandler } = require("../../controllers/publicController");

const router = express.Router();

router.get("/", createPublicListHandler({ Model: Skill, sort: { order: 1, createdAt: 1 } }));

module.exports = router;
