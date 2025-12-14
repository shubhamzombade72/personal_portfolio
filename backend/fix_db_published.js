
const mongoose = require('mongoose');
const About = require('./src/models/About');
const Home = require('./src/models/Home');
require('dotenv').config();

async function run() {
    try {
        if (!process.env.MONGODB_URI) { console.error("No URI"); process.exit(1); }
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Updating Abouts...");
        const resA = await About.updateMany({}, { $set: { published: true } });
        console.log("Abouts Updated:", resA.modifiedCount);

        console.log("Updating Homes...");
        const resH = await Home.updateMany({}, { $set: { published: true } });
        console.log("Homes Updated:", resH.modifiedCount);

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
