
const http = require('http');
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const { signAdminJwt } = require('./src/utils/jwt');
require('dotenv').config();

async function run() {
    try {
        if (!process.env.MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }
        await mongoose.connect(process.env.MONGODB_URI);
        const admin = await Admin.findOne();
        if (!admin) { console.error("No admin"); process.exit(1); }
        const token = signAdminJwt({ sub: String(admin._id), email: admin.email });
        await mongoose.disconnect();

        const postData = JSON.stringify({
            headline: "Test Headline",
            subtext: "Test Subtext",
            ctaText: "Contact Me",
            published: true
        });

        const options = {
            hostname: 'localhost',
            port: 4000,
            path: '/api/admin/home',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length,
                'Authorization': `Bearer ${token}`
            }
        };

        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => console.log('BODY:', body));
        });
        req.on('error', (e) => console.error(`Problem: ${e.message}`));
        req.write(postData);
        req.end();

    } catch (e) { console.error(e); }
}
run();
