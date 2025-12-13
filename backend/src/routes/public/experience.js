const express = require("express");

const Experience = require("../../models/Experience");
const { createPublicListHandler } = require("../../controllers/publicController");

const router = express.Router();

router.get("/", createPublicListHandler({ Model: Experience, sort: { order: 1, createdAt: 1 } }));

module.exports = router;
