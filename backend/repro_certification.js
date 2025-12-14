
const axios = require('axios');

const API_URL = 'http://localhost:4000/api';

async function run() {
    try {
        console.log("1. Adding Certification via Admin API...");
        const payload = {
            name: "Test Cert " + Date.now(),
            issuer: "Test Issuer",
            year: "2024",
            link: "https://example.com",
            order: 0,
            published: true
        };

        // Note: In a real app we need auth headers, but assuming local dev might be open or we need to login first.
        // However, previous tests used 'test_api_auth_skill.js' logic. 
        // Let's try to hit the endpoint directly if no auth middleware active or mock it.
        // Wait, middleware IS active. I need to login first.

        // Login to get token
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: "admin@example.com",
            password: "password123" // Assuming default or known password
        });
        const token = loginRes.data.token;
        console.log("   Login successful. Token acquired.");

        const resPost = await axios.post(`${API_URL}/admin/certifications`, payload, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("   Add Response:", resPost.status, resPost.data._id);

        console.log("2. Fetching Public Certifications...");
        const resGet = await axios.get(`${API_URL}/public/certifications`);
        console.log("   Public Certs Count:", resGet.data.length);
        const found = resGet.data.find(c => c.name === payload.name);

        if (found) {
            console.log("   SUCCESS: Found certification in public API:", found.name);
        } else {
            console.error("   FAILURE: Did not find certification in public API.");
        }

    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
    }
}

run();
