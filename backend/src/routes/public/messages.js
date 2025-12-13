const express = require("express");

const { validateBody } = require("../../middleware/validate");
const { messageCreateSchema } = require("../../validation/schemas");
const { createPublicMessage } = require("../../controllers/messageController");

const router = express.Router();

router.post("/", validateBody(messageCreateSchema), createPublicMessage);

module.exports = router;
