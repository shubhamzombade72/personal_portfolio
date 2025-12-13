const express = require("express");

const About = require("../../models/About");
const { createPublicSingletonHandler } = require("../../controllers/publicController");

const router = express.Router();

router.get("/", createPublicSingletonHandler({ Model: About }));

module.exports = router;
