const Home = require("../../models/Home");
const { homeCreateSchema } = require("../../validation/schemas");
const { createAdminCrudRouter } = require("./crudRouter");

module.exports = createAdminCrudRouter({
  Model: Home,
  createSchema: homeCreateSchema,
  sort: { createdAt: -1 }
});
