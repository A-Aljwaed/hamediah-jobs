# Hamediah Jobs - Component Library

## Overview

This document describes the reusable UI components in the Hamediah design system. All components follow semantic HTML, WCAG 2.1 AA accessibility standards, and use CSS Custom Properties for theming.

---

## Layout Components

### Container

Centers content with responsive max-width.

```html
<div class="container">
  <!-- Content -->
</div>
```

**Variants:**
- `.container-sm` - 640px max-width
- `.container-md` - 768px max-width
- `.container-lg` - 1024px max-width
- `.container` - 1280px max-width (default)

---

## Navigation Components

### Header

Sticky header with navigation and branding.

```html
<header class="header" role="banner">
  <div class="container header__container">
    <a href="/" class="header__logo">Hamediah Jobs</a>
    
    <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="menu-toggle__bar"></span>
      <span class="menu-toggle__bar"></span>
      <span class="menu-toggle__bar"></span>
    </button>
    
    <nav class="header__nav" role="navigation">
      <a href="/" class="header__nav-link header__nav-link--active">Home</a>
      <a href="/jobs" class="header__nav-link">Jobs</a>
    </nav>
    
    <div class="header__actions">
      <a href="/login" class="btn btn-outline">Login</a>
    </div>
  </div>
</header>
```

**Features:**
- Sticky positioning
- Mobile menu toggle
- ARIA labels
- Active link highlighting

---

## Button Components

### Button

Primary action buttons with multiple variants.

```html
<!-- Primary -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Outline -->
<button class="btn btn-outline">Outline</button>

<!-- Ghost -->
<button class="btn btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-sm btn-primary">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-lg btn-primary">Large</button>

<!-- With Icon -->
<button class="btn btn-primary">
  <svg width="16" height="16">...</svg>
  Button Text
</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>
```

**States:**
- Default
- Hover (`:hover`)
- Focus (`:focus-visible`)
- Active (`:active`)
- Disabled (`[disabled]`)

---

## Card Components

### Card

Base card component for content grouping.

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Optional subtitle</p>
  </div>
  
  <div class="card__body">
    <p>Card content goes here...</p>
  </div>
  
  <div class="card__footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Job Card

Specialized card for job listings.

```html
<article class="job-card" 
         data-job-card
         data-job-id="123"
         data-job-title="Software Engineer"
         data-job-location="Berlin"
         data-job-type="full-time"
         data-job-category="technology">
  
  <!-- Header -->
  <div class="job-card__header">
    <div class="flex-1">
      <h3 class="job-card__title">
        <a href="/jobs/123">Software Engineer</a>
      </h3>
      <div class="job-card__company">
        <svg width="16" height="16">...</svg>
        <span>Company Name</span>
      </div>
    </div>
    <span class="badge badge-success">New</span>
  </div>
  
  <!-- Meta Information -->
  <div class="job-card__meta">
    <span class="job-card__meta-item">
      <svg width="16" height="16">...</svg>
      <span>Berlin</span>
    </span>
    <span class="job-card__meta-item">
      <svg width="16" height="16">...</svg>
      <span>2 days ago</span>
    </span>
  </div>
  
  <!-- Description -->
  <p class="job-card__description">
    Brief job description that gets truncated...
  </p>
  
  <!-- Tags -->
  <div class="job-card__tags">
    <span class="badge badge-primary">Full-time</span>
    <span class="badge badge-neutral">Remote</span>
  </div>
  
  <!-- Footer Actions -->
  <div class="job-card__footer">
    <a href="/jobs/123" class="btn btn-sm btn-primary">View Details</a>
    <button class="btn btn-sm btn-ghost" 
            data-bookmark-btn 
            data-job-id="123"
            aria-label="Save job"
            aria-pressed="false">
      ♡
    </button>
  </div>
</article>
```

**Features:**
- Hover effects
- Responsive layout
- Accessible links and buttons
- Data attributes for JavaScript filtering

### Category Tile

Navigation tile for job categories.

```html
<a href="/jobs?category=technology" class="category-tile">
  <div class="category-tile__icon" aria-hidden="true">💻</div>
  <div class="category-tile__title">Technology</div>
  <div class="category-tile__count">250 jobs</div>
</a>
```

---

## Badge Component

Status indicators and labels.

