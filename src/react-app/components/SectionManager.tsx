/**
 * SECTION MANAGER (Admin/Dev Tool)
 * 
 * This component allows you to:
 * - Toggle sections on/off
 * - Reorder sections via drag-and-drop
 * - Preview changes in real-time
 * 
 * Usage: Add this to your page during development
 */

import { useState } from 'react';
import { sectionConfigs, type SectionConfig } from '@/react-app/config/sectionConfig';
import { Eye, EyeOff, GripVertical, Settings } from 'lucide-react';

export default function SectionManager() {
  const [sections, setSections] = useState<SectionConfig[]>([...sectionConfigs]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (id: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id 
          ? { ...section, enabled: !section.enabled }
          : section
      )
    );
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    // Swap orders
    const temp = newSections[index].order;
    newSections[index].order = newSections[targetIndex].order;
    newSections[targetIndex].order = temp;
    
    // Sort by order
    newSections.sort((a, b) => a.order - b.order);
    setSections(newSections);
  };

  const exportConfig = () => {
    const config = JSON.stringify(sections, null, 2);
    console.log('Section Configuration:', config);
    
    // Copy to clipboard
    navigator.clipboard.writeText(config);
    alert('Configuration copied to clipboard!');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-50"
        title="Open Section Manager"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 w-96 max-h-[600px] overflow-hidden z-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <h3 className="font-bold">Section Manager</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-purple-700 p-1 rounded"
        >
          ✕
        </button>
      </div>

      {/* Section List */}
      <div className="overflow-y-auto max-h-[450px] p-4 space-y-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`border rounded-lg p-3 ${
              section.enabled ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className={`font-semibold ${section.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                  {section.component}
                </span>
              </div>
              <button
                onClick={() => toggleSection(section.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {section.enabled ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Order: {section.order}</span>
              <div className="space-x-1">
                <button
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-3 bg-gray-50">
        <button
          onClick={exportConfig}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm"
        >
          Export Configuration
        </button>
      </div>
    </div>
  );
}
