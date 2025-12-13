const Experience = require("../../models/Experience");
const { experienceCreateSchema } = require("../../validation/schemas");
const { createAdminCrudRouter } = require("./crudRouter");

module.exports = createAdminCrudRouter({
  Model: Experience,
  createSchema: experienceCreateSchema,
  sort: { order: 1, createdAt: 1 }
});
