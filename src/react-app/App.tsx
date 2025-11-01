/**
 * ROOT APP COMPONENT
 * 
 * This is the top-level component that sets up:
 * 1. Authentication context (AuthProvider) - manages user login state
 * 2. Routing (Router) - handles navigation between pages
 * 
 * ROUTE STRUCTURE:
 * - / → Home page (public marketing site)
 * - /login → Simple username login page
 * - /dashboard → User's private dashboard (requires login)
 * - /certificate → Certificate generation page (auto-starts wipe and generates cert)
 * 
 * The AuthProvider wraps everything so all components can access:
 * - user: Current logged-in user or null
 * - isPending: Loading state
 * - login(username): Function to log in
 * - logout(): Function to log out
 */

import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@/react-app/contexts/AuthContext';
import ErrorBoundary from "@/react-app/components/ErrorBoundary";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import CertificatePage from "./pages/Certificate";
import AboutPage from "./pages/About";
import SupportPage from "./pages/Support";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            {/* Public route - Landing page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Certificate page - wipe and generate certificate */}
            <Route path="/certificate" element={<CertificatePage />} />
            
            {/* Company pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Login route - username-only */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected route - auto-redirects to /login if not authenticated */}
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}
