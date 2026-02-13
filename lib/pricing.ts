import { createClient } from "@/utils/supabase/client";

export interface PricingPlan {
    id?: number;
    name: string;
    price: string;
    tag: string;
    popular: boolean;
    features: string[];
    frequency?: string;
    order_index?: number;
}

export const getPricingPlans = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching pricing plans:", error);
        throw error;
    }

    return data as PricingPlan[];
};

export const updatePricingPlan = async (id: number, plan: Partial<PricingPlan>) => {
    const supabase = createClient();
    // Sanitize payload to remove restricted fields
    const { id: _, created_at: __, ...updateData } = plan as any;

    const { data, error } = await supabase
        .from("pricing_plans")
        .update(updateData)
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating pricing plan:", JSON.stringify(error, null, 2));
        throw error;
    }

    return data;
};

export const createPricingPlan = async (plan: PricingPlan) => {
    const supabase = createClient();
    // Sanitize payload to remove restricted fields that might be passed accidentally
    const { id: _, created_at: __, ...insertData } = plan as any;

    const { data, error } = await supabase
        .from("pricing_plans")
        .insert([insertData])
        .select();

    if (error) {
        console.error("Error creating pricing plan:", JSON.stringify(error, null, 2));
        throw error;
    }

    return data;
};

export const deletePricingPlan = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("pricing_plans")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting pricing plan:", error);
        throw error;
    }
};
