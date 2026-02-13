import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, brainType, facts, results, scenarioType } = body;

        if (!name || !brainType || !facts) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Insert into tax_scenarios table
        const { data, error } = await supabase
            .from('tax_scenarios')
            .insert({
                user_id: user.id,
                name,
                brain_type: brainType,
                scenario_type: scenarioType || 'custom',
                facts,
                results
            })
            .select()
            .single();

        if (error) {
            console.error('Database Error:', error);
            return NextResponse.json(
                { error: 'Failed to save scenario' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Save Scenario Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
