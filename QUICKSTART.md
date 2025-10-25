# 🚀 Quick Start Instructions

## Current Status: Almost Ready! 

✅ All code files created
✅ Dependencies installed  
✅ Encryption key generated: `174e2c10025c61f17d5db17a874bc4c93c4c166115b0b59f824a71aecb96fd59`

## ⚠️ What You Need to Do:

### 1️⃣ Create Supabase Project (5 minutes)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: `aimm-marketplace`
   - **Database Password**: (choose a strong password and save it)
   - **Region**: (select closest to you)
4. Click "Create new project" and wait ~2 minutes

### 2️⃣ Setup Database (2 minutes)

1. In your Supabase project, click **SQL Editor** (left sidebar)
2. Click "New Query"
3. Open `supabase-schema.sql` file from this project
4. Copy ALL the SQL code and paste it into the query editor
5. Click **RUN** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### 3️⃣ Get Your API Keys (1 minute)

1. Go to **Settings** > **API** (left sidebar, bottom)
2. Copy these two values:
   - **Project URL** (example: `https://abcdefgh.supabase.co`)
   - **anon public** key (long JWT string starting with `eyJ...`)

### 4️⃣ Create .env.local File (2 minutes)

1. In VS Code, create a new file called `.env.local` in the root directory
2. Paste this content and replace the values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-actual-anon-key

# Encryption Key (ALREADY GENERATED FOR YOU!)
ENCRYPTION_KEY=174e2c10025c61f17d5db17a874bc4c93c4c166115b0b59f824a71aecb96fd59
```

3. Replace:
   - `https://your-project-id.supabase.co` with your actual Supabase URL
   - `eyJhbGci...your-actual-anon-key` with your actual anon key
4. Save the file

### 5️⃣ Test Your App (3 minutes)

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open browser**: http://localhost:3000

3. **Test Signup**:
   - Click "Get Started" or go to `/signup`
   - Enter email: `test@example.com`
   - Enter password: `test123`
   - Select role: **Buyer** or **Seller**
   - Check "I agree to terms"
   - Click "Create Account"
   - ✅ You should see a wallet address generated!
   - ✅ You'll be redirected to login

4. **Test Login**:
   - Enter same email and password
   - Click "Sign In"
   - ✅ You should see your dashboard with wallet info!

5. **Verify in Supabase**:
   - Go to Supabase Dashboard > **Table Editor** > **profiles**
   - You should see your user with wallet address and encrypted key

## 🎉 You're Done!

Your AIMM authentication system is now fully functional with:
- ✅ User signup with role selection
- ✅ Automatic crypto wallet generation
- ✅ Encrypted private key storage
- ✅ Secure login/logout
- ✅ Protected dashboard
- ✅ Premium UI/UX

## 📝 What's Next?

After testing, you can:
- Build out the Buyer Dashboard (browse AI models)
- Build out the Seller Dashboard (upload AI models)
- Integrate Monad blockchain for payments
- Add model marketplace features

## 🆘 Troubleshooting

**"Not authenticated" error**: 
- Make sure .env.local file exists and has correct values
- Restart dev server after creating .env.local

**"Failed to fetch profile" error**:
- Make sure you ran the SQL schema in Supabase SQL Editor
- Check Supabase Dashboard > Table Editor to see if `profiles` table exists

**Cannot connect to Supabase**:
- Verify your Project URL is correct (should start with https://)
- Verify your anon key is the full JWT token
- Check if Supabase project is "Active" (not paused)

---

**Need help?** Check `SETUP.md` for detailed instructions.
