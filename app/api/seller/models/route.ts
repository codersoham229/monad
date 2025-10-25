import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('supabase-auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch seller's models
    const { data: models, error: modelsError } = await supabase
      .from('models')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (modelsError) {
      console.error('Error fetching models:', modelsError);
      return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }

    return NextResponse.json({ models: models || [] });
  } catch (error) {
    console.error('Models fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('supabase-auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      category,
      tags,
      api_endpoint,
      input_format,
      output_format,
      price_per_call,
      visibility,
    } = body;

    // Validate required fields
    if (!name || !category || !api_endpoint || !input_format || !output_format || !price_per_call) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create model
    const { data: model, error: createError } = await supabase
      .from('models')
      .insert({
        seller_id: user.id,
        name,
        description,
        category,
        tags: tags || [],
        api_endpoint,
        input_format,
        output_format,
        price_per_call: parseFloat(price_per_call),
        visibility: visibility || 'public',
        status: 'active',
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating model:', createError);
      return NextResponse.json({ error: 'Failed to create model' }, { status: 500 });
    }

    return NextResponse.json({ model }, { status: 201 });
  } catch (error) {
    console.error('Model creation error:', error);
    return NextResponse.json({ error: 'Failed to create model' }, { status: 500 });
  }
}
