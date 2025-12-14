
const mongoose = require('mongoose');
const About = require('./src/models/About');
require('dotenv').config();

async function run() {
    try {
        if (!process.env.MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }
        await mongoose.connect(process.env.MONGODB_URI);

        const items = await About.find({}).sort({ createdAt: -1 });
        console.log(`Found ${items.length} items.`);

        // Keep the most recent one, delete others
        if (items.length > 1) {
            for (let i = 1; i < items.length; i++) {
                console.log(`Deleting duplicate ID: ${items[i]._id}`);
                await About.deleteOne({ _id: items[i]._id });
            }
            console.log("Cleanup complete. Kept ID:", items[0]._id);
        } else {
            console.log("No duplicates found.");
        }

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
