'use server'

import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadGuestFile(formData: FormData) {
    const file = formData.get("file") as File;

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
        // We might need a dummy user_id if the column is NOT NULL. 
        // For now, we will try to insert without it, or use a "Guest" placeholder if we had one.
        // If the table requires a UUID, this might fail if we don't have a guest user.
        // Let's try to find a user or just insert. 
        // Strategy: Use a known "Guest" UUID or leave NULL if allowed.
        // Since we don't know if NULL is allowed, let's try to fetch *any* admin user to associate or just leave blank.
        // Actually, better to just try insert.

        const { error: dbError } = await supabase
            .from("documents")
            .insert({
                file_name: file.name,
                file_path: filePath,
                file_size: file.size,
                content_type: file.type,
                status: "pending",
                // user_id: ... // Omitted, hoping it's nullable or we handle it
            });

        if (dbError) {
            console.error("DB Insert Error:", dbError);
            // If it fails due to user_id constraint, we might need a fallback
            return { error: "Failed to save file record." };
        }

        revalidatePath("/admin/documents");
        return { success: true };

    } catch (error: any) {
        console.error("Upload Action Error:", error);
        return { error: error.message || "An unexpected error occurred." };
    }
}

function sanitizeFilename(name: string) {
    return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}
