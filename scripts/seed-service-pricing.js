import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const services = [
    {
        id: "accounting",
        slug: "accounting-services",
        sidebar: {
            pricing: {
                title: "Standard Price",
                package: "Accounting Package",
                price: "150",
                unit: "/ Hour",
                features: ["Stress-Free & Affordable", "Quality work in Accounting", "Work for a better tomorrow"]
            }
        }
    },
    {
        id: "small-business",
        slug: "accounting-services-small-business",
        sidebar: {
            pricing: {
                title: "Small Business",
                package: "Monthly Package",
                price: "250",
                unit: "/ Month",
                features: ["Bookkeeping", "GST/HST Filing", "Payroll Support", "Annual Financial Statements"]
            }
        }
    },
    {
        id: "medium-business",
        slug: "accounting-services-medium-business",
        sidebar: {
            pricing: {
                title: "Medium Business",
                package: "Growth Package",
                price: "500",
                unit: "/ Month",
                features: ["Full Cycle Accounting", "CFO Advisory", "Payroll (up to 20)", "Tax Planning"]
            }
        }
    },
    {
        id: "online-accounting",
        slug: "online-accounting-services",
        sidebar: {
            pricing: {
                title: "Online Accounting",
                package: "Cloud Package",
                price: "350",
                unit: "/ Month",
                features: ["Cloud Software", "Real-time Reporting", "Virtual Support", "Tax Filing"]
            }
        }
    },
    {
        id: "virtual-accounting",
        slug: "virtual-accounting-services",
        sidebar: {
            pricing: {
                title: "Virtual Accounting",
                package: "Virtual Package",
                price: "350",
                unit: "/ Month",
                features: ["Virtual Support", "Cloud Integrations", "Real-time Data", "Tax Filing"]
            }
        }
    },
    {
        id: "bookkeeping",
        slug: "bookkeeping-services",
        sidebar: {
            pricing: {
                title: "Standard Price",
                package: "Bookkeeping Package",
                price: "150",
                unit: "/ Hour",
                features: ["Automated Workflows", "Accuracy Guaranteed", "Cloud-based Systems"]
            }
        }
    }
];

async function seed() {
    console.log("Seeding service pricing...");

    for (const service of services) {
        if (!service.sidebar || !service.sidebar.pricing) continue;

        const p = service.sidebar.pricing;
        const plan = {
            name: p.title,
            price: p.price,
            tag: p.package,
            popular: false,
            features: p.features,
            frequency: p.unit,
            service_slug: service.slug,
            order_index: 0
        };

        // Check if exists
        const { data: existing, error: fetchError } = await supabase
            .from("pricing_plans")
            .select("id")
            .eq("service_slug", service.slug)
            .maybeSingle();

        if (fetchError) {
            console.error(`Error checking ${service.slug}:`, fetchError.message);
            continue;
        }

        if (existing) {
            const { error: updateError } = await supabase
                .from("pricing_plans")
                .update(plan)
                .eq("id", existing.id);

            if (updateError) {
                console.error(`Error updating ${service.slug}:`, updateError.message);
            } else {
                console.log(`Updated pricing for ${service.slug}`);
            }
        } else {
            const { error: insertError } = await supabase
                .from("pricing_plans")
                .insert([plan]);

            if (insertError) {
                console.error(`Error inserting ${service.slug}:`, insertError.message);
            } else {
                console.log(`Inserted pricing for ${service.slug}`);
            }
        }
    }

    console.log("Done.");
}

seed();
