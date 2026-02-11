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

    const supabase = createAdminClient();
    const fileName = sanitizeFilename(file.name);
    const timestamp = Date.now();
    const filePath = `guest/${timestamp}_${fileName}`;


    try {
        // 1. Upload to Supabase Storage (Using Admin Client to bypass RLS)
        const { error: uploadError } = await supabase.storage
            .from("client-documents")
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error("Storage Upload Error:", uploadError);
            return { error: "Failed to upload file to storage." };
        }

        // 2. Insert into Record into Database (Using Admin Client)
        // We are now inserting with user_id = null (after schema update)
        // And capturing uploader_name and document_type

        const { error: dbError } = await supabase
            .from("documents")
            .insert({
                file_name: file.name,
                file_path: filePath,
                file_size: file.size,
                content_type: file.type,
                status: "pending",
                user_id: null,
                uploader_name: uploaderName,
                document_type: docType
            });

        if (dbError) {
            console.error("DB Insert Error:", dbError);

            // Write to debug log file
            const fs = require('fs');
            const log = `DB Error: ${JSON.stringify(dbError)}\n`;
            fs.appendFileSync('debug.log', log);

            return { error: `DB Insert Failed: ${dbError.message || JSON.stringify(dbError)}` };
        }

        revalidatePath("/admin/documents");
        return { success: true };

    } catch (error: any) {
        console.error("Upload Action Error:", error);

        // Write to debug log file
        const fs = require('fs');
        const log = `Error: ${JSON.stringify(error)}\n`;
        fs.appendFileSync('debug.log', log);

        return { error: error.message || "An unexpected error occurred." };
    }
}

function sanitizeFilename(name: string) {
    return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}
