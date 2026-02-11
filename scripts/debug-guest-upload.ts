
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Admin key
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function debugGuestUpload() {
    console.log("Debugging Guest Upload Logic...");

    try {
        // 1. Check for users
        console.log("Listing users...");
        const { data: { users }, error: userError } = await supabase.auth.admin.listUsers({ perPage: 5 });

        if (userError) {
            console.error("Error listing users:", userError);
            return;
        }

        console.log(`Found ${users.length} users.`);
        if (users.length > 0) {
            console.log("First user ID:", users[0].id);
        } else {
            console.error("No users found! Cannot proceed with guest upload logic.");
            return;
        }

        const guestUserId = users[0].id;

        // 2. Try to insert document
        console.log(`Attempting insert with user_id: ${guestUserId}`);
        const { data, error: dbError } = await supabase
            .from("documents")
            .insert({
                file_name: "debug_test_file.txt",
                file_path: "debug/test_path",
                file_size: 123,
                content_type: "text/plain",
                status: "pending",
                user_id: guestUserId
            })
            .select();

        if (dbError) {
            console.error("DB Insert Error:", dbError);
        } else {
            console.log("Insert Successful:", data);
        }

    } catch (e) {
        console.error("Exception:", e);
    }
}

debugGuestUpload();
