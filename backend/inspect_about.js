
const mongoose = require('mongoose');
const About = require('./src/models/About');
require('dotenv').config();

async function run() {
    try {
        if (!process.env.MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }
        await mongoose.connect(process.env.MONGODB_URI);

        const items = await About.find({});
        console.log("About Items in DB:", items.length);
        items.forEach(item => {
            console.log("ID:", item._id);
            console.log("Email:", item.email);
            console.log("Resume:", item.resumeLink ? (item.resumeLink.substring(0, 50) + "...") : "None");
            console.log("Socials:", item.socials);
        });

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
