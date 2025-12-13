const Project = require("../../models/Project");
const { projectCreateSchema } = require("../../validation/schemas");
const { createAdminCrudRouter } = require("./crudRouter");

module.exports = createAdminCrudRouter({
  Model: Project,
  createSchema: projectCreateSchema,
  sort: { order: 1, createdAt: 1 }
});
