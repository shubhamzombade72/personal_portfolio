function createCrudController({ Model, sort = { createdAt: -1 } }) {
  return {
    list: async (req, res) => {
      const items = await Model.find({}).sort(sort);
      res.json(items);
    },

    create: async (req, res) => {
      const debug = String(process.env.DEBUG_DB || "").toLowerCase() === "true";
      if (debug) {
        // eslint-disable-next-line no-console
        console.log(`[crud:${Model.modelName}] create body`, req.body);
      }

      const created = await Model.create(req.body);

      if (debug) {
        // eslint-disable-next-line no-console
        console.log(`[crud:${Model.modelName}] created id=${created._id.toString()}`);
      }

      res.status(201).json(created);
    },

    getById: async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: "Not found" });
      return res.json(item);
    },

    updateById: async (req, res) => {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.json(updated);
    },

    deleteById: async (req, res) => {
      const deleted = await Model.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Not found" });
      return res.status(204).send();
    }
  };
}

module.exports = { createCrudController };
