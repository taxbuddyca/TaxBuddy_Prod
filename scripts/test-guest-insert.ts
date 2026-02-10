
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use admin key
const supabase = createClient(supabaseUrl, supabaseKey);

async function testGuestInsert() {
    console.log("Testing Guest Insert...");
    try {
        const { data, error } = await supabase
            .from("documents")
            .insert({
                file_name: "test_guest_upload.txt",
                file_path: "test/path",
                file_size: 123,
                content_type: "text/plain",
                status: "pending"
                // No user_id
            })
            .select();

        if (error) {
            console.error("Insert Failed:", error);
        } else {
            console.log("Insert Successful:", data);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

testGuestInsert();
