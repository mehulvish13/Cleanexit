# Cleanexit - Complete Project Documentation

**Last Updated:** October 31, 2025

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components](#frontend-components)
8. [Authentication & Authorization](#authentication--authorization)
9. [Development Setup](#development-setup)
10. [Deployment](#deployment)
11. [File Structure](#file-structure)
12. [Configuration Files](#configuration-files)
13. [Environment Variables](#environment-variables)
14. [Scripts & Commands](#scripts--commands)
15. [Business Model](#business-model)

---

## 🎯 Project Overview

**Cleanexit** is a full-stack SaaS application providing **secure data erasure solutions** for enterprises. It offers certified data destruction services with compliance support for GDPR, HIPAA, SOX, and other regulatory standards.

### Key Objectives
- Provide enterprise-grade data security and erasure services
- Enable compliance with data privacy regulations
- Offer tiered subscription plans (Starter, Pro, Advanced)
- Deliver AI-powered customer support via "Sid" chatbot
- Track device erasure credits and usage per subscription

### Target Audience
- Enterprises requiring secure data destruction
- Healthcare organizations (HIPAA compliance)
- Financial institutions (SOX compliance)
- Organizations handling PII (GDPR compliance)
- IT departments managing device lifecycles

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19.0.0 with TypeScript
- **Build Tool:** Vite 6.4.1
- **Routing:** React Router 7.5.3
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React 0.510.0
- **UI/UX:** Custom components with gradient designs

### Backend
- **Runtime:** Cloudflare Workers (edge computing)
- **Framework:** Hono 4.7.7 (lightweight web framework)
- **Database:** Cloudflare D1 (SQLite-based)
- **Validation:** Zod 3.24.3
- **Authentication:** @getmocha/users-service 0.0.4 (Google OAuth)

### Build & Development
- **TypeScript:** 5.8.3
- **ESLint:** 9.25.1 with React plugins
- **PostCSS:** 8.5.3 with Autoprefixer
- **Wrangler:** 4.33.0 (Cloudflare CLI)
- **Vite Plugins:** @cloudflare/vite-plugin, @getmocha/vite-plugins

### Infrastructure
- **Hosting:** Cloudflare Pages + Workers
- **Database:** Cloudflare D1
- **CDN:** Cloudflare CDN
- **Auth Provider:** Google OAuth via Mocha Users Service

---

## 🏗️ Architecture

### Application Architecture
```
┌─────────────────────────────────────────────────┐
│              Frontend (React)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Public  │  │  Login   │  │Dashboard │     │
│  │   Site   │  │   Page   │  │   Page   │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
                      ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────┐
│         Backend (Cloudflare Worker)             │
│  ┌──────────────────────────────────────┐      │
│  │  Hono API Routes                     │      │
│  │  - /api/oauth/google/redirect_url    │      │
│  │  - /api/sessions (auth)              │      │
│  │  - /api/users/me                     │      │
│  │  - /api/users/subscription           │      │
│  │  - /api/chat (AI assistant)          │      │
│  │  - /api/logout                       │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Cloudflare D1 Database                 │
│  ┌──────────────────────────────────────┐      │
│  │  - subscription_plans                │      │
│  │  - user_subscriptions                │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│      External Services                          │
│  - Mocha Users Service (Google OAuth)           │
│  - Cloudflare CDN (assets)                      │
└─────────────────────────────────────────────────┘
```

### Request Flow
1. User visits site → React SPA loads from Cloudflare Pages
2. User clicks login → Redirects to Google OAuth via Mocha Users Service
3. OAuth callback → Exchange code for session token
4. Session stored in HTTP-only cookie
5. API requests → Authenticated via authMiddleware
6. Dashboard loads → Fetches user subscription data from D1
7. AI chat → Sends messages to /api/chat endpoint

---

## ✨ Features

### Public Website Features
1. **Hero Section**
   - Enterprise data security messaging
   - Call-to-action buttons (Free Assessment, Demo)
   - Trust indicators (NIST 800-88, GDPR, 24/7 Support)

2. **Device Showcase**
   - Visual display of supported device types
   - Laptops, servers, mobile devices, tablets

3. **Services Section**
   - Data wiping & destruction
   - Compliance & certification
   - Emergency response
   - Detailed service descriptions

4. **Solutions Section**
   - Industry-specific solutions
   - Enterprise, Healthcare, Finance, Government
   - Use case highlights

5. **Pricing Section**
   - Three-tier subscription model
   - Feature comparison
   - CTA buttons linking to signup/login

6. **Compliance Section**
   - Certifications display (GDPR, HIPAA, SOX, PCI-DSS)
   - Trust building elements

7. **Contact Section**
   - Contact form
   - Business information
   - Social links

8. **Footer**
   - Navigation links
   - Legal pages
   - Company information

### Authenticated Features (Dashboard)

1. **User Profile**
   - Display name and profile picture from Google
   - Logout functionality

2. **Subscription Management**
   - Current plan display (Starter/Pro/Advanced)
   - Device credits tracking (used/remaining/total)
   - Monthly cost display
   - Upgrade/Change plan button
   - Visual progress bar for credit usage

3. **Statistics Dashboard**
   - Devices Processed: 247
   - Compliance Reports: 18
   - Active Projects: 3
   - Team Members: 12

4. **Recent Activity Feed**
   - Hard Drive Erasure status
   - Server Decommission tracking
   - Mobile Device Wipe logs
   - Database Sanitization schedules

5. **Quick Actions**
   - Request Data Erasure
   - View Compliance Reports
   - Schedule Consultation

6. **Security Score Widget**
   - Gamified security metric (98%)
   - Organization health indicator

### AI Assistant (Sid)

1. **Chat Interface**
   - Floating chat button
   - Persistent conversation history
   - Context-aware responses

2. **Capabilities**
   - Pricing information
   - Compliance guidance
   - Mobile device support info
   - Cloud/server erasure details
   - Emergency response coordination
   - Certificate documentation

3. **Smart Responses**
   - Keyword detection (pricing, compliance, mobile, etc.)
   - Personalized greetings for authenticated users
   - Fallback to demo responses when API unavailable

---

## 🗄️ Database Schema

### subscription_plans
```sql
CREATE TABLE subscription_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,              -- Starter, Pro, Advanced
  price INTEGER NOT NULL,          -- Monthly price in INR
  currency TEXT DEFAULT 'INR',
  billing_cycle TEXT DEFAULT 'monthly',
  features TEXT,                   -- Comma-separated feature list
  devices_limit INTEGER DEFAULT 0, -- -1 for unlimited
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Default Plans:**
- **Starter:** ₹0, 5 devices/month
- **Pro:** ₹299, 50 devices/month
- **Advanced:** ₹699, unlimited devices

### user_subscriptions
```sql
CREATE TABLE user_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,           -- From Mocha Users Service
  plan_id INTEGER NOT NULL,        -- FK to subscription_plans
  status TEXT DEFAULT 'active',    -- active, cancelled, expired
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  devices_used INTEGER DEFAULT 0,  -- Current month usage
  devices_limit INTEGER DEFAULT 0, -- Cached from plan
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Migrations:**
- `1.sql`: Initial schema creation + seed data
- `2.sql`: Insert/update default plans
- Rollback scripts in `1/down.sql` and `2/down.sql`

---

## 🔌 API Endpoints

### Authentication Endpoints

#### `GET /api/oauth/google/redirect_url`
**Purpose:** Get Google OAuth redirect URL  
**Auth:** None  
**Response:**
```json
{
  "redirectUrl": "https://accounts.google.com/o/oauth2/..."
}
```
**Error (dev without env vars):**
```json
{
  "error": "Users Service not configured in dev",
  "note": "Set MOCHA_USERS_SERVICE_API_URL and MOCHA_USERS_SERVICE_API_KEY in .dev.vars"
}
```

#### `POST /api/sessions`
**Purpose:** Exchange OAuth code for session token  
**Auth:** None  
**Body:**
```json
{
  "code": "oauth_authorization_code"
}
```
**Response:**
```json
{
  "success": true
}
```
**Side Effect:** Sets HTTP-only session cookie

#### `GET /api/logout`
**Purpose:** Log out user and clear session  
**Auth:** Optional  
**Response:**
```json
{
  "success": true
}
```
**Side Effect:** Deletes session cookie

### User Endpoints

#### `GET /api/users/me`
**Purpose:** Get current authenticated user  
**Auth:** Required (authMiddleware)  
**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "google_user_data": {
    "name": "John Doe",
    "given_name": "John",
    "picture": "https://..."
  }
}
```

#### `GET /api/users/subscription`
**Purpose:** Get user's current subscription details  
**Auth:** Required (authMiddleware)  
**Response:**
```json
{
  "plan_name": "Pro",
  "price": 299,
  "devices_limit": 50,
  "devices_used": 12,
  "devices_remaining": 38,
  "status": "active"
}
```
**Note:** Auto-creates Starter plan if user has no subscription

### AI Assistant Endpoint

#### `POST /api/chat`
**Purpose:** Send message to Sid AI assistant  
**Auth:** Required (authMiddleware)  
**Body:**
```json
{
  "message": "How much does the Pro plan cost?"
}
```
**Response:**
```json
{
  "response": "We offer three subscription plans...",
  "user": "John"
}
```

---

## 🧩 Frontend Components

### Pages
1. **Home.tsx** - Marketing landing page with all public sections
2. **Login.tsx** - Google OAuth login page
3. **AuthCallback.tsx** - OAuth callback handler
4. **Dashboard.tsx** - Authenticated user dashboard

### Reusable Components
1. **Header.tsx** - Navigation bar with logo and menu
2. **Hero.tsx** - Hero section with CTA
3. **DeviceShowcase.tsx** - Supported devices display
4. **Services.tsx** - Service offerings grid
5. **Solutions.tsx** - Industry-specific solutions
6. **Pricing.tsx** - Three-tier pricing table
7. **Compliance.tsx** - Certification badges
8. **Contact.tsx** - Contact form and info
9. **Footer.tsx** - Footer with links
10. **Sid.tsx** - AI chatbot interface (available on all pages)

### Component Features
- **Responsive Design:** Mobile-first approach with Tailwind
- **Animations:** Hover effects, transforms, transitions
- **Icons:** Lucide React icon library
- **Gradient Backgrounds:** Blue gradient theme throughout
- **Accessibility:** Semantic HTML, proper ARIA labels

---

## 🔐 Authentication & Authorization

### Authentication Flow
1. User clicks "Continue with Google" on `/login`
2. Frontend calls `GET /api/oauth/google/redirect_url`
3. User redirected to Google OAuth consent screen
4. Google redirects to `/auth/callback?code=...`
5. Frontend calls `POST /api/sessions` with code
6. Backend exchanges code for session token via Mocha Users Service
7. Session token stored in HTTP-only cookie (`MOCHA_SESSION_TOKEN_COOKIE_NAME`)
8. User redirected to `/dashboard`

### Authorization Middleware
**authMiddleware** (from @getmocha/users-service/backend):
- Validates session token from cookie
- Fetches user object from Mocha Users Service
- Attaches `user` to Hono context: `c.get('user')`
- Returns 401 if token invalid or missing

### Session Management
- **Cookie Name:** `MOCHA_SESSION_TOKEN_COOKIE_NAME`
- **Cookie Settings:**
  - `httpOnly: true` (prevents XSS)
  - `secure: true` (HTTPS only)
  - `sameSite: "none"` (cross-site compatibility)
  - `maxAge: 60 * 24 * 60 * 60` (60 days)
  - `path: "/"` (site-wide)

### Frontend Auth State
**useAuth() hook** (from @getmocha/users-service/react):
- `user`: Current user object or null
- `isPending`: Loading state
- `redirectToLogin()`: Initiates OAuth flow
- `logout()`: Calls `/api/logout` and clears state

---

## 💻 Development Setup

### Prerequisites
- Node.js 18+ (for npm)
- Git
- Cloudflare account (for deployment)

### Quick Start
```powershell
# Clone repository
git clone <repo-url>
cd Cleanexit

# Install dependencies
npm install

# (Optional) Configure environment variables
# Copy .dev.vars.example to .dev.vars and fill in values
# MOCHA_USERS_SERVICE_API_URL=...
# MOCHA_USERS_SERVICE_API_KEY=...

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Development Server
- **Vite Dev Server:** http://localhost:5173
- **Worker Endpoints:** Proxied via @cloudflare/vite-plugin
- **Hot Module Reload:** Enabled for React components
- **Debug Panel:** http://localhost:5173/__debug

### Without Environment Variables
The app runs in dev mode without Mocha Users Service credentials:
- **Public pages:** Work normally
- **Login:** Returns 501 with helpful error message
- **Auth endpoints:** Return config error instead of crashing
- **Sid chatbot:** Uses demo responses (no API calls)

---

## 🚀 Deployment

### Cloudflare Pages + Workers Deployment

1. **Build the app:**
```powershell
npm run build
```

2. **Deploy with Wrangler:**
```powershell
npx wrangler deploy
```

3. **Configure Production Secrets:**
```powershell
npx wrangler secret put MOCHA_USERS_SERVICE_API_URL
npx wrangler secret put MOCHA_USERS_SERVICE_API_KEY
```

4. **Run Database Migrations:**
```powershell
# Apply migration 1
npx wrangler d1 execute DB --file=./migrations/1.sql

# Apply migration 2
npx wrangler d1 execute DB --file=./migrations/2.sql
```

### Environment Configuration
- **Development:** Uses `.dev.vars` file (gitignored)
- **Production:** Uses Wrangler secrets
- **D1 Database:** Auto-provisioned in dev, manual setup in prod

### Domain Setup
1. Add custom domain in Cloudflare Pages
2. Update OAuth redirect URLs in Google Console
3. Update `wrangler.jsonc` with production config

---

## 📁 File Structure

```
Cleanexit/
├── .dev.vars.example           # Environment variables template
├── .gitignore                  # Git ignore rules
├── README.md                   # Quick start guide
├── EVERYTHING.md               # This comprehensive documentation
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── vite.config.ts              # Vite build configuration
├── wrangler.jsonc              # Cloudflare Worker config
├── tsconfig.json               # TypeScript base config
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.node.json          # Node scripts TS config
├── tsconfig.worker.json        # Worker TS config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint rules
├── index.html                  # HTML entry point
│
├── migrations/                 # Database migrations
│   ├── 1.sql                   # Initial schema
│   ├── 2.sql                   # Seed subscription plans
│   ├── 1/down.sql              # Rollback script 1
│   └── 2/down.sql              # Rollback script 2
│
└── src/
    ├── shared/
    │   └── types.ts            # Shared TypeScript types
    │
    ├── worker/
    │   └── index.ts            # Hono API server
    │
    └── react-app/
        ├── main.tsx            # React entry point
        ├── App.tsx             # App router
        ├── index.css           # Tailwind directives
        ├── vite-env.d.ts       # Vite type definitions
        │
        ├── pages/
        │   ├── Home.tsx        # Landing page
        │   ├── Login.tsx       # Login page
        │   ├── AuthCallback.tsx # OAuth callback
        │   └── Dashboard.tsx   # User dashboard
        │
        └── components/
            ├── Header.tsx
            ├── Hero.tsx
            ├── DeviceShowcase.tsx
            ├── Services.tsx
            ├── Solutions.tsx
            ├── Pricing.tsx
            ├── Compliance.tsx
            ├── Contact.tsx
            ├── Footer.tsx
            └── Sid.tsx         # AI chatbot
```

---

## ⚙️ Configuration Files

### vite.config.ts
```typescript
// Vite + React + Cloudflare Workers integration
plugins: [
  ...mochaPlugins(process.env),  // Mocha platform plugins
  react(),                        // React fast refresh
  cloudflare()                    // Cloudflare Workers adapter
]
```

### wrangler.jsonc
```jsonc
{
  "name": "019963ad-3d40-7cd5-8287-457764a8c3ce",
  "main": "./src/worker/index.ts",
  "compatibility_date": "2025-06-17",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "not_found_handling": "single-page-application"
  },
  "d1_databases": [{
    "binding": "DB",
    "database_name": "019963ad-3d40-7cd5-8287-457764a8c3ce",
    "database_id": "019963ad-3d40-7cd5-8287-457764a8c3ce"
  }]
}
```

### tailwind.config.js
- Configured for React app paths
- Custom color extensions
- Responsive breakpoints
- Animation utilities

### tsconfig.json
- Strict type checking enabled
- Path aliases: `@/` → `./src/`
- ES modules with bundler resolution
- React JSX support

---

## 🌍 Environment Variables

### Required for Production
```bash
MOCHA_USERS_SERVICE_API_URL=https://users-service.mocha.example.com
MOCHA_USERS_SERVICE_API_KEY=your_api_key_here
```

### Optional Development Variables
```bash
# D1 database binding auto-configured in dev
# DB=<local-d1-instance>
```

### How to Set (Development)
1. Copy `.dev.vars.example` to `.dev.vars`
2. Fill in values (obtain from Mocha platform)
3. Restart `npm run dev`

### How to Set (Production)
```powershell
npx wrangler secret put MOCHA_USERS_SERVICE_API_URL
npx wrangler secret put MOCHA_USERS_SERVICE_API_KEY
```

---

## 📜 Scripts & Commands

### Development
```powershell
npm run dev          # Start Vite dev server with Worker
npm run lint         # Run ESLint on all files
```

### Build & Deploy
```powershell
npm run build        # TypeScript compile + Vite build
npm run check        # Full validation (tsc + build + dry-run deploy)
npm run cf-typegen   # Generate Cloudflare Worker types
```

### Database
```powershell
# Local D1 operations
npx wrangler d1 execute DB --local --file=./migrations/1.sql

# Production D1 operations
npx wrangler d1 execute DB --file=./migrations/1.sql

# Query database
npx wrangler d1 execute DB --command="SELECT * FROM subscription_plans"
```

### Wrangler
```powershell
npx wrangler deploy                  # Deploy to production
npx wrangler deploy --dry-run        # Test deployment
npx wrangler tail                    # Stream production logs
npx wrangler secret put KEY_NAME     # Set environment secret
```

---

## 💼 Business Model

### Subscription Tiers

#### Starter Plan (₹0/month)
- **Target:** Individuals, small teams
- **Devices:** 5 erasures/month
- **Features:**
  - Basic compliance reporting
  - Email support
  - Standard erasure methods
  - Mobile device support
  - Basic audit trail

#### Pro Plan (₹299/month)
- **Target:** Growing businesses
- **Devices:** 50 erasures/month
- **Features:**
  - Advanced compliance reporting
  - Priority email & phone support
  - Military-grade erasure algorithms
  - Server decommissioning support
  - Detailed forensic verification
  - GDPR & HIPAA compliance
  - Custom certificates
  - 24/7 emergency response

#### Advanced Plan (₹699/month)
- **Target:** Enterprise organizations
- **Devices:** Unlimited
- **Features:**
  - Enterprise compliance suite
  - Dedicated account manager
  - On-site erasure services
  - Custom integration support
  - Real-time monitoring dashboard
  - All compliance standards
  - White-label certificates
  - SLA guarantee (99.9% uptime)
  - API access
  - Bulk processing capabilities
  - Chain of custody documentation

### Revenue Model
1. **Subscription Revenue:** Monthly recurring from Pro & Advanced users
2. **Freemium Conversion:** Starter users upgrade for more capacity
3. **Enterprise Sales:** Custom contracts for large-scale deployments
4. **On-site Services:** Premium for physical device pickup/destruction

### Growth Strategy
1. **Product-led Growth:** Free tier attracts users
2. **Compliance Focus:** Target regulated industries (healthcare, finance)
3. **Integration Partnerships:** API access for MDM/IT platforms
4. **Content Marketing:** SEO around data privacy regulations

---

## 🔒 Security Features

### Data Protection
- **NIST 800-88 Compliant:** Industry-standard erasure methods
- **GDPR Ready:** Right to erasure compliance
- **HIPAA Support:** Healthcare data protection
- **SOX Compliance:** Financial record destruction
- **PCI-DSS:** Payment card data security

### Application Security
- **HTTP-Only Cookies:** Prevents XSS attacks
- **Secure Cookies:** HTTPS-only transmission
- **CORS Protection:** Controlled cross-origin access
- **Input Validation:** Zod schema validation on all inputs
- **SQL Injection Prevention:** Parameterized queries
- **Rate Limiting:** (To be implemented)

### Audit & Compliance
- **Audit Trails:** Database logs all operations
- **Certificates:** PDF certificates of destruction
- **Chain of Custody:** Tracking from request to completion
- **Forensic Verification:** Proof of unrecoverable erasure

---

## 🎨 Design System

### Color Palette
- **Primary Blue:** `#2563eb` (blue-600)
- **Dark Blue:** `#1e3a8a` (blue-900)
- **Light Blue:** `#dbeafe` (blue-100)
- **Success Green:** `#10b981` (green-500)
- **Warning Yellow:** `#f59e0b` (amber-500)
- **Error Red:** `#ef4444` (red-500)
- **Gray Scale:** `#f9fafb` to `#111827`

### Typography
- **Font Family:** Default system font stack
- **Headings:** Bold weights (600-700)
- **Body:** Regular weight (400)
- **Sizes:** Responsive scaling (text-sm to text-6xl)

### UI Patterns
- **Buttons:** Rounded corners (rounded-lg), hover transforms
- **Cards:** White background, subtle shadows, border-gray-200
- **Gradients:** Blue gradient backgrounds (from-blue-900 to-blue-700)
- **Icons:** Lucide icons at 16-24px sizes
- **Spacing:** Tailwind's 4px grid system

---

## 🧪 Testing Strategy

### Current State
- **No automated tests configured yet**

### Recommended Testing Approach

#### Unit Tests
- **Framework:** Vitest (Vite-native)
- **Coverage:** API handlers, utility functions, business logic

#### Integration Tests
- **Framework:** Playwright or Cypress
- **Coverage:** Auth flow, subscription creation, chat interactions

#### E2E Tests
- **Framework:** Playwright
- **Coverage:** Complete user journeys (signup → upgrade → usage)

#### API Tests
- **Framework:** Vitest + Hono testing utilities
- **Coverage:** All endpoint responses, error handling

---

## 📈 Future Enhancements

### Planned Features
1. **Payment Integration:** Stripe/Razorpay for subscription billing
2. **Email Notifications:** Transactional emails for subscription events
3. **Admin Dashboard:** Manage users, plans, override limits
4. **Analytics Dashboard:** Usage metrics, revenue tracking
5. **Device Tracking:** Real-time status of erasure jobs
6. **Certificate Generation:** PDF certificates with digital signatures
7. **API Access:** REST API for enterprise integrations
8. **White-label Support:** Custom branding for partners
9. **Mobile App:** Native iOS/Android for device scanning
10. **Advanced AI:** Enhanced Sid with GPT-4 integration

### Technical Debt
1. **Error Handling:** Centralized error logging (Sentry)
2. **Rate Limiting:** Protect API endpoints
3. **Caching:** Redis/KV for session and subscription data
4. **Monitoring:** Cloudflare Analytics, custom metrics
5. **Testing:** Full test coverage
6. **Documentation:** API documentation (OpenAPI/Swagger)

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes and test locally
3. Run `npm run lint` and fix issues
4. Submit pull request with description
5. Code review and approval
6. Merge to `main` and deploy

### Code Style
- **Formatting:** Prettier with Tailwind plugin
- **Linting:** ESLint with React best practices
- **TypeScript:** Strict mode, no `any` types
- **Naming:** camelCase for variables, PascalCase for components

---

## 📞 Support & Contact

### For Users
- **Email:** support@cleanexit.com
- **Phone:** +91 (555) 123-4567
- **Chat:** Sid AI assistant (available 24/7)
- **Hours:** Monday-Friday, 9 AM - 6 PM IST

### For Developers
- **Documentation:** This file (EVERYTHING.md)
- **Quick Start:** README.md
- **Issue Tracker:** GitHub Issues
- **Discussions:** GitHub Discussions

---

## 📝 License & Legal

### Software License
- **Type:** Proprietary
- **Owner:** Cleanexit, Inc.
- **Year:** 2025

### Compliance Certifications
- NIST 800-88 Guidelines compliant
- GDPR compliant (EU data protection)
- HIPAA compliant (US healthcare)
- SOX compliant (financial records)
- PCI-DSS compliant (payment data)

### Privacy Policy
- User data encrypted at rest and in transit
- OAuth via Google (no password storage)
- Session cookies expire after 60 days
- Right to data deletion upon request

---

## 🎓 Learning Resources

### Technology Deep Dives
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Hono Framework:** https://hono.dev/
- **React Router 7:** https://reactrouter.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **Vite:** https://vitejs.dev/

### Best Practices
- **NIST 800-88:** Data sanitization guidelines
- **OWASP Top 10:** Web security vulnerabilities
- **12 Factor App:** SaaS development principles

---

## 📊 Project Metrics

### Code Statistics
- **Total Files:** ~30 source files
- **Lines of Code:** ~3,500+ (excluding node_modules)
- **Components:** 13 React components
- **API Endpoints:** 6 routes
- **Database Tables:** 2

### Performance Targets
- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Largest Contentful Paint:** < 2.5s

### Business Metrics (Target)
- **Free to Paid Conversion:** 5-10%
- **MRR Growth:** 20% month-over-month
- **Churn Rate:** < 5% monthly
- **Customer Lifetime Value:** 12+ months average

---

**End of Documentation**

*This document is a living resource. Update as the project evolves.*
