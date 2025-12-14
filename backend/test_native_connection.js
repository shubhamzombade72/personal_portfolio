const { MongoClient, ServerApiVersion } = require('mongodb');

// Using the password found in previous test files
const uri = "mongodb+srv://szombade4589v_db_user:aq3iDtbQ7zMZ8z1F@portfolio.hj1jne3.mongodb.net/?appName=portfolio";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log("Attempting to connect...");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
