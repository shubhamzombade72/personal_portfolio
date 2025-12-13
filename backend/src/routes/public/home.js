const express = require("express");

const Home = require("../../models/Home");
const { createPublicSingletonHandler } = require("../../controllers/publicController");

const router = express.Router();

router.get("/", createPublicSingletonHandler({ Model: Home }));

module.exports = router;
