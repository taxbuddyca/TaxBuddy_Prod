
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Admin key
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBucket() {
    console.log("Checking Storage Buckets...");
    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            console.error("Error listing buckets:", error);
            return;
        }

        console.log("Existing buckets:", buckets.map(b => b.name));

        const bucketName = "client-documents";
        const exists = buckets.some(b => b.name === bucketName);

        if (!exists) {
            console.log(`Bucket '${bucketName}' does not exist. Creating it...`);
            const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
                public: false,
                fileSizeLimit: 10485760, // 10MB
                allowedMimeTypes: ['image/png', 'image/jpeg', 'application/pdf']
            });

            if (createError) {
                console.error("Failed to create bucket:", createError);
            } else {
                console.log(`Bucket '${bucketName}' created successfully.`);
            }
        } else {
            console.log(`Bucket '${bucketName}' already exists.`);
        }

    } catch (e) {
        console.error("Exception:", e);
    }
}

checkBucket();
