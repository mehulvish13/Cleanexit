# 📚 Cleanexit Project Documentation Index

Welcome to the Cleanexit project! This file helps you navigate all the documentation and understand the codebase quickly.

## 🎯 Quick Start

**New to the project?** Start here:
1. Read `README.md` - Quick setup instructions
2. Review `EVERYTHING.md` - Complete project overview
3. Check `DEPENDENCIES.md` - Understand what each package does
4. Browse the code (now fully commented!)

## 📖 Documentation Files

### README.md
**Purpose:** Quick start guide  
**Contains:**
- Installation steps
- How to run the dev server
- Environment variable setup
- Basic commands

**Read this if:** You want to get the app running locally ASAP

---

### EVERYTHING.md
**Purpose:** Comprehensive project documentation (600+ lines)  
**Contains:**
- Project overview and business model
- Complete technology stack breakdown
- Architecture diagrams and data flow
- All features explained in detail
- Database schema with relationships
- API endpoint documentation with examples
- Authentication flow walkthrough
- Deployment guide
- Future enhancements roadmap

**Read this if:** You want to understand the entire project, architecture, or business strategy

---

### DEPENDENCIES.md
**Purpose:** Explain every npm package and script  
**Contains:**
- What each dependency does and why we need it
- Production vs development dependencies
- NPM scripts explained (`dev`, `build`, `lint`, etc.)
- Dependency update strategies
- How to add/remove packages

**Read this if:** You're wondering "What does this package do?" or "Why do we need this?"

---

### .dev.vars.example
**Purpose:** Template for local environment variables  
**Contains:**
- Required env vars for authentication
- Instructions on how to use it

**Read this if:** Login isn't working in dev mode

---

## 🗂️ Code Structure & Comments

All major files now have **human-friendly comments** explaining:
- What the file does
- How functions work
- Why we made certain design decisions
- Common gotchas and tips

### Backend (Worker)

**`src/worker/index.ts`** - Main API server
- Detailed comments for each route
- Explains OAuth flow step-by-step
- Documents request/response formats
- Security considerations

### Frontend (React)

**`src/react-app/main.tsx`** - Entry point
- Why we use StrictMode
- How the app initializes

**`src/react-app/App.tsx`** - Root component
- Route structure explained
- Authentication context setup

**`src/react-app/pages/`** - Page components
- **Home.tsx** - Marketing landing page sections
- **Login.tsx** - OAuth login flow explained
- **Dashboard.tsx** - User dashboard features and data fetching
- **AuthCallback.tsx** - OAuth redirect handler

**`src/react-app/components/Sid.tsx`** - AI chatbot
- How Sid works
- Keyword detection logic
- Future AI enhancement notes
- Message handling flow

### Database

**`migrations/1.sql`** - Initial schema
- Table structure explained
- Relationship between plans and subscriptions
- How device limits work
- Seed data for 3 pricing tiers

**`migrations/2.sql`** - Plan refresh
- Why we need idempotent migrations
- INSERT OR IGNORE strategy

### Configuration

**`vite.config.ts`** - Vite build configuration
- Plugin purposes
- Path aliases (@/)
- Development server settings

**`tailwind.config.js`** - Tailwind CSS config
- Content scanning for tree-shaking
- Theme extension options

**`wrangler.jsonc`** - Cloudflare Worker config
- D1 database binding
- SPA routing setup
- Compatibility settings

**`package.json`** - Dependencies and scripts
- (See DEPENDENCIES.md for detailed explanations)

---

## 🔍 Finding What You Need

### "I want to understand..."

**...how login works**
1. Read comments in `src/react-app/pages/Login.tsx`
2. Read comments in `src/worker/index.ts` (OAuth routes)
3. Check EVERYTHING.md → Authentication section

**...how subscriptions work**
1. Read comments in `migrations/1.sql` (database schema)
2. Read comments in `src/worker/index.ts` (/api/users/subscription route)
3. Read comments in `src/react-app/pages/Dashboard.tsx` (UI display)
4. Check EVERYTHING.md → Database Schema section

**...how the AI chatbot works**
1. Read comments in `src/react-app/components/Sid.tsx`
2. Read comments in `src/worker/index.ts` (/api/chat route)
3. Check EVERYTHING.md → Features → AI Assistant section

**...how to deploy**
1. Check EVERYTHING.md → Deployment section
2. Run `npm run check` to validate
3. Use `npx wrangler deploy`

**...what a package does**
1. Open DEPENDENCIES.md
2. Search for the package name
3. Read its purpose, why we need it, and where it's used

**...project architecture**
1. Check EVERYTHING.md → Architecture section
2. View the ASCII diagram showing data flow
3. Review Technology Stack section

---

## 🏗️ Development Workflow

### First Time Setup
```bash
# 1. Clone repository
git clone <repo-url>
cd Cleanexit

# 2. Install dependencies
npm install

# 3. (Optional) Configure auth
cp .dev.vars.example .dev.vars
# Edit .dev.vars with your credentials

# 4. Start dev server
npm run dev

# 5. Open http://localhost:5173
```

### Daily Development
```bash
# Start dev server
npm run dev

# In another terminal, run linter
npm run lint

# Fix auto-fixable issues
npm run lint --fix

# Before committing, validate
npm run check
```

### Adding Features
1. Create new files in appropriate directories
2. Add comments explaining what the code does
3. Update EVERYTHING.md if adding major features
4. Test locally with `npm run dev`
5. Validate with `npm run check`
6. Commit and push

---

## 🧭 File Navigation Map

