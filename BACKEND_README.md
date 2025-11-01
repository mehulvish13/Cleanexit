# 🚀 Cleanexit Backend API

TypeScript/Node.js serverless backend for Cleanexit, built with Vercel Functions and Supabase.

---

## 📁 **Project Structure**

```
api/
├── _lib/                         # Shared backend utilities
│   ├── supabase.ts              # Supabase server client
│   └── response.ts              # API response helpers
├── auth/
│   └── login.ts                 # POST /api/auth/login
├── certificate.ts               # POST /api/certificate
└── support/
    └── ticket.ts                # POST /api/support/ticket

database/
└── schema.sql                   # Supabase database schema

src/react-app/lib/
├── api.ts                       # Frontend API client
└── supabase.ts                  # Frontend Supabase client
```

---

## 🔧 **Setup Instructions**

### **1. Create Supabase Account**

1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Create new project
4. Wait for database provisioning (~2 minutes)

### **2. Setup Database**

1. In Supabase dashboard, go to **SQL Editor**
2. Copy contents of `database/schema.sql`
3. Paste and click **Run**
4. Verify tables in **Table Editor**: `users`, `certificates`, `support_tickets`

### **3. Get API Keys**

1. Go to **Settings → API** in Supabase dashboard
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`
   - **service_role secret key** → `SUPABASE_SERVICE_KEY` ⚠️ Keep secret!

### **4. Configure Environment Variables**

#### **Local Development:**
Create `.env` file in project root:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

#### **Vercel Deployment:**
1. Go to [vercel.com](https://vercel.com) → Your Project
2. **Settings → Environment Variables**
3. Add all 4 variables above
4. Select: **Production**, **Preview**, **Development**
5. Click **Save**
6. Redeploy

---

## 📡 **API Endpoints**

### **1. Generate Certificate**

```http
POST /api/certificate
Content-Type: application/json

{
  "deviceType": "Laptop",
  "userId": "optional-user-id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "certificate_id": "CERT-1234567890-ABC123",
    "device_type": "Laptop",
    "wiped_at": "2025-11-01T12:00:00Z",
    "created_at": "2025-11-01T12:00:00Z"
  }
}
```

### **2. Login**

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "john_doe",
      "email": "john_doe@cleanexit.local",
      "created_at": "2025-11-01T12:00:00Z"
    }
  }
}
```

### **3. Create Support Ticket**

```http
POST /api/support/ticket
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about service",
  "message": "How does the wiping process work?",
  "userId": "optional-user-id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question about service",
    "message": "How does the wiping process work?",
    "status": "open",
    "created_at": "2025-11-01T12:00:00Z"
  }
}
```

---

## 💻 **Frontend Usage**

### **Using API Client**

```typescript
import { certificateApi, authApi, supportApi } from './lib/api';

// Generate certificate
const cert = await certificateApi.create('Laptop', 'user-123');
console.log(cert.certificate_id); // CERT-1234567890-ABC123

// Login
const { user } = await authApi.login('john_doe');
console.log(user.username); // john_doe

// Create support ticket
const ticket = await supportApi.createTicket({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Help needed',
  message: 'I need assistance',
});
console.log(ticket.status); // open
```

### **Using Supabase Client (Direct DB Access)**

```typescript
import { supabase } from './lib/supabase';

// Query certificates
const { data, error } = await supabase
  .from('certificates')
  .select('*')
  .eq('user_id', 'user-123');

if (error) {
  console.error('Error:', error);
} else {
  console.log('Certificates:', data);
}
```

---

## 🧪 **Testing Locally**

### **1. Start Dev Server**

```bash
npm run dev
```

### **2. Test API Endpoints**

Use `curl`, Postman, or your browser:

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
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "subject":"Test",
    "message":"This is a test"
  }'
```

---

## 🚀 **Deployment**

### **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Or use **GitHub integration**:
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

---

## 🔒 **Security**

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **Service role key** never exposed to frontend
- ✅ **CORS headers** configured for API endpoints
- ✅ **Input validation** on all API requests
- ✅ **Prepared statements** (Supabase handles SQL injection)

---

## 📊 **Database Schema**

### **users**
- `id` - UUID (primary key)
- `username` - TEXT (unique)
- `email` - TEXT (unique, optional)
- `created_at` - TIMESTAMPTZ
- `updated_at` - TIMESTAMPTZ

### **certificates**
- `id` - UUID (primary key)
- `user_id` - TEXT
- `certificate_id` - TEXT (unique)
- `device_type` - TEXT
- `wiped_at` - TIMESTAMPTZ
- `created_at` - TIMESTAMPTZ

### **support_tickets**
- `id` - UUID (primary key)
- `user_id` - UUID (foreign key, optional)
- `name` - TEXT
- `email` - TEXT
- `subject` - TEXT
- `message` - TEXT
- `status` - TEXT (`open`, `in_progress`, `closed`)
- `created_at` - TIMESTAMPTZ
- `updated_at` - TIMESTAMPTZ

---

## 🆘 **Troubleshooting**

### **"Missing Supabase environment variables"**
- Check `.env` file exists with correct keys
- Verify keys are added to Vercel dashboard
- Redeploy after adding environment variables

### **"Database error" or "Failed to create..."**
- Verify database schema is created (`schema.sql`)
- Check Row Level Security policies
- Ensure service role key (not anon key) is used in backend

### **CORS errors**
- Vercel automatically handles CORS with `vercel.json` config
- Check API headers in `api/_lib/response.ts`

---

## 📚 **Tech Stack**

- **Runtime:** Node.js 18+
- **Language:** TypeScript 5.8+
- **Framework:** Vercel Serverless Functions
- **Database:** Supabase (PostgreSQL)
- **Frontend:** React 19 + Vite 6

---

## 📝 **License**

MIT © Cleanexit
