
const { createAdminCrudRouter } = require("./crudRouter");
const Certification = require("../../models/Certification");
const { certificationCreateSchema } = require("../../validation/schemas");

const router = createAdminCrudRouter({
    Model: Certification,
    createSchema: certificationCreateSchema,
    sort: { order: 1, createdAt: 1 }
});

module.exports = router;
