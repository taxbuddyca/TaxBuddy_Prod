'use server'

import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadGuestFile(formData: FormData) {
    const file = formData.get("file") as File;
    const uploaderName = formData.get("uploaderName") as string;
    const docType = formData.get("docType") as string;

    if (!file) {
        return { error: "No file provided" };
    }

    console.log(`Starting guest upload: Name=${uploaderName}, Type=${docType}, File=${file.name}, Size=${file.size}`);

    // Debug: Check if Admin Key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing.");
        return { error: "Server Configuration Error: Admin Key missing." };
    }

    const supabase = createAdminClient();
    const fileName = sanitizeFilename(file.name || "unnamed_file");
    const timestamp = Date.now();
    const filePath = `guest/${timestamp}_${fileName}`;

    try {
        // 1. Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from("client-documents")
            .upload(filePath, file, {
                contentType: file.type || 'application/octet-stream',
                upsert: false
            });

        if (uploadError) {
            console.error("Storage Upload Error:", uploadError);
            return { error: `Storage Upload Failed: ${uploadError.message}` };
        }

        // 2. Insert Record into Database
        const sizeMB = (file.size / 1024 / 1024).toFixed(2) + " MB";

        const insertData = {
            file_name: file.name || fileName, // Changed from name to file_name
            file_path: filePath, // Changed from storage_path to file_path
            size: sizeMB,
            status: "pending",
            client_id: null, // Explicit Guest upload
            uploader_name: uploaderName || "Anonymous Guest",
            document_type: docType || "Other"
        };

        console.log("Inserting into DB:", insertData);

        const { error: dbError } = await supabase
            .from("documents")
            .insert(insertData);

        if (dbError) {
            console.error("DB Insert Error:", dbError);
            return { error: `DB Insert Failed: ${dbError.message} (Code: ${dbError.code})` };
        }

        revalidatePath("/admin/documents");
        return { success: true };

    } catch (error: any) {
        console.error("Upload Action Exception:", error);
        return { error: error.message || "An unexpected error occurred during upload." };
    }
}

function sanitizeFilename(name: string) {
    return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}
