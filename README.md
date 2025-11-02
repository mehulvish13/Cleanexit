# Cleanexit - Professional Data Security Platform

A modern, responsive React application for enterprise data security and secure deletion services. Built with React 19, TypeScript, Tailwind CSS, and featuring a professional dark mode UI.

## 🎨 Features

### Professional UI Design
- **Dark Mode Support**: System-aware dark mode with toggle and localStorage persistence
- **Simple Authentication**: Username-only login with localStorage persistence
- **Modern Shadows**: Soft and card shadow utilities for depth
- **Error Handling**: ErrorBoundary component for graceful error recovery

### Core Sections
- ✅ **Hero**: Eye-catching gradient with responsive text scaling
- ✅ **Services**: Professional service cards with hover effects
- ✅ **Solutions**: 3-column responsive grid
- ✅ **Pricing**: Three-tier subscription plans
- ✅ **Device Showcase**: Featured wiping center card
- ✅ **Compliance**: Certification badges (NIST, GDPR, HIPAA, SOX, DoD, ISO 27001)
- ✅ **Contact**: Quote request form with contact information
- ✅ **Wipe Flow**: Interactive device wiping with PDF certificate generation

## 🚀 Technology Stack

- **Frontend**: React 19.0.0 + TypeScript 5.8.3
- **Styling**: Tailwind CSS (custom theme with dark mode)
- **Build Tool**: Vite 6.4.1
- **Icons**: lucide-react
- **PDF**: jsPDF
- **Routing**: react-router 7
- **Backend (optional)**: Vercel Serverless Functions + Supabase (PostgreSQL)

## 🎨 Theme Configuration

### Brand Colors
Primary brand color: `#1d6af5` (brand-600)  
Full palette: brand-50 → brand-950  
Dark mode: Custom surface-950 for backgrounds

### Dark Mode
- **Mode**: class-based (`dark:` prefix)
- **Toggle**: ThemeToggle component in header
- **Persistence**: localStorage with system preference fallback

## 📱 Responsive Breakpoints
- **sm**: 640px (tablets)
- **md**: 768px (small laptops)
- **lg**: 1024px (desktops)
- **xl**: 1280px+ (large screens)

## 🚀 Quick Start

### Development

1. **Install dependencies**
```bash
npm install
```

2. **Start the dev server**
```bash
npm run dev
```
Open [http://localhost:5176](http://localhost:5176) in your browser.

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 🔌 Optional API Backend (Vercel + Supabase)

This project includes ready-to-use serverless API routes under `api/` that run on Vercel. If you want to persist certificates or tickets, connect a Supabase database.

- API endpoints:
   - `POST /api/certificate` – generate a wipe certificate
   - `POST /api/auth/login` – simple username login (create or fetch user)
   - `POST /api/support/ticket` – create a support ticket

Docs:
- Backend details: `BACKEND_README.md`
- Quick start: `QUICK_START.md`
- Database schema: `database/schema.sql`

Environment variables (copy `.env.example`):
```
VITE_SUPABASE_URL=...            # frontend
VITE_SUPABASE_ANON_KEY=...       # frontend
SUPABASE_URL=...                 # backend (serverless functions)
SUPABASE_SERVICE_KEY=...         # backend (secret)
```

## 🌐 Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

Follow the prompts to deploy your project. Vercel will automatically detect the Vite framework.

### Option 2: Deploy via GitHub

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`
   - Click "Deploy"

### Option 3: Deploy with Vercel Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mehulvish13/Cleanexit)

### Vercel Configuration

The project includes a `vercel.json` file with:
- ✅ SPA routing (all routes → index.html)
- ✅ API passthrough for `/api/*` serverless routes
- ✅ Asset caching (1 year for static files)
- ✅ Security headers (XSS, Frame, Content-Type protection)

### Environment Variables (Optional)

Add these in Vercel → Project Settings → Environment Variables (Production, Preview, Development):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
```
Then redeploy. See `.env.example`.

### Custom Domain

After deployment:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed

---

## 🛠️ Development Guide

## 🎯 Recent Enhancements

### Professional UI Improvements
✅ Brand Theme System with custom Tailwind configuration  
✅ Dark Mode toggle with persistence across all components  
✅ Responsive Design with mobile-first breakpoints  
✅ Reusable Button and ThemeToggle components  
✅ ErrorBoundary for production-ready error handling  
✅ Theme-color meta tags for OS-level theming  

### Component Updates
- ✅ **Compliance**: Responsive grid, dark mode support, brand colors
- ✅ **Contact**: Form inputs with dark mode, responsive layout, brand accents
- ✅ **WipeFlow**: Certificate generation with responsive states and dark mode
- ✅ **Footer**: Brand colors, responsive design, dark mode transitions
- ✅ **Header**: ThemeToggle integration, responsive navigation
- ✅ **Hero**: Brand gradient, responsive text scaling
- ✅ **Services**: Button component integration, dark mode
- ✅ **Solutions**: Responsive grid layout with dark mode
- ✅ **Pricing**: Mobile-friendly text and grid scaling
- ✅ **DeviceShowcase**: Mobile padding and responsive text

## 🔐 Security & Compliance

Supports industry-standard data erasure protocols:
- **NIST 800-88**: Media sanitization guidelines
- **DoD 5220.22-M**: Department of Defense standard
- **GDPR**: EU data protection compliance
- **HIPAA**: Healthcare data security
- **SOX**: Financial data protection
- **ISO 27001**: Information security management

## 📄 License

© 2024 Cleanexit. All rights reserved.

## 🤝 Support

- **Phone**: 1-800-CLEANEXIT
- **Email**: info@cleanexit.com
- **Hours**: Mon-Fri 8AM-6PM, Emergency 24/7

---

**Built with React 19, TypeScript, and Tailwind CSS**