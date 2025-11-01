# Section Architecture - Quick Reference

## 🚀 Common Tasks

### Change Section Order
```ts
// src/react-app/config/sectionConfig.ts
{
  id: 'pricing',
  order: 3,  // Move pricing to position 3
}
```

### Hide a Section
```ts
{
  id: 'solutions',
  enabled: false,  // Hide solutions section
}
```

### Use a Different Theme
```tsx
// src/react-app/App.tsx
import ThemedHome from "@/react-app/pages/ThemedHome";

<Route path="/" element={<ThemedHome />} />
```

### Add Section Manager (Dev Tool)
```tsx
import SectionManager from '@/react-app/components/SectionManager';

// Add to your page:
<SectionManager />
```

### Switch to Dynamic Home
```tsx
// src/react-app/App.tsx
const useDynamicHome = true;  // Change to true
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `config/sectionConfig.ts` | Main section configuration |
| `config/themeVariants.ts` | Predefined theme layouts |
| `content/heroContent.ts` | Hero section content |
| `content/servicesContent.ts` | Services content |
| `content/pricingContent.ts` | Pricing content |
| `components/SectionRenderer.tsx` | Renders sections |
| `components/SectionManager.tsx` | Visual editor tool |
| `pages/DynamicHome.tsx` | Basic dynamic page |
| `pages/ThemedHome.tsx` | Theme-based page |

---

## 🎨 Available Themes

| Theme | Use Case |
|-------|----------|
| `business` | Standard corporate site |
| `sales` | Conversion-focused (pricing first) |
| `minimal` | Clean, essential-only |
| `trust` | Compliance-focused |
| `campaign` | Landing page (no header/footer) |

---

## ⚡ Quick Examples

### Example 1: Black Friday Landing Page
```ts
export const blackFridayTheme: SectionConfig[] = [
  { id: 'hero', order: 1, props: { 
    title: '50% OFF', 
    primaryCta: 'Claim Deal' 
  }},
  { id: 'pricing', order: 2 },
  { id: 'contact', order: 3 }
];
```

### Example 2: Enterprise Page
```ts
export const enterpriseTheme: SectionConfig[] = [
  { id: 'header', order: 1 },
  { id: 'hero', order: 2 },
  { id: 'compliance', order: 3 },  // Lead with security
  { id: 'solutions', order: 4 },
  { id: 'pricing', order: 5, props: { 
    showEnterpriseOnly: true 
  }},
  { id: 'contact', order: 6 }
];
```

### Example 3: Mobile-First Simple Page
```ts
export const mobileTheme: SectionConfig[] = [
  { id: 'hero', order: 1 },
  { id: 'deviceShowcase', order: 2 },
  { id: 'pricing', order: 3 },
  // Everything else disabled
];
```

---

## 🔧 Customization Patterns

### URL-based Theme Selection
```tsx
const searchParams = new URLSearchParams(window.location.search);
const theme = searchParams.get('theme') || 'business';
const sections = getTheme(theme as ThemeName);
```

### User Role-based Sections
```tsx
const sections = getEnabledSections().filter(section => {
  if (section.id === 'enterprise-features' && !isEnterpriseUser) {
    return false;
  }
  return true;
});
```

### Time-based Sections
```tsx
const isBusinessHours = new Date().getHours() >= 9 && new Date().getHours() < 17;

{
  id: 'live-chat',
  enabled: isBusinessHours,
  order: 10
}
```

---

## 📊 Analytics Integration

```tsx
<SectionRenderer 
  section={section}
  onMount={() => {
    analytics.track('Section Viewed', {
      sectionId: section.id,
      order: section.order
    });
  }}
/>
```

---

## 🐛 Common Issues

**Q: Sections not showing?**
- Check `enabled: true`
- Verify component in componentMap
- Look for console errors

**Q: Order not working?**
- Use unique order numbers
- Sections auto-sort

**Q: Props not working?**
- Add props to section config
- Update component to accept props

---

## 💡 Pro Tips

1. Use Section Manager during development
2. Keep one theme as your source of truth
3. Test mobile layouts for each theme
4. Document custom props
5. Version control your configs
6. Use TypeScript for safety

---

For full documentation, see `SECTION_ARCHITECTURE.md`
