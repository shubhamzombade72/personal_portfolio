
const mongoose = require('mongoose');
const About = require('./src/models/About');
const Home = require('./src/models/Home');
require('dotenv').config();

async function run() {
    try {
        if (!process.env.MONGODB_URI) { console.error("No URI"); process.exit(1); }
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("--- About Collection ---");
        const abouts = await About.find({}).sort({ createdAt: -1 });
        console.log(`Count: ${abouts.length}`);
        abouts.forEach((a, i) => {
            console.log(`[${i}] ID: ${a._id}`);
            console.log(`    Published: ${a.published}`);
            console.log(`    Email: ${a.email}`);
            console.log(`    CreatedAt: ${a.createdAt}`);
        });

        console.log("\n--- Home Collection ---");
        const homes = await Home.find({}).sort({ createdAt: -1 });
        console.log(`Count: ${homes.length}`);
        homes.forEach((h, i) => {
            console.log(`[${i}] ID: ${h._id}`);
            console.log(`    Published: ${h.published}`);
            console.log(`    Headline: ${h.headline}`);
            console.log(`    CreatedAt: ${h.createdAt}`);
        });

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
