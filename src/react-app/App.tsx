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
import HomePage from "@/react-app/pages/Home";
import LoginPage from "@/react-app/pages/Login";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import DashboardPage from "@/react-app/pages/Dashboard";

export default function App() {
  return (
    // AuthProvider gives all child components access to user state
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route - anyone can access */}
          <Route path="/" element={<HomePage />} />
          
          {/* Login route - shows Google sign-in button */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* OAuth callback - handles redirect from Google */}
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          {/* Protected route - auto-redirects to /login if not authenticated */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
