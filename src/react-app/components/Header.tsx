import { Shield, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-brand-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Cleanexit</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Services</a>
            <a href="#solutions" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Solutions</a>
            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Pricing</a>
            <a href="#compliance" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Compliance</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Contact</a>
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-2">
                  {user.google_user_data.picture ? (
                    <img
                      src={user.google_user_data.picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.google_user_data.given_name || 'User'}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-soft"
              >
                Sign In
              </button>
            )}
            <div className="pl-2">
              <ThemeToggle />
            </div>
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Services</a>
              <a href="#solutions" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Solutions</a>
              <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Pricing</a>
              <a href="#compliance" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Compliance</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">Contact</a>
              {user ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium w-full shadow-soft"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium w-full shadow-soft"
                >
                  Sign In
                </button>
              )}
              <div>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
