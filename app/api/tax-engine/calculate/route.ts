import { NextRequest, NextResponse } from 'next/server';
import { TaxRulesEngine } from '@/lib/tax-engine/rules-engine';
import { CalculateRequestSchema } from '@/lib/tax-engine/schemas';
import { LifeCalculator } from '@/lib/tax-engine/calculators/life-calculator';
import { GrowthCalculator } from '@/lib/tax-engine/calculators/growth-calculator';
import { NicheCalculator } from '@/lib/tax-engine/calculators/niche-calculator';

// Initialize the engine once (singleton pattern for checking, though in Serverless it might re-init)
// Putting it outside the handler to avoid re-initialization on every request if container allows
const taxRulesEngine = new TaxRulesEngine();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validationResult = CalculateRequestSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Invalid request data', details: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { brainType, facts } = validationResult.data;

        // perform calculation (get events)
        const events = await taxRulesEngine.evaluate(brainType, facts);

        let results: any = {};

        // Calculate specific results based on brain type
        if (brainType === 'life') {
            const calculator = new LifeCalculator();
            results = calculator.calculate(facts, events);
        } else if (brainType === 'growth') {
            const calculator = new GrowthCalculator();
            results = calculator.calculate(facts, events);
        } else if (brainType === 'niche') {
            const calculator = new NicheCalculator();
            results = calculator.calculate(facts, events);
        }

        return NextResponse.json(results);

    } catch (error) {
        console.error('Tax Calculation Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
