/**
 * DYNAMIC HOME PAGE
 * 
 * This version of the Home page uses the section configuration system.
 * Sections are rendered dynamically based on sectionConfig.ts
 * 
 * Benefits:
 * - Easy to reorder sections (just change order in config)
 * - Easy to enable/disable sections (toggle enabled flag)
 * - Easy to customize section props (modify props in config)
 * - Centralized section management
 */

import { getEnabledSections } from '@/react-app/config/sectionConfig';
import SectionRenderer from '@/react-app/components/SectionRenderer';

export default function DynamicHome() {
  const sections = getEnabledSections();

  return (
    <div className="min-h-screen">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
