import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold text-gray-900 mb-3 sm:mb-4">
            Get started today
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Need help choosing the right plan? Our security engineers are just a click away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start sm:items-center">
                  <div className="bg-brand-50 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Phone</p>
                    <p className="text-gray-600 text-sm sm:text-base">1-800-CLEANEXIT</p>
                  </div>
                </div>
                
                <div className="flex items-start sm:items-center">
                  <div className="bg-brand-50 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Email</p>
                    <p className="text-gray-600 text-sm sm:text-base">info@cleanexit.com</p>
                  </div>
                </div>
                
                <div className="flex items-start sm:items-center">
                  <div className="bg-brand-50 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Address</p>
                    <p className="text-gray-600 text-sm sm:text-base">123 Security Drive<br />Data Center Plaza, Suite 400<br />Tech City, TC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start sm:items-center">
                  <div className="bg-brand-50 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Business Hours</p>
                    <p className="text-gray-600 text-sm sm:text-base">Monday - Friday: 8:00 AM - 6:00 PM<br />Emergency: 24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Request a Quote</h3>
            <form className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-brand-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-brand-500 sm:px-4 sm:py-3 sm:text-base"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Company</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-brand-500 sm:px-4 sm:py-3 sm:text-base"
                  placeholder="Your Company Name"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-brand-500 sm:px-4 sm:py-3 sm:text-base"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Service Needed</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-brand-500 sm:px-4 sm:py-3 sm:text-base">
                  <option>Select a service</option>
                  <option>Hard Drive Erasure</option>
                  <option>Server Decommissioning</option>
                  <option>Mobile Device Wiping</option>
                  <option>Database Sanitization</option>
                  <option>Custom Solution</option>
                </select>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-brand-500 sm:px-4 sm:py-3 sm:text-base"
                  placeholder="Tell us about your data security needs..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-700 sm:px-6 sm:py-4 sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
