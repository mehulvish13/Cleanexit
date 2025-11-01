/**
 * SECTION RENDERER
 * 
 * This component dynamically renders sections based on configuration.
 * It acts as a factory that maps section names to actual React components.
 */

import { Suspense } from 'react';
import type { SectionConfig } from '@/react-app/config/sectionConfig';

// Import all section components
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

// Component map - maps component names to actual components
const componentMap: Record<string, React.ComponentType<any>> = {
  Header,
  Hero,
  DeviceShowcase,
  Services,
  Solutions,
  Pricing,
  Compliance,
  Contact,
  Footer,
  Sid
};

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

interface SectionRendererProps {
  section: SectionConfig;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  const Component = componentMap[section.component];

  if (!Component) {
    console.warn(`Component "${section.component}" not found in component map`);
    return null;
  }

  return (
    <Suspense fallback={<SectionLoader />}>
      <Component {...(section.props || {})} />
    </Suspense>
  );
}
