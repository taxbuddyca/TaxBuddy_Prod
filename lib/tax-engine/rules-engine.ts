import { Engine } from 'json-rules-engine';
import { lifeEngineRules } from './rules/life-engine-rules';
import { growthEngineRules } from './rules/growth-engine-rules';
import { nicheEngineRules } from './rules/niche-engine-rules';
import { TaxFacts } from './schemas';

export type BrainType = 'life' | 'growth' | 'niche';

// Re-export TaxFacts for backward compatibility if needed, 
// allows other files to still import it from here until refactored.
export type { TaxFacts };

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
        const lifeEngine = new Engine([], { allowUndefinedFacts: true });
        lifeEngineRules.forEach(rule => lifeEngine.addRule(rule));
        this.engines.set('life', lifeEngine);

        // Growth Engine
        const growthEngine = new Engine([], { allowUndefinedFacts: true });
        growthEngineRules.forEach(rule => growthEngine.addRule(rule));
        this.engines.set('growth', growthEngine);

        // Niche Engine
        const nicheEngine = new Engine([], { allowUndefinedFacts: true });
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
        const engineEntries = Array.from(this.engines.entries());

        for (const [brainType, engine] of engineEntries) {
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

