
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTable() {
    console.log("Inspecting 'documents' table...");
    // We can't easily query information_schema via JS client without a stored procedure.
    // But we can try to select * and see the keys of returned object, 
    // OR we can try to insert a dummy object with extra keys and see error,
    // OR we can rely on standard supabase practices.

    // Attempt 1: RPC call to arbitrary sql? (Usually disabled)

    // Attempt 2: Just try to select one row (we know there is one from debug script)
    const { data, error } = await supabase.from('documents').select('*').limit(1);

    if (data && data.length > 0) {
        console.log("Columns found in existing row:", Object.keys(data[0]));
    } else {
        console.log("No rows to inspect columns from.");
        console.log("Error if any:", error);
    }
}

inspectTable();
