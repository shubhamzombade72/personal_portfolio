const express = require("express");

const { requireAdmin } = require("../middleware/auth");
const { validateBody } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/asyncHandler");
const {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} = require("../validation/schemas");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", validateBody(loginSchema), authController.login);
router.get("/me", requireAdmin, authController.me);
router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  authController.resetPassword
);

module.exports = router;
