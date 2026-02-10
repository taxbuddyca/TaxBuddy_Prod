
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfiles() {
    console.log("Checking profiles table...");
    try {
        // Select from documents to check schema (by trying to insert a dummy record or just selecting)
        // We'll just select one to see what we get, but checking schema via simple query is hard in supabase-js w/o introspection.
        // We'll try to insert a row with NULL user_id and see if it fails (using dry-run/rollback if possible, or just catch error).
        // Actually, let's just inspect the error if we try to select.
        const { data, error } = await supabase.from('documents').select('*').limit(1);
        if (error) {
            console.error("Error accessing documents:", error.message);
        } else {
            console.log("Documents table exists. Sample:", data);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

checkProfiles();