```html
<!-- Variants -->
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-neutral">Neutral</span>

<!-- With Icon -->
<span class="badge badge-success">
  <svg width="12" height="12">...</svg>
  Active
</span>
```

---

## Hero Section

Large header section with CTA.

```html
<div class="hero">
  <div class="container hero__container">
    <h1 class="hero__title">Find Your Dream Career Today</h1>
    <p class="hero__subtitle">
      Search thousands of jobs with bilingual support
    </p>
    
    <div class="hero__search">
      <form class="search-form" role="search">
        <input type="text" 
               class="search-form__input" 
               placeholder="Job title, keywords..." 
               aria-label="Search jobs" />
        <button type="submit" class="search-form__button">
          Search Jobs
        </button>
      </form>
    </div>
  </div>
</div>
```

**Features:**
- Gradient background
- Centered content
- Integrated search form
- Decorative pattern overlay

---

## Form Components

### Form Group

Standard form field with label and validation.

```html
<div class="form-group">
  <label for="email" class="form-label form-label--required">
    Email Address
  </label>
  <input type="email" 
         id="email" 
         name="email" 
         class="form-input"
         placeholder="you@example.com"
         required />
  <span class="form-help">We'll never share your email</span>
  <span class="form-error">Please enter a valid email</span>
</div>
```

### Input Types

```html
<!-- Text Input -->
<input type="text" class="form-input" />

<!-- Textarea -->
<textarea class="form-textarea"></textarea>

<!-- Select -->
<select class="form-select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- With Error State -->
<input type="text" class="form-input has-error" />
```

### Search Form

Specialized search form with button.

```html
<form class="search-form" role="search">
  <input type="text" 
         class="search-form__input" 
         placeholder="Search..." 
         aria-label="Search" />
  <button type="submit" class="search-form__button">
    Search
  </button>
</form>
```

---

## Modal Component

Accessible modal dialog with focus trap.

```html
<!-- Trigger -->
<button data-modal-trigger="login-modal" class="btn btn-primary">
  Open Modal
</button>

<!-- Modal -->
<div id="login-modal" class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <div class="modal__backdrop" data-modal-close></div>
  
  <div class="modal__content">
    <div class="modal__header">
      <h2 id="modal-title" class="modal__title">Login</h2>
      <button class="modal__close" 
              data-modal-close 
              aria-label="Close modal">
        ✕
      </button>
    </div>
    
    <div class="modal__body">
      <form data-validate>
        <!-- Form fields -->
      </form>
    </div>
    
    <div class="modal__footer">
      <button class="btn btn-secondary" data-modal-close>Cancel</button>
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </div>
</div>
```

**JavaScript API:**

```javascript
// Open modal
Modal.open('modal-id');

// Close modal
Modal.close('modal-id');

// Events
modal.addEventListener('modalOpened', (e) => {
  console.log('Modal opened:', e.detail.modalId);
});
```

**Features:**
- Focus trap
- ESC key to close
- Backdrop click to close
- ARIA attributes
- Body scroll lock

---

## Alert/Toast Component

Status messages for user feedback.

```html
<!-- Success -->
<div class="alert alert-success">
  <div class="alert__icon">✓</div>
  <div class="alert__content">
    <div class="alert__title">Success!</div>
    <div class="alert__message">Your changes have been saved.</div>
  </div>
</div>

<!-- Warning -->
<div class="alert alert-warning">
  <div class="alert__icon">⚠</div>
  <div class="alert__content">
    <div class="alert__message">Please review your information.</div>
  </div>
</div>

<!-- Error -->
<div class="alert alert-error">
  <div class="alert__icon">✕</div>
  <div class="alert__content">
    <div class="alert__message">An error occurred. Please try again.</div>
  </div>
</div>

<!-- Info -->
<div class="alert alert-info">
  <div class="alert__icon">ℹ</div>
  <div class="alert__content">
    <div class="alert__message">New features are now available.</div>
  </div>
</div>
```

---

## Pagination Component

ARIA-compliant pagination navigation.

```html
<nav class="pagination" aria-label="Pagination">
  <a href="#" class="pagination__item pagination__item--disabled" aria-label="Previous">
    ←
  </a>
  <a href="#" class="pagination__item pagination__item--active" aria-current="page">
    1
  </a>
  <a href="#" class="pagination__item">2</a>
  <a href="#" class="pagination__item">3</a>
  <span class="pagination__item pagination__item--disabled">...</span>
  <a href="#" class="pagination__item">10</a>
  <a href="#" class="pagination__item" aria-label="Next">
    →
  </a>
</nav>
```

