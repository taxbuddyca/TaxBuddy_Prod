
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxjpkgthscrupyzigbxl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4anBrZ3Roc2NydXB5emlnYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzY1NTEsImV4cCI6MjA4NjMxMjU1MX0.zQRZKrGu44VWVSq7gC3V6OIMf24s9arRGcmF3p-JExc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const lead = {
    first_name: "Test",
    last_name: "User",
    email: "test@example.com", // Valid email
    phone: "555-555-5555",
    company_name: "Test Corp",
    revenue_range: "$0 - $100k",
    services_interested: ["Bookkeeping"], // Array
    message: "Let me know if there's a day either next week, or on Feb 23rd" // The specific text
};

async function run() {
    console.log("Submitting lead...");
    const { data, error } = await supabase
        .from("leads")
        .insert([lead]);

    if (error) {
        console.error("Error submitting lead:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("Success:", data);
    }
}

run();
