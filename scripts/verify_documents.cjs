const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local manually
const envPath = path.resolve(__dirname, '..', '.env.local');
let envConfig = {};
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            envConfig[match[1].trim()] = value;
        }
    });
} catch (e) {
    console.error("Could not read .env.local:", e.message);
}

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key (truncated):", supabaseKey ? supabaseKey.substring(0, 10) + "..." : "MISSING");

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars in .env.local.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDocuments() {
    console.log("--- Checking for null name records ---");
    const { data: broken, error: errFetch } = await supabase
        .from('documents')
        .select('*')
        .is('name', null);

    if (broken && broken.length > 0) {
        console.log(`Deleting ${broken.length} records with null name...`);
        const { error: errDel } = await supabase.from('documents').delete().is('name', null);
        if (errDel) console.error("Delete Error:", errDel);
        else console.log("Deletion successful.");
    } else {
        console.log("No broken records found.");
    }
}

verifyDocuments();
