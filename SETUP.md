# AIMM - AI Model Marketplace Setup Guide

## ✅ Completed Setup

1. ✅ **Dependencies Installed**
   - @supabase/supabase-js
   - ethers (for wallet generation)

2. ✅ **Core Files Created**
   - `lib/supabase.ts` - Supabase client
   - `lib/wallet.ts` - Wallet generation and encryption
   - `app/signup/page.tsx` - Signup page with role selection
   - `app/login/page.tsx` - Login page
   - `app/dashboard/page.tsx` - Unified dashboard
   - `app/api/auth/signup/route.ts` - Signup API
   - `app/api/auth/login/route.ts` - Login API
   - `app/api/auth/logout/route.ts` - Logout API
   - `app/api/dashboard/route.ts` - Dashboard data API
   - `middleware.ts` - Protected routes middleware
   - `supabase-schema.sql` - Database schema

## 🚀 Next Steps to Complete Setup

### Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details:
   - Name: `aimm-marketplace`
   - Database Password: (save this securely)
   - Region: (choose closest to you)
4. Wait for project to be created (~2 minutes)

### Step 2: Setup Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire content from `supabase-schema.sql`
4. Click "Run" to execute the SQL
5. Verify the `profiles` table was created in **Table Editor**

### Step 3: Get API Keys

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long JWT token)

### Step 4: Create .env.local File

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```

2. Open `.env.local` and replace with your actual values:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   ENCRYPTION_KEY=your-generated-key-from-terminal
   ```

3. The encryption key has been generated and shown in the terminal above

### Step 5: Test the Application

1. Start the dev server (if not already running):
   ```bash
   npm run dev
   ```

2. Open browser to `http://localhost:3000`

3. **Test Signup Flow:**
   - Go to `/signup`
   - Enter email and password
   - Select role (Buyer or Seller)
   - Click "Create Account"
   - You should see wallet address generated
   - Get redirected to login page

4. **Test Login Flow:**
   - Enter your credentials
   - Click "Sign In"
   - Should redirect to `/dashboard`
   - See your wallet address and role

5. **Test Logout:**
   - Click "Logout" button in dashboard
   - Should redirect to homepage

### Step 6: Verify Database

1. Go to Supabase **Table Editor** > **profiles**
2. You should see your user record with:
   - Email
   - Role (buyer or seller)
   - Wallet address (0x...)
   - Encrypted private key

## 🔒 Security Notes

- ✅ Private keys are encrypted with AES-256-GCM
- ✅ Environment variables are in `.gitignore`
- ✅ Row Level Security (RLS) enabled on profiles table
- ✅ HTTP-only cookies for session management
- ✅ Passwords hashed by Supabase Auth

## 📁 Project Structure

```
monad/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts    # Signup endpoint
│   │   │   ├── login/route.ts     # Login endpoint
│   │   │   └── logout/route.ts    # Logout endpoint
│   │   └── dashboard/route.ts     # Dashboard data endpoint
│   ├── dashboard/page.tsx         # User dashboard
│   ├── login/page.tsx             # Login page
│   ├── signup/page.tsx            # Signup page
│   └── page.tsx                   # Homepage
├── lib/
│   ├── supabase.ts                # Supabase client
│   └── wallet.ts                  # Wallet utilities
├── middleware.ts                  # Route protection
├── supabase-schema.sql            # Database schema
├── .env.local.example             # Environment template
└── .env.local                     # Your actual env vars (create this)
```

## 🎯 Features Implemented

- ✅ User signup with email/password
- ✅ Role selection (Buyer/Seller)
- ✅ Automatic wallet generation on signup
- ✅ Private key encryption (AES-256-GCM)
- ✅ User login with authentication
- ✅ Protected dashboard routes
- ✅ Wallet address display
- ✅ Session management with cookies
- ✅ Logout functionality
- ✅ Premium UI/UX with Tailwind
- ✅ Loading states and error handling

## 🔧 Troubleshooting

### "Not authenticated" error
- Clear browser cookies
- Check if .env.local has correct Supabase keys
- Verify Supabase project is active

### "Failed to fetch profile" error
- Check if SQL schema was executed correctly
- Verify RLS policies are enabled
- Check Supabase logs in Dashboard > Logs

### Compilation errors
- Run `npm install` to ensure all packages are installed
- Restart dev server: `npm run dev`

## 🚀 Next Features to Add

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Wallet balance checking (integrate Monad RPC)
- [ ] Buyer dashboard with model marketplace
- [ ] Seller dashboard with model upload
- [ ] Transaction history
- [ ] User profile settings
