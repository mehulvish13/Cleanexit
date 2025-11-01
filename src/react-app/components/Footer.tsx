import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-surface-950 text-white py-12 sm:py-16 transition-colors border-t border-gray-800 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-brand-400 dark:text-brand-300" />
              <span className="text-lg sm:text-xl font-bold">Cleanexit</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 leading-relaxed">
              Professional data security and secure deletion services for enterprises. 
              Protecting your sensitive information with industry-leading standards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-400 dark:hover:text-brand-300 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400 dark:hover:text-brand-300 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Hard Drive Erasure</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Server Decommissioning</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Mobile Device Wiping</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Database Sanitization</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Emergency Response</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Company</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><a href="/about" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Certifications</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Blog</a></li>
              <li><a href="/support" className="text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-sm sm:text-base text-gray-400 dark:text-gray-500">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 flex-shrink-0" />
                <span>1-800-CLEANEXIT</span>
              </div>
              <div className="flex items-center text-sm sm:text-base text-gray-400 dark:text-gray-500">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 flex-shrink-0" />
                <span>info@cleanexit.com</span>
              </div>
              <div className="flex items-start text-sm sm:text-base text-gray-400 dark:text-gray-500">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 mt-1 flex-shrink-0" />
                <span>123 Security Drive<br />Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700/50 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © 2024 Cleanexit. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 text-xs sm:text-sm transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 text-xs sm:text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-brand-300 text-xs sm:text-sm transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
