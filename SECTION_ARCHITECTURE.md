# Component-based Section Architecture

## Overview

This architecture provides a flexible, maintainable way to manage sections on your landing page. You can easily:

- ✅ **Reorder sections** - Change the order without touching component code
- ✅ **Enable/Disable sections** - Show or hide sections with a flag
- ✅ **Customize content** - Centralized content management
- ✅ **Swap components** - Replace sections easily
- ✅ **Visual management** - Use SectionManager for live editing

---

## 📁 File Structure

```
src/react-app/
├── config/
│   └── sectionConfig.ts          # Section order, visibility, and props
├── content/
│   ├── heroContent.ts            # Hero section content
│   ├── servicesContent.ts        # Services section content
│   └── pricingContent.ts         # Pricing section content
├── components/
│   ├── SectionRenderer.tsx       # Renders sections dynamically
│   └── SectionManager.tsx        # Dev tool for managing sections
└── pages/
    ├── Home.tsx                  # Original static home page
    └── DynamicHome.tsx           # New dynamic home page
```

---

## 🚀 Quick Start

### 1. Use Dynamic Home Page

Update your `App.tsx` to use the new dynamic home:

```tsx
import DynamicHome from "@/react-app/pages/DynamicHome";

// In your routes:
<Route path="/" element={<DynamicHome />} />
```

### 2. Reorder Sections

Edit `src/react-app/config/sectionConfig.ts`:

```ts
export const sectionConfigs: SectionConfig[] = [
  {
    id: 'header',
    component: 'Header',
    enabled: true,
    order: 1,  // ← Change this number to reorder
  },
  // ... more sections
];
```

### 3. Disable a Section

```ts
{
  id: 'compliance',
  component: 'Compliance',
  enabled: false,  // ← Set to false to hide
  order: 7,
}
```

### 4. Customize Section Props

```ts
{
  id: 'hero',
  component: 'Hero',
  enabled: true,
  order: 2,
  props: {  // ← Pass custom props
    title: 'Custom Title',
    primaryCta: 'Click Here'
  }
}
```

---

## 🛠️ Section Manager Tool

Add the visual section manager to your page during development:

```tsx
import SectionManager from '@/react-app/components/SectionManager';

export default function DynamicHome() {
  return (
    <div>
      {/* Your sections */}
      <SectionManager />  {/* Add this */}
    </div>
  );
}
```

Features:
- 👁️ Toggle sections visibility
- ↕️ Reorder sections with buttons
- 📋 Export configuration to clipboard
- 🎨 Visual preview

---

## 📝 Content Management

### Hero Content

Edit `src/react-app/content/heroContent.ts`:

```ts
export const heroContent = {
  title: {
    main: 'Secure Data',
    highlight: 'Erasure Solutions',
  },
  description: 'Your custom description...',
  buttons: {
    primary: {
      text: 'Custom CTA',
      link: '/custom-link'
    }
  }
};
```

### Services Content

Edit `src/react-app/content/servicesContent.ts`:

```ts
export const servicesContent = {
  services: [
    {
      icon: 'HardDrive',
      title: 'Custom Service',
      description: 'Service description',
      features: ['Feature 1', 'Feature 2']
    }
  ]
};
```

### Pricing Content

Edit `src/react-app/content/pricingContent.ts`:

```ts
export const pricingContent = {
  plans: [
    {
      name: 'Starter',
      price: '0',
      features: ['Feature 1', 'Feature 2']
    }
  ]
};
```

---

## 🔧 Adding a New Section

### Step 1: Create the Component

```tsx
// src/react-app/components/Testimonials.tsx
export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <h2>Customer Testimonials</h2>
      {/* Your content */}
    </section>
  );
}
```

### Step 2: Register in SectionRenderer

Edit `src/react-app/components/SectionRenderer.tsx`:

```tsx
import Testimonials from '@/react-app/components/Testimonials';

const componentMap = {
  // ... existing components
  Testimonials  // ← Add here
};
```

### Step 3: Add to Configuration

Edit `src/react-app/config/sectionConfig.ts`:

```ts
export const sectionConfigs: SectionConfig[] = [
  // ... existing sections
  {
    id: 'testimonials',
    component: 'Testimonials',
    enabled: true,
    order: 5,  // Insert where you want
    props: {}
  }
];
```

---

## 🎯 Use Cases

### Scenario 1: A/B Testing

Create multiple configurations and switch between them:

```ts
// configA.ts
export const configA = [
  { id: 'hero', order: 1 },
  { id: 'services', order: 2 },
  { id: 'pricing', order: 3 }
];

// configB.ts
export const configB = [
  { id: 'hero', order: 1 },
  { id: 'pricing', order: 2 },  // Swapped!
  { id: 'services', order: 3 }
];
```

### Scenario 2: Seasonal Layouts

```ts
const isHolidaySeason = new Date().getMonth() === 11;

export const sectionConfigs = [
  {
    id: 'holiday-banner',
    enabled: isHolidaySeason,  // Only show in December
    order: 2
  }
];
```

### Scenario 3: Role-based Sections

```ts
export const getSectionsForUser = (userRole: string) => {
  return sectionConfigs.filter(section => {
    if (section.id === 'admin-panel') {
      return userRole === 'admin';
    }
    return section.enabled;
  });
};
```

---

## 📊 Benefits

1. **Centralized Control**: Manage all sections from one config file
2. **No Code Changes**: Reorder without touching component code
3. **Type Safety**: Full TypeScript support
4. **Easy Testing**: Test different layouts quickly
5. **Content Separation**: Keep content separate from logic
6. **Visual Tools**: Section Manager for non-technical users

---

## 🔄 Migration Guide

From static Home.tsx to dynamic:

**Before:**
```tsx
export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Services />
      {/* ... */}
    </div>
  );
}
```

**After:**
```tsx
export default function DynamicHome() {
  const sections = getEnabledSections();
  
  return (
    <div>
      {sections.map(section => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

**Section not showing?**
- Check `enabled: true` in config
- Verify component is registered in componentMap
- Check console for warnings

**Order not working?**
- Make sure order numbers are unique
- Sections auto-sort by order value

**Props not passing?**
- Ensure props object exists in config
- Check component accepts the props

---

## 📚 Advanced

### Lazy Loading Sections

```tsx
const componentMap = {
  Pricing: lazy(() => import('@/react-app/components/Pricing'))
};
```

### Conditional Rendering

```tsx
const sections = getEnabledSections().filter(section => {
  if (section.id === 'pricing' && !userLoggedIn) {
    return false;
  }
  return true;
});
```

### Analytics

```tsx
<SectionRenderer 
  section={section}
  onRender={() => {
    analytics.track('Section Viewed', { name: section.id });
  }}
/>
```

---

## 🎓 Best Practices

1. ✅ Keep configuration in version control
2. ✅ Document custom props for each section
3. ✅ Use TypeScript for type safety
4. ✅ Test section order changes thoroughly
5. ✅ Keep content files organized
6. ✅ Use meaningful section IDs

---

Need help? Check the examples in each file!
