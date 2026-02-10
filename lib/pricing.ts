import { supabase } from "./supabase";

export interface PricingPlan {
    id?: number;
    name: string;
    price: string;
    tag: string;
    popular: boolean;
    features: string[];
    order_index?: number;
}

export const getPricingPlans = async () => {
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
    const { data, error } = await supabase
        .from("pricing_plans")
        .update(plan)
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating pricing plan:", error);
        throw error;
    }

    return data;
};

export const createPricingPlan = async (plan: PricingPlan) => {
    const { data, error } = await supabase
        .from("pricing_plans")
        .insert([plan])
        .select();

    if (error) {
        console.error("Error creating pricing plan:", error);
        throw error;
    }

    return data;
};

export const deletePricingPlan = async (id: number) => {
    const { error } = await supabase
        .from("pricing_plans")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting pricing plan:", error);
        throw error;
    }
};
