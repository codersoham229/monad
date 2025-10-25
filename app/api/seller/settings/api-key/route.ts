import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

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

    // Generate new API key
    const apiKey = `aimm_${randomBytes(32).toString('hex')}`;

    // Upsert settings with new API key
    const { data: settings, error: upsertError } = await supabase
      .from('seller_settings')
      .upsert({
        seller_id: user.id,
        api_key: apiKey,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'seller_id',
      })
      .select()
      .single();

    if (upsertError) {
      console.error('Error generating API key:', upsertError);
      return NextResponse.json({ error: 'Failed to generate API key' }, { status: 500 });
    }

    return NextResponse.json({ api_key: apiKey });
  } catch (error) {
    console.error('API key generation error:', error);
    return NextResponse.json({ error: 'Failed to generate API key' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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

    // Update settings to remove API key
    const { error: updateError } = await supabase
      .from('seller_settings')
      .update({
        api_key: null,
        updated_at: new Date().toISOString(),
      })
      .eq('seller_id', user.id);

    if (updateError) {
      console.error('Error revoking API key:', updateError);
      return NextResponse.json({ error: 'Failed to revoke API key' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API key revocation error:', error);
    return NextResponse.json({ error: 'Failed to revoke API key' }, { status: 500 });
  }
}
