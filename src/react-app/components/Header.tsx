import { Shield, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  // Check if we're on the home page to show anchor links
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Left: Logo & Brand */}
        <button
          onClick={() => handleNavigation('/')}
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Go to homepage"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 shadow-inner">
            <Shield className="h-6 w-6" />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="font-heading text-lg font-semibold tracking-tight text-slate-900">
              Cleanexit
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-slate-400 sm:block">
              Secure Data Erasure
            </span>
          </span>
        </button>

        {/* Center: Main Navigation Links (Desktop) */}
        <ul className="hidden items-center gap-1 lg:flex">
            {isHomePage ? (
              <>
                <li>
                  <a
                    href="#services"
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                  >
                    Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#compliance"
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                  >
                    Compliance
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                  >
                    Contact
                  </a>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Home
                </button>
              </li>
            )}
            
            {/* Divider */}
            <li className="mx-3 h-6 w-px bg-slate-200" />
            
            {/* Secondary Links */}
            <li>
              <button
                onClick={() => handleNavigation('/about')}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/support')}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
              >
                Support
              </button>
            </li>
          </ul>

          {/* Right: User Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            
            {user ? (
              <>
                {/* Dashboard Button */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Dashboard
                </button>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 rounded-full px-3 py-2 transition-colors hover:bg-slate-100"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="max-w-[120px] truncate text-sm font-medium text-slate-700">
                      {user.username}
                    </span>
                    <svg 
                      className={`h-4 w-4 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white py-2 shadow-soft"
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                      >
                        <div className="border-b border-slate-100 px-4 py-3">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {user.username}
                          </p>
                          <p className="text-xs text-slate-400">
                            Account
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/dashboard');
                          }}
                          className="w-full px-4 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                        >
                          Profile
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            // Add settings page navigation when available
                            navigate('/dashboard');
                          }}
                          className="w-full px-4 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                        >
                          Settings
                        </button>
                        
                        <div className="mt-2 border-t border-slate-100 pt-2">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              // Add logout functionality
                              navigate('/login');
                            }}
                            className="w-full px-4 py-2 text-left text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  const current = location.pathname + location.search + location.hash;
                  navigate(`/login?returnTo=${encodeURIComponent(current)}`);
                }}
                className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-700"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white md:hidden"
            >
              <nav className="flex flex-col gap-2 px-4 py-4">
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => { setIsMenuOpen(false); navigate('/about'); }}
                  className="rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  About
                </motion.button>
                
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={() => { setIsMenuOpen(false); navigate('/support'); }}
                  className="rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Support
                </motion.button>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Services
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  href="#solutions"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Solutions
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href="#pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Pricing
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  href="#compliance"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Compliance
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  Contact
                </motion.a>

                {user ? (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mt-1 border-t border-slate-200 pt-3"
                  >
                    <div className="mb-1 flex items-center gap-2 px-3 py-2">
                      <User className="h-5 w-5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">
                        {user.username}
                      </span>
                    </div>
                    <button
                      onClick={() => { setIsMenuOpen(false); navigate('/dashboard'); }}
                      className="w-full rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-700"
                    >
                      Go to Dashboard
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      const current = location.pathname + location.search + location.hash;
                      navigate(`/login?returnTo=${encodeURIComponent(current)}`);
                    }}
                    className="mt-1 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-700"
                  >
                    Sign In
                  </motion.button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