---

## Footer Component

Site footer with link groups.

```html
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__container">
      <!-- About Section -->
      <div>
        <h3 class="footer__section-title">Hamediah Jobs</h3>
        <p>Your gateway to career opportunities.</p>
      </div>
      
      <!-- Links Column -->
      <div>
        <h3 class="footer__section-title">Quick Links</h3>
        <ul class="footer__links">
          <li><a href="/" class="footer__link">Home</a></li>
          <li><a href="/jobs" class="footer__link">Jobs</a></li>
          <li><a href="/about" class="footer__link">About</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer__bottom">
      <p>&copy; 2025 Hamediah. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## Slider Component

Simple testimonial or content slider.

```html
<div data-slider data-autoplay="5000">
  <div data-slide>
    <blockquote>
      <p>"Great experience finding a job!"</p>
      <cite>- John Doe</cite>
    </blockquote>
  </div>
  
  <div data-slide>
    <blockquote>
      <p>"Highly recommend this platform."</p>
      <cite>- Jane Smith</cite>
    </blockquote>
  </div>
  
  <div class="d-flex justify-center gap-2 mt-6">
    <button data-slider-prev class="btn btn-sm btn-ghost" aria-label="Previous slide">←</button>
    <button data-slider-next class="btn btn-sm btn-ghost" aria-label="Next slide">→</button>
  </div>
</div>
```

**JavaScript API:**

```javascript
Slider.init(); // Auto-initializes all [data-slider] elements
```

---

## Utility Classes

### Display

```html
<div class="d-block">Block</div>
<div class="d-flex">Flex</div>
<div class="d-grid">Grid</div>
<div class="d-none">Hidden</div>
```

### Flexbox

```html
<div class="d-flex justify-between align-center gap-4">
  <!-- Flex items -->
</div>
```

### Spacing

```html
<div class="mt-4 mb-6 px-4 py-8">
  <!-- m = margin, p = padding -->
  <!-- t/b/l/r/x/y = top/bottom/left/right/horizontal/vertical -->
  <!-- 1-20 = spacing scale -->
</div>
```

### Text

```html
<p class="text-center text-lg font-bold text-brand">
  Centered, large, bold, brand-colored text
</p>
```

### Responsive

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Responsive grid -->
</div>
```

---

## JavaScript Modules

### Navigation

```javascript
// Auto-initializes on DOM ready
Navigation.init();
```

### Modal

```javascript
// Open/close modals programmatically
Modal.open('modal-id');
Modal.close('modal-id');
```

### Form Validation

```html
<form data-validate>
  <!-- Fields automatically validated -->
</form>
```

### Job Filter

```html
<form data-job-filter>
  <input data-filter="search" />
  <select data-filter="location"></select>
  <button data-filter-clear>Clear</button>
</form>
```

### Bookmark

```html
<button data-bookmark-btn data-job-id="123">Save</button>
```

---

## Best Practices

### Accessibility

1. Always include ARIA labels for icon-only buttons
2. Use semantic HTML elements
3. Ensure sufficient color contrast
4. Test with keyboard navigation
5. Add `aria-current` for active navigation items

### Performance

1. Use `loading="lazy"` for below-fold images
2. Defer non-critical JavaScript
3. Minimize CSS specificity
4. Use CSS Custom Properties for theming

### Maintainability

1. Follow BEM naming convention
2. Keep components independent
3. Document custom modifications
4. Use data attributes for JavaScript hooks

---

## Framework Integration

### React Example

```jsx
function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card__header">
        <h3 className="job-card__title">
          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
        </h3>
      </div>
      {/* ... */}
    </article>
  );
}
```

### Vue Example

```vue
<template>
  <article class="job-card">
    <div class="job-card__header">
      <h3 class="job-card__title">
        <router-link :to="`/jobs/${job.id}`">
          {{ job.title }}
        </router-link>
      </h3>
    </div>
    <!-- ... -->
  </article>
</template>
```

---

## Support

For questions or issues with components, please refer to:
- `DESIGN_SYSTEM.md` for design tokens
- `/assets/css/components.css` for implementation details
- `/assets/js/core.js` for JavaScript functionality
