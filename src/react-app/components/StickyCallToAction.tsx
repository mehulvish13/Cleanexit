import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export default function StickyCallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on certain pages
  const hiddenPaths = ['/login', '/certificate', '/dashboard'];
  const shouldHide = hiddenPaths.includes(location.pathname);

  useEffect(() => {
    if (shouldHide) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show after scrolling 400px down
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldHide]);

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
          <button
            onClick={() => navigate('/login?returnTo=%2Fcertificate')}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all transform hover:scale-105 shadow-2xl flex items-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Get Started Free</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
