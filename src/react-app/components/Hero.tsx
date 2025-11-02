
// Hero section icons and animation
import { Shield, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  // Main hero section for landing page
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-brand-800 text-white">
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
            <Shield className="h-6 w-6 text-brand-300" />
            <span className="font-medium text-brand-200">Enterprise Data Security</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            Permanent data erasure,
            <span className="block text-brand-200">done right.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-lg leading-relaxed text-brand-100 sm:text-xl"
          >
            We help companies of all sizes permanently erase sensitive data — safely, securely, and with full compliance. Your data deserves peace of mind. We make sure no byte is ever recoverable.
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
              className="flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 font-semibold text-white shadow-soft transition-colors hover:bg-brand-700"
            >
              <span>Start a secure wipe</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-white/30 px-8 py-4 text-center font-semibold text-white backdrop-blur-sm transition-colors hover:border-white"
            >
              Talk to an engineer
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
              <Check className="h-5 w-5 text-accent-400" />
              <span className="text-brand-100">NIST 800-88 Compliant</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-accent-400" />
              <span className="text-brand-100">GDPR Ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-accent-400" />
              <span className="text-brand-100">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient for fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
