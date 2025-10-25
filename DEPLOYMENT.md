# Deployment Guide for Vercel

## 🚀 Quick Deploy to Vercel

### 1. **Set Environment Variables in Vercel**

Go to your Vercel project settings → Environment Variables and add:

#### **Required Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://kvslzhdjtcwosdfymzoj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c2x6aGRqdGN3b3NkZnltem9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODM0NTQsImV4cCI6MjA3Njk1OTQ1NH0.2W73zY5JRcnVKTmo3sXdw_kGudzu0JROszg2jH1mOsI
ENCRYPTION_KEY=174e2c10025c61f17d5db17a874bc4c93c4c166115b0b59f824a71aecb96fd59
```

**Important:** Set these for **ALL environments** (Production, Preview, Development)

### 2. **Vercel CLI Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 3. **Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository `codersoham229/monad`
3. Configure the environment variables (see step 1)
4. Click "Deploy"

### 4. **Verify Deployment**

After deployment completes:
- Visit your Vercel URL
- Test login/signup with: `abuzaid@gmail.com` (seller) or `hormaz@gmail.com` (buyer)
- Check seller dashboard at `/seller`

### 5. **Troubleshooting**

**Build Error: "supabaseUrl is required"**
- ✅ Fixed: Environment variables now properly validated
- Make sure ALL 3 env vars are set in Vercel

**Database Connection Issues:**
- Your Supabase instance may be paused
- Visit Supabase dashboard to wake it up
- Database auto-pauses after 1 week of inactivity

**Middleware Warning:**
- This is cosmetic - middleware works fine
- Will be updated in future Next.js versions

---

## 📊 Database Status

**Tables Created:**
- ✅ profiles (2 users)
- ✅ models
- ✅ model_calls
- ✅ seller_analytics
- ✅ seller_settings

**RLS Policies:** 11 active policies
**Performance Indexes:** 6 indexes configured

---

## 🔑 Test Accounts

**Seller Account:**
- Email: `abuzaid@gmail.com`
- Role: seller
- Wallet: `0x5CcE1bf273Dfe0AaeC04938085AF2B99D906812F`

**Buyer Account:**
- Email: `hormaz@gmail.com`
- Role: buyer
- Wallet: `0xbA4390A3Cd5E7f80b97fFD9b835f63f5588E3D0F`

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Visit http://localhost:3000
```

---

## 📦 Tech Stack

- **Framework:** Next.js 16.0.0 (Turbopack)
- **UI:** Tailwind CSS v4 + Lucide Icons
- **Database:** Supabase PostgreSQL
- **Charts:** Recharts
- **QR Codes:** qrcode library
- **Blockchain:** Monad Network

---

## 🔐 Security Notes

1. **Never commit** `.env.local` to Git
2. **Rotate** encryption keys regularly
3. **Enable** Supabase email confirmation in production
4. **Configure** CORS in Supabase for your Vercel domain
5. **Review** RLS policies before going live

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Check Supabase database is active
4. Review browser console for errors
