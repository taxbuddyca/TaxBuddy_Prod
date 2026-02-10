
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createAdmin() {
    // 1. Read .env.local
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env.local not found!');
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim().replace(/"/g, ''); // Remove quotes if present
        }
    });

    const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
    const serviceRoleKey = env['SUPABASE_SERVICE_ROLE_KEY'];

    if (!supabaseUrl || !serviceRoleKey) {
        console.error('❌ Missing Supabase credentials in .env.local');
        console.log('Found keys:', Object.keys(env));
        process.exit(1);
    }

    // 2. Initialize Supabase Admin Client
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    const email = 'admin@taxbuddy.ca';
    const password = 'TaxBuddyAdmin2024!';

    console.log(`Attempting to create user: ${email}...`);

    // 3. Create User
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'admin' }
    });

    if (error) {
        console.error('❌ Error creating user:', error.message);
        if (error.message.includes('already registered')) {
            console.log('⚠️ User already exists. Try logging in with the existing password.');
            console.log('If you forgot the password, please delete the user from the Supabase dashboard or update the script to update the user.');
        }
    } else {
        console.log('✅ Admin user created successfully!');
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Password: ${password}`);
    }
}

createAdmin();
