const express = require("express");

const { validateBody, validateParams } = require("../../middleware/validate");
const { objectIdParamSchema, messageUpdateSchema } = require("../../validation/schemas");
const { listAdminMessages, updateAdminMessage, deleteAdminMessage } = require("../../controllers/messageController");

const router = express.Router();

router.get("/", listAdminMessages);
router.patch(
  "/:id",
  validateParams(objectIdParamSchema),
  validateBody(messageUpdateSchema),
  updateAdminMessage
);
router.delete(
  "/:id",
  validateParams(objectIdParamSchema),
  deleteAdminMessage
);

module.exports = router;
