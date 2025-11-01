import { Shield, Check, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-950 via-brand-800 to-brand-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-6 h-6 text-brand-300" />
            <span className="text-brand-200 font-medium">Enterprise Data Security</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Secure Data
            <span className="block text-brand-200">Erasure Solutions</span>
          </h1>
          
          <p className="text-xl text-brand-100 leading-relaxed mb-8">
            Protect your organization with certified data destruction services. 
            Ensure complete privacy, compliance, and peace of mind with our 
            enterprise-grade data erasure solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="/wipe" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
              <span>Wipe Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#pricing" className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all backdrop-blur-sm text-center">
              View Pricing
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-surface-950 to-transparent"></div>
    </section>
  );
}
