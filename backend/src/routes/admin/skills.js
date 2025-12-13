const Skill = require("../../models/Skill");
const { skillCreateSchema } = require("../../validation/schemas");
const { createAdminCrudRouter } = require("./crudRouter");

module.exports = createAdminCrudRouter({
  Model: Skill,
  createSchema: skillCreateSchema,
  sort: { order: 1, createdAt: 1 }
});
