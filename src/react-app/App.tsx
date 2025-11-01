/**
 * ROOT APP COMPONENT
 * 
 * This is the top-level component that sets up:
 * 1. Authentication context (AuthProvider) - manages user login state
 * 2. Routing (Router) - handles navigation between pages
 * 
 * ROUTE STRUCTURE:
 * - / → Home page (public marketing site)
 * - /login → Google OAuth login page
 * - /auth/callback → Where Google redirects after login
 * - /dashboard → User's private dashboard (requires login)
 * 
 * The AuthProvider wraps everything so all components can access:
 * - user: Current logged-in user or null
 * - isPending: Loading state
 * - redirectToLogin(): Function to start login flow
 * - logout(): Function to log out
 */

import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@getmocha/users-service/react';
import ErrorBoundary from "@/react-app/components/ErrorBoundary";
import HomePage from "@/react-app/pages/Home";
import DynamicHomePage from "@/react-app/pages/DynamicHome";
import LoginPage from "@/react-app/pages/Login";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import DashboardPage from "@/react-app/pages/Dashboard";
import WipePage from "@/react-app/pages/Wipe";

export default function App() {
  // Toggle between static and dynamic home page
  const useDynamicHome = false; // Set to true to use dynamic section architecture
  
  return (
    // AuthProvider gives all child components access to user state
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
          {/* Public route - Landing page */}
          <Route path="/" element={useDynamicHome ? <DynamicHomePage /> : <HomePage />} />
          
          {/* Wipe page - anyone can access */}
          <Route path="/wipe" element={<WipePage />} />
          
          {/* Login route - shows Google sign-in button */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* OAuth callback - handles redirect from Google */}
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          {/* Protected route - auto-redirects to /login if not authenticated */}
          <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}