```
Cleanexit/
│
├── 📄 Documentation (Start Here!)
│   ├── README.md              → Quick start guide
│   ├── EVERYTHING.md          → Complete documentation
│   ├── DEPENDENCIES.md        → Package explanations
│   ├── DOCS_INDEX.md          → This file!
│   └── .dev.vars.example      → Env var template
│
├── ⚙️ Configuration
│   ├── package.json           → Dependencies & scripts
│   ├── vite.config.ts         → Build tool config
│   ├── wrangler.jsonc         → Cloudflare Worker config
│   ├── tailwind.config.js     → CSS framework config
│   ├── tsconfig.json          → TypeScript config
│   ├── eslint.config.js       → Linting rules
│   └── postcss.config.js      → CSS processing
│
├── 🗄️ Database
│   └── migrations/
│       ├── 1.sql              → Initial schema + seed data
│       ├── 2.sql              → Plan refresh migration
│       ├── 1/down.sql         → Rollback script
│       └── 2/down.sql         → Rollback script
│
├── 💻 Backend (Cloudflare Worker)
│   └── src/worker/
│       └── index.ts           → API routes (auth, subscriptions, chat)
│
├── 🎨 Frontend (React App)
│   └── src/react-app/
│       ├── main.tsx           → Entry point
│       ├── App.tsx            → Root component & routing
│       ├── index.css          → Tailwind directives
│       │
│       ├── pages/             → Page components
│       │   ├── Home.tsx       → Landing page
│       │   ├── Login.tsx      → Login page
│       │   ├── AuthCallback.tsx → OAuth callback
│       │   └── Dashboard.tsx  → User dashboard
│       │
│       └── components/        → Reusable components
│           ├── Header.tsx     → Navigation
│           ├── Hero.tsx       → Hero section
│           ├── Pricing.tsx    → Pricing table
│           ├── Sid.tsx        → AI chatbot
│           └── ... (9 more)
│
└── 🔧 Shared
    └── src/shared/
        └── types.ts           → Shared TypeScript types
```

---

## 💡 Tips for Understanding the Codebase

### Reading Comments
- **Block comments (`/** ... */`)** at the top of files explain the whole file
- **Inline comments (`//`)** explain specific lines or decisions
- Look for `WHY` explanations, not just `WHAT`

### Following Data Flow
1. **User action** (e.g., clicks "Login")
2. **Frontend** (React component handles click)
3. **API call** (fetch to `/api/...`)
4. **Backend** (Worker route processes request)
5. **Database** (D1 query if needed)
6. **Response** (JSON back to frontend)
7. **UI update** (React re-renders with new data)

### Understanding Routes
- **Public routes:** `/` (Home)
- **Auth routes:** `/login`, `/auth/callback`
- **Protected routes:** `/dashboard` (requires login)
- **API routes:** `/api/*` (backend endpoints)

### TypeScript Types
- **Interfaces** define object shapes (`SubscriptionData`)
- **Type inference** with `z.infer<typeof Schema>`
- **Props** typed for component inputs
- **Generics** like `Hono<{ Bindings: Env }>`

---

## 🎓 Learning Resources

### For React Beginners
- Read comments in `src/react-app/App.tsx`
- Study `src/react-app/pages/Login.tsx` (simple page)
- Progress to `src/react-app/pages/Dashboard.tsx` (complex page)

### For Backend Beginners
- Read comments in `src/worker/index.ts`
- Start with `/api/users/me` (simplest route)
- Progress to `/api/users/subscription` (database query)
- Study `/api/oauth/google/redirect_url` (external API)

### For Database Beginners
- Read comments in `migrations/1.sql`
- Understand table relationships
- See how subscriptions link to plans
- Study the SQL queries in Worker routes

---

## 🚀 Common Tasks

### Add a New API Endpoint
1. Open `src/worker/index.ts`
2. Add route with comment block
3. Define TypeScript types in `src/shared/types.ts`
4. Test with `npm run dev`

### Add a New Page
1. Create file in `src/react-app/pages/`
2. Add route to `src/react-app/App.tsx`
3. Add comment explaining page purpose
4. Build UI with Tailwind components

### Add a New Component
1. Create file in `src/react-app/components/`
2. Add comment explaining component purpose
3. Import and use in pages
4. Keep it focused on one responsibility

### Run Database Migration
```bash
# Local
npx wrangler d1 execute DB --local --file=./migrations/X.sql

# Production
npx wrangler d1 execute DB --file=./migrations/X.sql
```

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all
npm update

# Update one package
npm install package@latest

# Check for vulnerabilities
npm audit
npm audit fix
```

---

## 🐛 Debugging Tips

### Dev Server Won't Start
- Check `package.json` for correct scripts
- Run `npm install` again
- Check for port conflicts (5173)
- Review Vite error messages

### Login Not Working
- Check `.dev.vars` exists with correct values
- Review browser console for errors
- Check Network tab for API responses
- Read comments in `src/worker/index.ts` OAuth routes

### Database Errors
- Check if migrations ran successfully
- Verify `wrangler.jsonc` database binding
- Test queries in D1 console
- Review comments in `migrations/` files

### TypeScript Errors
- Run `npm run lint` to see all errors
- Check import paths (use `@/` alias)
- Verify type definitions exist
- Read error messages carefully (they're helpful!)

---

## 📞 Getting Help

1. **Read the comments** in the relevant files
2. **Check EVERYTHING.md** for comprehensive info
3. **Review DEPENDENCIES.md** if it's package-related
4. **Search this file** for your topic
5. **Ask for help** with specific code references

---

## 🎯 Next Steps

Now that you understand the documentation structure:

1. ✅ Run `npm run dev` to see the app in action
2. ✅ Open a file and read the comments
3. ✅ Make a small change and see it update instantly
4. ✅ Explore the dashboard and test features
5. ✅ Read EVERYTHING.md sections relevant to your work

**Happy coding! 🚀**

---

*Last updated: October 31, 2025*
