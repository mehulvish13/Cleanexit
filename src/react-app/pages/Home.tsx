/**
 * HOME PAGE (Marketing Landing Page)
 * 
 * This is the main public-facing page visitors see at cleanexit.com
 * 
 * SECTIONS (in order):
 * 1. Header - Navigation bar with logo and menu
 * 2. Hero - Big headline and call-to-action buttons
 * 3. DeviceShowcase - Visual display of devices we can securely erase
 * 4. Services - Grid of our main services (wiping, compliance, etc.)
 * 5. Solutions - Industry-specific use cases (Healthcare, Finance, etc.)
 * 6. Pricing - Three-tier subscription plans (Starter/Pro/Advanced)
 * 7. Compliance - Certification badges (GDPR, HIPAA, SOX, etc.)
 * 8. Contact - Contact form and business information
 * 9. Footer - Links, legal pages, and company info
 * 10. Sid - AI chatbot (floating button, available on all pages)
 * 
 * This page is fully responsive and uses Tailwind CSS for styling.
 */

import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import DeviceShowcase from '@/react-app/components/DeviceShowcase';
import Services from '@/react-app/components/Services';
import Solutions from '@/react-app/components/Solutions';
import Pricing from '@/react-app/components/Pricing';
import Compliance from '@/react-app/components/Compliance';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';
import Sid from '@/react-app/components/Sid';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <DeviceShowcase />
      <Services />
      <Solutions />
      <Pricing />
      <Compliance />
      <Contact />
      <Footer />
      <Sid />  {/* AI chatbot appears as floating button */}
    </div>
  );
}
