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
      <Sid />
    </div>
  );
}
