/**
 * SECTION CONFIGURATION
 * 
 * This file defines the order, visibility, and props for all sections on the landing page.
 * You can easily reorder, enable/disable, or customize sections here.
 */

export interface SectionConfig {
  id: string;
  component: string;
  enabled: boolean;
  order: number;
  props?: Record<string, any>;
}

export const sectionConfigs: SectionConfig[] = [
  {
    id: 'header',
    component: 'Header',
    enabled: true,
    order: 1,
    props: {}
  },
  {
    id: 'hero',
    component: 'Hero',
    enabled: true,
    order: 2,
    props: {
      title: 'Secure Data',
      subtitle: 'Erasure Solutions',
      description: 'Protect your organization with certified data destruction services. Ensure complete privacy, compliance, and peace of mind with our enterprise-grade data erasure solutions.',
      primaryCta: 'Wipe Now',
      secondaryCta: 'View Pricing',
      primaryCtaLink: '/wipe',
      secondaryCtaLink: '#pricing'
    }
  },
  {
    id: 'deviceShowcase',
    component: 'DeviceShowcase',
    enabled: true,
    order: 3,
    props: {}
  },
  {
    id: 'services',
    component: 'Services',
    enabled: true,
    order: 4,
    props: {}
  },
  {
    id: 'solutions',
    component: 'Solutions',
    enabled: true,
    order: 5,
    props: {}
  },
  {
    id: 'pricing',
    component: 'Pricing',
    enabled: true,
    order: 6,
    props: {}
  },
  {
    id: 'compliance',
    component: 'Compliance',
    enabled: true,
    order: 7,
    props: {}
  },
  {
    id: 'contact',
    component: 'Contact',
    enabled: true,
    order: 8,
    props: {}
  },
  {
    id: 'footer',
    component: 'Footer',
    enabled: true,
    order: 9,
    props: {}
  },
  {
    id: 'sid',
    component: 'Sid',
    enabled: true,
    order: 10,
    props: {}
  }
];

// Helper function to get enabled sections in order
export const getEnabledSections = () => {
  return sectionConfigs
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);
};

// Helper function to get section by id
export const getSectionById = (id: string) => {
  return sectionConfigs.find(section => section.id === id);
};

// Helper function to toggle section
export const toggleSection = (id: string) => {
  const section = sectionConfigs.find(s => s.id === id);
  if (section) {
    section.enabled = !section.enabled;
  }
};
