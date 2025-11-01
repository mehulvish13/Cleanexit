# 🚀 Quick Start Guide - Vercel API Backend

Your Vercel API backend is now set up! Follow these steps to get it running.

---

## ✅ **What's Been Created**

### **Backend API Structure:**
```
api/
├── _lib/
│   ├── supabase.ts          ✅ Supabase server client
│   └── response.ts          ✅ API response helpers
├── auth/
│   └── login.ts             ✅ POST /api/auth/login
├── certificate.ts           ✅ POST /api/certificate
└── support/
    └── ticket.ts            ✅ POST /api/support/ticket
```

### **Frontend Integration:**
```
src/react-app/lib/
├── api.ts                   ✅ Type-safe API client
└── supabase.ts              ✅ Supabase frontend client
```

### **Configuration:**
```
vercel.json                  ✅ Updated with API routes
.env.example                 ✅ Environment variables template
database/schema.sql          ✅ PostgreSQL database schema
```

---

## 📋 **Next Steps**

### **Step 1: Setup Supabase (5 minutes)**

1. **Create Account:**
   - Go to https://supabase.com
   - Sign up (free tier)
   - Create new project
   - Wait for provisioning (~2 min)

2. **Setup Database:**
   - Go to **SQL Editor** in Supabase
   - Copy entire content from `database/schema.sql`
   - Paste and click **RUN**
   - Verify in **Table Editor**: You should see 3 tables

3. **Get API Keys:**
   - Go to **Settings → API**
   - Copy these 2 keys:
     - **Project URL** (e.g., `https://abc123.supabase.co`)
     - **anon public** key (starts with `eyJhbG...`)
     - **service_role** key (starts with `eyJhbG...`) ⚠️ Secret!

---

### **Step 2: Configure Environment Variables**

#### **For Local Development:**

Create `.env` file in project root:

```env
# Copy from Supabase Settings → API
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important:**
- Use `.env.example` as template
- Never commit `.env` to git (already in `.gitignore`)
- The `SUPABASE_SERVICE_KEY` is SECRET - never expose it!

---

#### **For Vercel Deployment:**

1. Go to [vercel.com](https://vercel.com) → Your Project
2. **Settings → Environment Variables**
3. Add these 4 variables:
   - `VITE_SUPABASE_URL` = `https://xxxxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
   - `SUPABASE_URL` = `https://xxxxx.supabase.co`
   - `SUPABASE_SERVICE_KEY` = `your-service-key`
4. For each variable, select: **Production**, **Preview**, **Development**
5. Click **Save**
6. **Redeploy** your project

---

### **Step 3: Test Locally**

```bash
# Start development server
npm run dev
```

Open browser to `http://localhost:5176`

**Test API endpoints:**

```bash
# Test certificate creation
curl -X POST http://localhost:5176/api/certificate \
  -H "Content-Type: application/json" \
  -d '{"deviceType":"Laptop"}'

# Test login
curl -X POST http://localhost:5176/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user"}'

# Test support ticket
curl -X POST http://localhost:5176/api/support/ticket \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","subject":"Test","message":"Hello"}'
```

---

### **Step 4: Use in Your React Components**

```typescript
import { certificateApi, authApi, supportApi } from './lib/api';

// In your component
const handleWipe = async () => {
  try {
    // Generate certificate via API
    const cert = await certificateApi.create('Laptop');
    console.log('Certificate ID:', cert.certificate_id);
    
    // Use cert data in your app
    // ...
  } catch (error) {
    console.error('Failed to create certificate:', error);
  }
};

const handleLogin = async (username: string) => {
  try {
    const { user } = await authApi.login(username);
    console.log('Logged in:', user.username);
    
    // Store user in state/context
    // ...
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const handleSupportTicket = async () => {
  try {
    const ticket = await supportApi.createTicket({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Need help',
      message: 'I have a question...',
    });
    console.log('Ticket created:', ticket.id);
  } catch (error) {
    console.error('Failed to create ticket:', error);
  }
};
```

---

### **Step 5: Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

**Or use GitHub:**
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables (Step 2)
5. Deploy!

---

## 🎯 **API Endpoints Overview**

| Endpoint | Method | Purpose | Request Body |
|----------|--------|---------|--------------|
| `/api/certificate` | POST | Generate certificate | `{ deviceType, userId? }` |
| `/api/auth/login` | POST | Login/create user | `{ username }` |
| `/api/support/ticket` | POST | Create support ticket | `{ name, email, subject, message, userId? }` |

---

## 📚 **Documentation**

- **Backend Details:** See `BACKEND_README.md`
- **Deployment Guide:** See `DEPLOYMENT_CHECKLIST.md`
- **Main README:** See `README.md`

---

## 🆘 **Troubleshooting**

### **Error: "Missing Supabase environment variables"**
✅ **Fix:** Create `.env` file with your Supabase keys (see Step 2)

### **Error: "Database error"**
✅ **Fix:** Run `database/schema.sql` in Supabase SQL Editor

### **API returns 500 error**
✅ **Fix:** 
1. Check browser console for errors
2. Verify environment variables are set
3. Check Supabase dashboard for connection

### **CORS errors**
✅ **Fix:** Already configured in `vercel.json` - no action needed

---

## ✅ **Checklist**

Before deploying, make sure:

- [ ] Supabase project created
- [ ] Database schema installed (`schema.sql`)
- [ ] Environment variables configured (`.env` file)
- [ ] Local testing works (`npm run dev`)
- [ ] API endpoints respond correctly
- [ ] Vercel environment variables added
- [ ] Project deployed to Vercel

---

## 🎉 **You're Ready!**

Your TypeScript serverless backend is fully configured and ready to use!

**What you have:**
✅ Type-safe API endpoints  
✅ PostgreSQL database (Supabase)  
✅ Serverless functions (auto-scaling)  
✅ Production-ready configuration  
✅ Frontend API client  

**Next:** Follow the 5 steps above to get it running! 🚀
