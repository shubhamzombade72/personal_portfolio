
const express = require("express");
const Certification = require("../../models/Certification");
const { createPublicListHandler } = require("../../controllers/publicController");

const router = express.Router();

router.get("/", createPublicListHandler({ Model: Certification, sort: { order: 1, createdAt: 1 } }));

module.exports = router;
