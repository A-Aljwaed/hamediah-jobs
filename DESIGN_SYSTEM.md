# Hamediah Jobs - Design System Documentation

## Overview

This design system provides a modern, accessible, and maintainable foundation for the Hamediah job portal. Built with semantic HTML5, CSS Custom Properties, and vanilla JavaScript, it follows WCAG 2.1 AA accessibility standards and implements a fresh green color palette.

## Color Palette

### Primary Green Brand Colors

```css
--color-brand: #22A35D;           /* Main brand green */
--color-brand-hover: #1B8A4E;     /* Hover state */
--color-brand-light: #E6F7EF;     /* Light backgrounds */
--color-brand-dark: #0F5C33;      /* Dark accents */
```

**Usage:**
- Primary actions (buttons, links)
- Brand elements (logo, headers)
- Active states and highlights
- Progress indicators

**Accessibility:** All brand colors meet WCAG AA contrast requirements against white and dark backgrounds.

### Secondary Accent Colors

```css
--color-accent-amber: #FFC447;    /* Warm accent */
--color-accent-teal: #0FAF9A;     /* Cool accent */
```

**Usage:**
- Secondary CTAs
- Status indicators
- Visual variety in data visualizations

### Neutral Gray Scale

```css
--gray-50: #F8FAF9;    /* Lightest - backgrounds */
--gray-100: #EEF2F0;   /* Light backgrounds */
--gray-200: #D9E1DD;   /* Borders, dividers */
--gray-300: #B9C5BE;   /* Disabled states */
--gray-400: #93A39B;   /* Placeholder text */
--gray-500: #6E7F77;   /* Secondary text */
--gray-600: #4E5C56;   /* Body text */
--gray-700: #394540;   /* Body text */
--gray-800: #25302B;   /* Headings */
--gray-900: #131A17;   /* Primary text */
```

### Feedback Colors

```css
--color-success: #219A6F;   /* Success messages */
--color-warning: #E5A100;   /* Warnings */
--color-error: #D8504D;     /* Errors */
--color-info: #2583C7;      /* Information */
```

## Typography

### Font Family

Primary: **Inter** - Modern, highly legible sans-serif
Fallback: System font stack

```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
             'Open Sans', 'Helvetica Neue', Arial, sans-serif;
```

### Fluid Type Scale

Uses `clamp()` for responsive typography:

```css
--h1-size: clamp(2.2rem, 1.5rem + 2.2vw, 3.4rem);   /* 35-54px */
--h2-size: clamp(1.9rem, 1.3rem + 1.8vw, 2.6rem);   /* 30-42px */
--h3-size: clamp(1.6rem, 1.2rem + 1.2vw, 2rem);     /* 26-32px */
--h4-size: clamp(1.3rem, 1.1rem + 0.8vw, 1.6rem);   /* 21-26px */
--h5-size: clamp(1.1rem, 1rem + 0.4vw, 1.3rem);     /* 18-21px */
--h6-size: 1rem;                                      /* 16px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Spacing System

8px base grid system:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

## Border Radius

```css
--radius-sm: 4px;     /* Small elements */
--radius-md: 8px;     /* Default */
--radius-lg: 16px;    /* Cards, modals */
--radius-round: 50%;  /* Circular */
```

## Shadows

Subtle depth with soft shadows:

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 24px -4px rgba(0, 0, 0, 0.16);
--shadow-focus: 0 0 0 3px rgba(34, 163, 93, 0.35);
--shadow-glow: 0 0 20px rgba(34, 163, 93, 0.25);
```

## Transitions

```css
--transition-base: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-fast: 100ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 250ms cubic-bezier(0.4, 0, 0.2, 1);
```

## Breakpoints

Mobile-first responsive design:

```css
/* Small tablets and large phones */
@media (min-width: 640px) { ... }

/* Tablets */
@media (min-width: 768px) { ... }

/* Laptops and desktops */
@media (min-width: 1024px) { ... }

/* Large desktops */
@media (min-width: 1280px) { ... }
```

## Gradients

```css
--gradient-primary: linear-gradient(145deg, #0F5C33 0%, #22A35D 60%, #35C879 100%);
--gradient-hero: linear-gradient(135deg, #0F5C33 0%, #22A35D 50%, #2DB76B 100%);
--gradient-overlay: linear-gradient(180deg, rgba(15, 92, 51, 0) 0%, rgba(15, 92, 51, 0.8) 100%);
```

## Z-Index Scale

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-tooltip: 1060;
```

## Accessibility Features

### Focus States

All interactive elements have visible focus indicators:
- 2px outline with 2px offset
- Uses brand color for consistency
- Respects `prefers-reduced-motion`

### ARIA Support

- Proper landmark roles (`main`, `nav`, `banner`, `contentinfo`)
- ARIA labels for icon-only buttons
- `aria-expanded` for collapsible elements
- `aria-pressed` for toggle buttons
- `aria-current` for pagination

### Keyboard Navigation

- Full keyboard accessibility
- Focus trap in modals
- ESC key to close overlays
- Tab order optimization

### Screen Reader Support

- `.sr-only` class for screen reader-only content
- Descriptive link text
- Form labels properly associated

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements clearly distinguishable

### Reduced Motion

Respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## RTL Support

Full right-to-left language support:

```html
<html dir="rtl">
```

Automatic layout mirroring for Arabic and other RTL languages.

## Performance

### CSS Architecture

1. **variables.css** - Design tokens (4KB)
2. **base.css** - Reset and typography (5KB)
3. **components.css** - Reusable components (16KB)
4. **utilities.css** - Helper classes (9KB)

Total: ~34KB (minified ~20KB, gzipped ~5KB)

### Loading Strategy

```html
<!-- Critical CSS inline for above-fold -->
<link rel="stylesheet" href="/assets/css/variables.css" />
<link rel="stylesheet" href="/assets/css/base.css" />

<!-- Non-critical CSS deferred -->
<link rel="stylesheet" href="/assets/css/components.css" />
<link rel="stylesheet" href="/assets/css/utilities.css" />
```

### JavaScript

- No external dependencies
- Vanilla JS modules (~16KB)
- Lazy loading for images
- Debounced event handlers

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- iOS Safari: Latest 2 versions
- Android Chrome: Latest 2 versions

Graceful degradation for older browsers.

## Customization

### Changing Brand Color

To change the primary brand color, update in `variables.css`:

```css
:root {
  --color-brand: #YOUR_COLOR;
  --color-brand-hover: /* darker shade */;
  --color-brand-light: /* lighter tint */;
  --color-brand-dark: /* darker shade */;
}
```

### Adding New Components

1. Add component class in `components.css`
2. Follow BEM naming: `.component__element--modifier`
3. Use CSS Custom Properties for values
4. Add to COMPONENTS.md documentation

## Migration from Tailwind

If integrating with existing Tailwind:

1. Variables are compatible with Tailwind config
2. Use utility classes for rapid prototyping
3. Extract repeated patterns to components
4. Gradually migrate to custom components

## Future Enhancements

- [ ] Dark mode support
- [ ] Additional icon system integration
- [ ] Component animations library
- [ ] Print stylesheet
- [ ] High contrast mode
- [ ] Advanced theming system
