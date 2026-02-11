import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
    try {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )
    } catch (error) {
        console.error("Failed to initialize Admin Client:", error);
        throw new Error("Could not create Supabase Admin Client");
    }
}
