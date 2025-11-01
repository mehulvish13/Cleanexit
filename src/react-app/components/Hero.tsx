
// Hero section icons and animation
import { Shield, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  // Main hero section for landing page
  return (
    <section className="relative bg-gradient-to-br from-brand-950 via-brand-800 to-brand-700 text-white overflow-hidden">
      {/* Overlay gradients for visual depth */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-10"></div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Security badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 mb-6"
          >
            <Shield className="w-6 h-6 text-brand-300" />
            <span className="text-brand-200 font-medium">Enterprise Data Security</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Secure Data
            <span className="block text-brand-200">Erasure Solutions</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-brand-100 leading-relaxed mb-8"
          >
            Protect your organization with certified data destruction services.<br />
            Ensure complete privacy, compliance, and peace of mind with our enterprise-grade data erasure solutions.<br />
            <strong>Sign in to start a compliant wipe.</strong>
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="/login?returnTo=%2Fcertificate"
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Sign In Here</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#pricing"
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all backdrop-blur-sm text-center"
            >
              View Pricing
            </a>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-brand-100">NIST 800-88 Compliant</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-brand-100">GDPR Ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-brand-100">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient for fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-surface-950 to-transparent"></div>
    </section>
  );
}
