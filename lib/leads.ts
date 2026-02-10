import { supabase } from "./supabase";

export interface Lead {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company_name?: string;
    revenue_range?: string;
    referral_source?: string;
    current_accounting_system?: string;
    services_interested?: string[];
    website?: string;
    message?: string;
}

export const submitLead = async (lead: Lead) => {
    const { data, error } = await supabase
        .from("leads")
        .insert([lead])
        .select();

    if (error) {
        console.error("Error submitting lead:", error);
        throw error;
    }

    return data;
};
