const { asyncHandler } = require("../middleware/asyncHandler");

function createPublicListHandler({ Model, sort = { order: 1, createdAt: 1 } }) {
  return asyncHandler(async (req, res) => {
    const items = await Model.find({ published: true }).sort(sort);
    res.json(items);
  });
}

function createPublicSingletonHandler({ Model }) {
  return asyncHandler(async (req, res) => {
    const item = await Model.findOne({ published: true }).sort({ updatedAt: -1, createdAt: -1 });
    res.json(item || null);
  });
}

module.exports = {
  createPublicListHandler,
  createPublicSingletonHandler
};
