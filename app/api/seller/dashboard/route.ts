import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Get session from cookie
    const token = request.cookies.get('supabase-auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create Supabase client with the auth token
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

    // Get user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user profile to verify seller role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'seller') {
      return NextResponse.json(
        { error: 'Access denied. Seller role required.' },
        { status: 403 }
      );
    }

    // Fetch seller statistics
    const { data: models, error: modelsError } = await supabase
      .from('models')
      .select('id, status, total_calls, total_earnings')
      .eq('seller_id', user.id);

    if (modelsError) {
      console.error('Error fetching models:', modelsError);
    }

    // Calculate stats
    const activeModels = models?.filter(m => m.status === 'active').length || 0;
    const totalEarnings = models?.reduce((sum, m) => sum + parseFloat(m.total_earnings || '0'), 0) || 0;
    const modelCalls = models?.reduce((sum, m) => sum + (m.total_calls || 0), 0) || 0;

    // Fetch pending transactions
    const { data: pendingTx, error: txError } = await supabase
      .from('model_calls')
      .select('id')
      .eq('seller_id', user.id)
      .eq('status', 'pending');

    if (txError) {
      console.error('Error fetching transactions:', txError);
    }

    const pendingTransactions = pendingTx?.length || 0;

    // Mock percentage changes (in production, calculate from historical data)
    const stats = {
      totalEarnings: totalEarnings.toFixed(2),
      modelCalls,
      activeModels,
      pendingTransactions,
      earningsChange: 12.5, // Mock data
      callsChange: 8.3, // Mock data
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
