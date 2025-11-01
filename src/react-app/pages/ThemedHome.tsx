/**
 * THEMED HOME PAGE
 * 
 * Example of using different theme variants
 */

import { useState } from 'react';
import SectionRenderer from '@/react-app/components/SectionRenderer';
import { getTheme, type ThemeName } from '@/react-app/config/themeVariants';

export default function ThemedHome() {
  // You can change this dynamically based on URL params, user preferences, etc.
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('business');
  
  const sections = getTheme(currentTheme)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen">
      {/* Theme Switcher (for demo - remove in production) */}
      <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg border p-3 z-40">
        <p className="text-xs font-semibold mb-2">Theme:</p>
        <select 
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value as ThemeName)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="business">Business</option>
          <option value="sales">Sales</option>
          <option value="minimal">Minimal</option>
          <option value="trust">Trust</option>
          <option value="campaign">Campaign</option>
        </select>
      </div>

      {/* Render Sections */}
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
