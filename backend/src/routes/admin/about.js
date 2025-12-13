const About = require("../../models/About");
const { aboutCreateSchema } = require("../../validation/schemas");
const { createAdminCrudRouter } = require("./crudRouter");

module.exports = createAdminCrudRouter({
  Model: About,
  createSchema: aboutCreateSchema,
  sort: { createdAt: -1 }
});
