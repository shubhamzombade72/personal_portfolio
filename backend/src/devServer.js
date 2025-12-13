require("dotenv").config();

const app = require("./app");
const { connectToDatabase } = require("./db/mongoose");

const PORT = process.env.PORT || 4000;

async function start() {
  await connectToDatabase();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});
