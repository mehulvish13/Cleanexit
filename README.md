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
- **Routing**: react-router-dom
- **Worker**: Cloudflare Workers (optional)

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

## Run the app locally

1) Install dependencies
```bash
npm install
```

2) (Optional but recommended) Configure local env vars for the Worker

Create a `.dev.vars` file at the project root (you can copy `.dev.vars.example`) and set:

```
MOCHA_USERS_SERVICE_API_URL=...
MOCHA_USERS_SERVICE_API_KEY=...
```

Without these, the UI will run, but auth-related API calls (login, user info) will return Unauthorized in dev.

3) Start the dev server
```bash
npm run dev
```

This starts Vite on http://localhost:5176 and runs the Cloudflare Worker endpoints alongside it via the Cloudflare Vite plugin.

4) Build for production
```bash
npm run build
```

5) Preview production build
```bash
npm run preview
```

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