import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const brainType = searchParams.get('brain_type');

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Build query
        let query = supabase
            .from('tax_scenarios')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        // Filter by brain type if provided
        if (brainType && ['life', 'growth', 'niche'].includes(brainType)) {
            query = query.eq('brain_type', brainType);
        }

        const { data: scenarios, error } = await query;

        if (error) {
            console.error('Error fetching scenarios:', error);
            return NextResponse.json(
                { error: 'Failed to fetch scenarios' },
                { status: 500 }
            );
        }

        return NextResponse.json({ scenarios });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { name, brain_type, scenario_type, facts, results } = body;

        // Validate required fields
        if (!name || !brain_type || !scenario_type || !facts || !results) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate brain_type
        if (!['life', 'growth', 'niche'].includes(brain_type)) {
            return NextResponse.json(
                { error: 'Invalid brain_type' },
                { status: 400 }
            );
        }

        // Insert scenario
        const { data: scenario, error } = await supabase
            .from('tax_scenarios')
            .insert({
                user_id: user.id,
                name,
                brain_type,
                scenario_type,
                facts,
                results
            })
            .select()
            .single();

        if (error) {
            console.error('Error saving scenario:', error);
            return NextResponse.json(
                { error: 'Failed to save scenario' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            id: scenario.id,
            message: 'Scenario saved successfully'
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
