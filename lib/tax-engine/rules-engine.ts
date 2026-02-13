import { Engine } from 'json-rules-engine';
import { lifeEngineRules } from './rules/life-engine-rules';
import { growthEngineRules } from './rules/growth-engine-rules';
import { nicheEngineRules } from './rules/niche-engine-rules';

export type BrainType = 'life' | 'growth' | 'niche';

export interface TaxFacts {
    // Common facts
    income: number;
    province: string;

    // Life Engine facts
    marital_status?: 'single' | 'married' | 'common_law';
    income_difference?: number;
    age?: number;
    has_pension?: boolean;
    has_children?: boolean;
    childcare_expenses?: number;
    tuition_credits_available?: number;
    moved_for_work?: boolean;
    moving_distance_km?: number;
    arrival_date?: string;
    has_foreign_income?: boolean;
    is_newcomer?: boolean;
    applied_for_gst_credit?: boolean;
    spouse_income?: number;

    // Growth Engine facts
    hiring_spouse?: boolean;
    spouse_hours_per_week?: number;
    spouse_age?: number;
    business_expenses?: number;
    revenue?: number;
    industry?: string;
    vehicle_type?: 'zero_emission' | 'gas' | 'hybrid';
    vehicle_cost?: number;
    business_use_percentage?: number;

    // Niche Engine facts
    crypto_trades_per_year?: number;
    average_holding_period_days?: number;
    property_ownership_days?: number;
    sale_reason?: 'safety' | 'death' | 'job_change' | 'disability' | 'divorce' | 'other';
    properties_sold_in_year?: number;
    has_us_income?: boolean;
    filed_us_taxes?: boolean;

    // Risk factors
    meals_expenses?: number;
    home_office_percentage?: number;
    vehicle_expenses?: number;
    cash_revenue_percentage?: number;
}

export interface TaxEvent {
    type: string;
    params: {
        message: string;
        category: string;
        priority: 'low' | 'medium' | 'high' | 'critical';
        risk_level?: 'low' | 'medium' | 'high';
        [key: string]: any;
    };
}

export class TaxRulesEngine {
    private engines: Map<BrainType, Engine>;

    constructor() {
        this.engines = new Map();
        this.initializeEngines();
    }

    private initializeEngines() {
        // Life Engine
        const lifeEngine = new Engine();
        lifeEngineRules.forEach(rule => lifeEngine.addRule(rule));
        this.engines.set('life', lifeEngine);

        // Growth Engine
        const growthEngine = new Engine();
        growthEngineRules.forEach(rule => growthEngine.addRule(rule));
        this.engines.set('growth', growthEngine);

        // Niche Engine
        const nicheEngine = new Engine();
        nicheEngineRules.forEach(rule => nicheEngine.addRule(rule));
        this.engines.set('niche', nicheEngine);
    }

    async evaluate(brainType: BrainType, facts: TaxFacts): Promise<TaxEvent[]> {
        const engine = this.engines.get(brainType);

        if (!engine) {
            throw new Error(`Invalid brain type: ${brainType}`);
        }

        const { events } = await engine.run(facts);

        return events.map(event => ({
            type: event.type,
            params: event.params as TaxEvent['params']
        }));
    }

    async evaluateAll(facts: TaxFacts): Promise<Map<BrainType, TaxEvent[]>> {
        const results = new Map<BrainType, TaxEvent[]>();

        for (const [brainType, engine] of this.engines) {
            const { events } = await engine.run(facts);
            results.set(brainType, events.map(event => ({
                type: event.type,
                params: event.params as TaxEvent['params']
            })));
        }

        return results;
    }

    // Helper method to determine which brain is most relevant
    determinePrimaryBrain(facts: TaxFacts): BrainType {
        // Check for business indicators
        if (facts.revenue || facts.business_expenses || facts.hiring_spouse) {
            return 'growth';
        }

        // Check for niche indicators
        if (facts.crypto_trades_per_year || facts.property_ownership_days || facts.has_us_income) {
            return 'niche';
        }

        // Default to life engine
        return 'life';
    }
}
