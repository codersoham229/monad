import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateWallet, encryptPrivateKey } from '@/lib/wallet';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    // Validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['buyer', 'seller'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be buyer or seller' },
        { status: 400 }
      );
    }

    // Generate wallet
    const wallet = generateWallet();
    
    // Encrypt private key (function reads ENCRYPTION_KEY from env internally)
    const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey);

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          wallet_address: wallet.address,
        },
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    console.log('User created:', authData.user.id, 'Email confirmed:', authData.user.email_confirmed_at);

    // Store additional profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        role,
        wallet_address: wallet.address,
        encrypted_private_key: encryptedPrivateKey,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Note: User is created in Auth but profile failed
      // In production, you might want to handle this differently
    }

    // Check if email confirmation is required
    const emailConfirmationRequired = !authData.session;

    return NextResponse.json({
      success: true,
      message: emailConfirmationRequired 
        ? 'Account created! Please check your email to confirm your account before logging in.'
        : 'Account created successfully',
      wallet_address: wallet.address,
      email_confirmation_required: emailConfirmationRequired,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role,
      },
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
