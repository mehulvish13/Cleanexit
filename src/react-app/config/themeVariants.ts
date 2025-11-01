/**
 * THEME VARIANTS
 * 
 * Different section configurations for different themes or campaigns
 */

import type { SectionConfig } from './sectionConfig';

// Standard Business Theme
export const businessTheme: SectionConfig[] = [
  { id: 'header', component: 'Header', enabled: true, order: 1, props: {} },
  { id: 'hero', component: 'Hero', enabled: true, order: 2, props: {} },
  { id: 'deviceShowcase', component: 'DeviceShowcase', enabled: true, order: 3, props: {} },
  { id: 'services', component: 'Services', enabled: true, order: 4, props: {} },
  { id: 'solutions', component: 'Solutions', enabled: true, order: 5, props: {} },
  { id: 'pricing', component: 'Pricing', enabled: true, order: 6, props: {} },
  { id: 'compliance', component: 'Compliance', enabled: true, order: 7, props: {} },
  { id: 'contact', component: 'Contact', enabled: true, order: 8, props: {} },
  { id: 'footer', component: 'Footer', enabled: true, order: 9, props: {} },
  { id: 'sid', component: 'Sid', enabled: true, order: 10, props: {} }
];

// Sales-Focused Theme (Pricing First)
export const salesTheme: SectionConfig[] = [
  { id: 'header', component: 'Header', enabled: true, order: 1, props: {} },
  { id: 'hero', component: 'Hero', enabled: true, order: 2, props: {} },
  { id: 'pricing', component: 'Pricing', enabled: true, order: 3, props: {} }, // Moved up!
  { id: 'deviceShowcase', component: 'DeviceShowcase', enabled: true, order: 4, props: {} },
  { id: 'services', component: 'Services', enabled: true, order: 5, props: {} },
  { id: 'compliance', component: 'Compliance', enabled: true, order: 6, props: {} },
  { id: 'solutions', component: 'Solutions', enabled: false, order: 7, props: {} }, // Hidden
  { id: 'contact', component: 'Contact', enabled: true, order: 8, props: {} },
  { id: 'footer', component: 'Footer', enabled: true, order: 9, props: {} },
  { id: 'sid', component: 'Sid', enabled: true, order: 10, props: {} }
];

// Minimal Theme (Essential Only)
export const minimalTheme: SectionConfig[] = [
  { id: 'header', component: 'Header', enabled: true, order: 1, props: {} },
  { id: 'hero', component: 'Hero', enabled: true, order: 2, props: {} },
  { id: 'deviceShowcase', component: 'DeviceShowcase', enabled: true, order: 3, props: {} },
  { id: 'pricing', component: 'Pricing', enabled: true, order: 4, props: {} },
  { id: 'contact', component: 'Contact', enabled: true, order: 5, props: {} },
  { id: 'footer', component: 'Footer', enabled: true, order: 6, props: {} },
  { id: 'services', component: 'Services', enabled: false, order: 7, props: {} },
  { id: 'solutions', component: 'Solutions', enabled: false, order: 8, props: {} },
  { id: 'compliance', component: 'Compliance', enabled: false, order: 9, props: {} },
  { id: 'sid', component: 'Sid', enabled: true, order: 10, props: {} }
];

// Trust-Building Theme (Compliance First)
export const trustTheme: SectionConfig[] = [
  { id: 'header', component: 'Header', enabled: true, order: 1, props: {} },
  { id: 'hero', component: 'Hero', enabled: true, order: 2, props: {} },
  { id: 'compliance', component: 'Compliance', enabled: true, order: 3, props: {} }, // Moved up!
  { id: 'deviceShowcase', component: 'DeviceShowcase', enabled: true, order: 4, props: {} },
  { id: 'services', component: 'Services', enabled: true, order: 5, props: {} },
  { id: 'solutions', component: 'Solutions', enabled: true, order: 6, props: {} },
  { id: 'pricing', component: 'Pricing', enabled: true, order: 7, props: {} },
  { id: 'contact', component: 'Contact', enabled: true, order: 8, props: {} },
  { id: 'footer', component: 'Footer', enabled: true, order: 9, props: {} },
  { id: 'sid', component: 'Sid', enabled: true, order: 10, props: {} }
];

// Landing Page Campaign (No Header/Footer)
export const campaignTheme: SectionConfig[] = [
  { id: 'header', component: 'Header', enabled: false, order: 1, props: {} }, // Hidden
  { id: 'hero', component: 'Hero', enabled: true, order: 2, props: {
    primaryCta: 'Start Free Trial',
    secondaryCta: 'Watch Demo'
  }},
  { id: 'deviceShowcase', component: 'DeviceShowcase', enabled: true, order: 3, props: {} },
  { id: 'pricing', component: 'Pricing', enabled: true, order: 4, props: {} },
  { id: 'services', component: 'Services', enabled: true, order: 5, props: {} },
  { id: 'contact', component: 'Contact', enabled: true, order: 6, props: {} },
  { id: 'footer', component: 'Footer', enabled: false, order: 7, props: {} }, // Hidden
  { id: 'solutions', component: 'Solutions', enabled: false, order: 8, props: {} },
  { id: 'compliance', component: 'Compliance', enabled: false, order: 9, props: {} },
  { id: 'sid', component: 'Sid', enabled: false, order: 10, props: {} }
];

// Export theme selector
export const themes = {
  business: businessTheme,
  sales: salesTheme,
  minimal: minimalTheme,
  trust: trustTheme,
  campaign: campaignTheme
};

export type ThemeName = keyof typeof themes;

// Helper to get theme
export const getTheme = (themeName: ThemeName) => {
  return themes[themeName] || businessTheme;
};
