
const mongoose = require('mongoose');
const Home = require('./src/models/Home');
require('dotenv').config();

async function run() {
    try {
        if (!process.env.MONGODB_URI) { console.error("No URI"); process.exit(1); }
        await mongoose.connect(process.env.MONGODB_URI);

        const homes = await Home.find({}).sort({ updatedAt: -1 });
        console.log(`Found ${homes.length} Home documents.`);

        if (homes.length > 1) {
            const toKeep = homes[0];
            const toDelete = homes.slice(1);

            console.log(`Keeping latest Home: ${toKeep._id} (${toKeep.headline})`);

            const idsToDelete = toDelete.map(h => h._id);
            const res = await Home.deleteMany({ _id: { $in: idsToDelete } });
            console.log(`Deleted ${res.deletedCount} duplicate Home documents.`);
        } else {
            console.log("No duplicates found.");
        }

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
