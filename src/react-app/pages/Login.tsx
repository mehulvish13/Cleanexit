/**
 * LOGIN PAGE
 * 
 * Simple username-only authentication.
 * 
 * FEATURES:
 * - If user is already logged in, auto-redirects to /dashboard
 * - Username-only entry (no password required)
 * - Stored in localStorage for persistence
 * - Back to Home button for easy navigation
 */

import { useAuth } from '@/react-app/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Shield, ArrowLeft, User } from 'lucide-react';

export default function LoginPage() {
  const { user, login, isPending } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');

  // If user is already logged in, go back to returnTo (or home)
  useEffect(() => {
    if (user) {
      const params = new URLSearchParams(location.search);
      const returnTo = params.get('returnTo') || '/';
      navigate(returnTo);
    }
  }, [user, navigate, location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      const params = new URLSearchParams(location.search);
      const returnTo = params.get('returnTo') || '/';
      navigate(returnTo);
    }
  };

  // Show loading state while checking if user is logged in
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 dark:from-surface-950 dark:to-brand-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 dark:from-surface-950 dark:to-brand-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-md w-full">
        <div className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-brand-600 dark:text-brand-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Cleanexit</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to access your secure data management dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent transition-all"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-600 text-white px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium flex items-center justify-center space-x-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              By signing in, you agree to our{' '}
              <a href="#" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
