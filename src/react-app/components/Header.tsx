import { Shield, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

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
    <header className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo & Brand */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              aria-label="Go to homepage"
            >
              <Shield className="w-8 h-8 text-brand-600 dark:text-brand-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Cleanexit</span>
            </button>
          </div>
          
          {/* Center: Main Navigation Links (Desktop) */}
          <ul className="hidden lg:flex items-center space-x-1">
            {isHomePage ? (
              <>
                <li>
                  <a 
                    href="#services" 
                    className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#solutions" 
                    className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                  >
                    Solutions
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a 
                    href="#compliance" 
                    className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                  >
                    Compliance
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                  >
                    Contact
                  </a>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={() => handleNavigation('/')} 
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                >
                  Home
                </button>
              </li>
            )}
            
            {/* Divider */}
            <li className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></li>
            
            {/* Secondary Links */}
            <li>
              <button 
                onClick={() => handleNavigation('/about')} 
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/support')} 
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
              >
                Support
              </button>
            </li>
          </ul>

          {/* Right: User Actions & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <>
                {/* Dashboard Button */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                >
                  Dashboard
                </button>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white font-semibold text-sm">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium max-w-[100px] truncate">
                      {user.username}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
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
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                      >
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.username}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Account
                          </p>
                        </div>
                        
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/dashboard');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Profile
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            // Add settings page navigation when available
                            navigate('/dashboard');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Settings
                        </button>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              // Add logout functionality
                              navigate('/login');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white px-6 py-2 rounded-lg transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
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
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-3 py-4 border-t border-gray-200 dark:border-gray-800">
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => { setIsMenuOpen(false); navigate('/about'); }}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  About
                </motion.button>
                
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={() => { setIsMenuOpen(false); navigate('/support'); }}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Support
                </motion.button>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Services
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  href="#solutions"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Solutions
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href="#pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Pricing
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  href="#compliance"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Compliance
                </motion.a>
                
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Contact
                </motion.a>

                {user ? (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="pt-2 border-t border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-center space-x-2 px-4 py-2 mb-2">
                      <User className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {user.username}
                      </span>
                    </div>
                    <button
                      onClick={() => { setIsMenuOpen(false); navigate('/dashboard'); }}
                      className="w-full bg-brand-600 text-white px-4 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-soft"
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
                    className="mt-2 bg-brand-600 text-white px-4 py-3 rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-soft"
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
