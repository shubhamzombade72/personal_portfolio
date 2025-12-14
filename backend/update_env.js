const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const newMongoUri = 'mongodb+srv://szombade4589v_db_user:aq3iDtbQ7zMZ8z1F@portfolio.hj1jne3.mongodb.net/?appName=portfolio';

// Read existing .env file if it exists
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Existing .env file found');
} else {
    console.log('📄 Creating new .env file');
}

// Update or add MONGODB_URI
const lines = envContent.split('\n');
let updated = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('MONGODB_URI=')) {
        lines[i] = `MONGODB_URI=${newMongoUri}`;
        updated = true;
        console.log('✏️  Updated existing MONGODB_URI');
        break;
    }
}

if (!updated) {
    lines.push(`MONGODB_URI=${newMongoUri}`);
    console.log('➕ Added new MONGODB_URI');
}

// Write back to .env
const newContent = lines.join('\n');
fs.writeFileSync(envPath, newContent);

console.log('✅ .env file updated successfully!');
console.log('\nYour MongoDB URI has been set to:');
console.log(newMongoUri.replace(/:[^:@]+@/, ':****@'));
