const express = require("express");

const { createCrudController } = require("../../controllers/crudController");
const { asyncHandler } = require("../../middleware/asyncHandler");
const { validateBody, validateParams } = require("../../middleware/validate");
const { objectIdParamSchema } = require("../../validation/schemas");

function createAdminCrudRouter({ Model, createSchema, sort }) {
  const router = express.Router();
  const controller = createCrudController({ Model, sort });

  router.get("/", asyncHandler(controller.list));
  router.post("/", validateBody(createSchema), asyncHandler(controller.create));

  router.use((req, res, next) => {
    console.log(`[CRUD Router] ${req.method} ${req.originalUrl}`, JSON.stringify(req.body));
    next();
  });

  router.get("/:id", validateParams(objectIdParamSchema), asyncHandler(controller.getById));

  // Support both PUT and PATCH for updates
  const updateHandler = [
    validateParams(objectIdParamSchema),
    validateBody(createSchema.partial()),
    asyncHandler(controller.updateById)
  ];
  router.put("/:id", ...updateHandler);
  router.patch("/:id", ...updateHandler);
  router.delete("/:id", validateParams(objectIdParamSchema), asyncHandler(controller.deleteById));

  return router;
}

module.exports = { createAdminCrudRouter };
