# Hamediah Jobs - Implementation Guide

## Quick Start

This guide explains how to use the new green design system in your Hamediah job portal.

## 🎯 Overview

The design system consists of:
1. **CSS Files** - Modular, maintainable stylesheets
2. **JavaScript** - Vanilla JS with no dependencies
3. **HTML Templates** - Thymeleaf templates with modern markup
4. **Documentation** - Comprehensive guides

## 📁 File Organization

```
backend/src/main/resources/
├── static/assets/
│   ├── css/
│   │   ├── variables.css    # Design tokens (colors, spacing, etc.)
│   │   ├── base.css         # Reset & base typography
│   │   ├── components.css   # Reusable UI components
│   │   └── utilities.css    # Helper classes
│   └── js/
│       └── core.js          # All JavaScript functionality
└── templates/
    ├── layout/base.html     # Base template with header/footer
    ├── index.html           # Homepage
    ├── jobs/
    │   ├── list.html        # Job listing with filters
    │   └── detail.html      # Individual job page
    └── auth/login.html      # Login page
```

## 🚀 Using the Design System

### 1. Including CSS in Templates

The base layout (`layout/base.html`) already includes all necessary CSS:

```html
<link rel="stylesheet" th:href="@{/assets/css/variables.css}" />
<link rel="stylesheet" th:href="@{/assets/css/base.css}" />
<link rel="stylesheet" th:href="@{/assets/css/components.css}" />
<link rel="stylesheet" th:href="@{/assets/css/utilities.css}" />
```

### 2. Creating New Pages

Extend the base layout:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" th:replace="layout/base :: layout">
<section>
    <div class="container py-12">
        <h1>Your Page Title</h1>
        <!-- Your content -->
    </div>
</section>
</html>
```

### 3. Using Components

#### Button
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outlined</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-sm btn-primary">Small</button>
<button class="btn btn-lg btn-primary">Large</button>
```

#### Card
```html
<div class="card">
    <div class="card__header">
        <h3 class="card__title">Card Title</h3>
    </div>
    <div class="card__body">
        <p>Content goes here</p>
    </div>
    <div class="card__footer">
        <button class="btn btn-primary">Action</button>
    </div>
</div>
```

#### Job Card
```html
<article class="job-card">
    <div class="job-card__header">
        <div class="flex-1">
            <h3 class="job-card__title">
                <a href="/jobs/123">Job Title</a>
            </h3>
            <div class="job-card__company">Company Name</div>
        </div>
        <span class="badge badge-success">New</span>
    </div>
    <div class="job-card__tags">
        <span class="badge badge-primary">Full-time</span>
        <span class="badge badge-neutral">Remote</span>
    </div>
    <div class="job-card__footer">
        <a href="/jobs/123" class="btn btn-primary">View Details</a>
    </div>
</article>
```

#### Form
```html
<form data-validate>
    <div class="form-group">
        <label for="email" class="form-label form-label--required">Email</label>
        <input type="email" 
               id="email" 
               class="form-input" 
               required 
               placeholder="you@example.com" />
        <span class="form-help">We'll never share your email</span>
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

#### Modal
```html
<!-- Trigger -->
<button data-modal-trigger="my-modal" class="btn btn-primary">
    Open Modal
</button>

<!-- Modal -->
<div id="my-modal" class="modal">
    <div class="modal__backdrop" data-modal-close></div>
    <div class="modal__content">
        <div class="modal__header">
            <h2 class="modal__title">Modal Title</h2>
            <button class="modal__close" data-modal-close>✕</button>
        </div>
        <div class="modal__body">
            <!-- Content -->
        </div>
        <div class="modal__footer">
            <button class="btn btn-secondary" data-modal-close>Cancel</button>
            <button class="btn btn-primary">Confirm</button>
        </div>
    </div>
</div>
```

### 4. Using Utility Classes

```html
<!-- Spacing -->
<div class="mt-4 mb-6 px-4 py-8">...</div>

<!-- Display -->
<div class="d-flex justify-between align-center gap-4">...</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">...</div>

<!-- Text -->
<p class="text-center text-lg font-bold text-brand">...</p>

<!-- Background -->
<div class="bg-white p-6 rounded shadow-md">...</div>
```

## 🎨 Customizing Colors

### Changing Brand Color

Edit `variables.css`:

```css
:root {
  --color-brand: #YOUR_COLOR;
  --color-brand-hover: #DARKER_SHADE;
  --color-brand-light: #LIGHTER_TINT;
  --color-brand-dark: #DARKEST_SHADE;
}
```

### Adding New Colors

Add to `variables.css`:

```css
:root {
  --color-custom: #FF5733;
}
```

Use in components:

```css
.my-component {
  background-color: var(--color-custom);
}
```

## 🔧 JavaScript Functionality

All JavaScript is initialized automatically. No setup required!

### Available Modules

1. **Navigation** - Mobile menu toggle, active states
2. **Modal** - Open/close with focus trap
3. **Form Validation** - Automatic client-side validation
4. **Job Filter** - Real-time filtering with debouncing
5. **Slider** - Simple testimonial slider
6. **Bookmark** - Save jobs to localStorage
7. **Lazy Load** - Automatic image lazy loading

### Using JavaScript Features

#### Opening a Modal Programmatically
```javascript
Modal.open('modal-id');
Modal.close('modal-id');
```

#### Custom Form Validation
```html
<form data-validate>
    <input type="email" 
           required 
           pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
           data-pattern-error="Please enter a valid email" />
</form>
```

#### Job Filtering
```html
<form data-job-filter>
    <input data-filter="search" placeholder="Search..." />
    <select data-filter="location">
        <option value="all">All Locations</option>
    </select>
    <button data-filter-clear>Clear Filters</button>
</form>

<!-- Job cards need data attributes -->
<article data-job-card 
         data-job-title="Software Engineer"
         data-job-location="Berlin"
         data-job-type="full-time">
    ...
</article>
```

#### Slider
```html
<div data-slider data-autoplay="5000">
    <div data-slide>Slide 1</div>
    <div data-slide>Slide 2</div>
    
    <button data-slider-prev>Previous</button>
    <button data-slider-next>Next</button>
</div>
```

## ♿ Accessibility Guidelines

### Always Include:

1. **ARIA Labels**
```html
<button aria-label="Close modal">✕</button>
<nav aria-label="Main navigation">...</nav>
```

2. **Proper Headings**
```html
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection</h3>
```

3. **Form Labels**
```html
<label for="email">Email Address</label>
<input id="email" type="email" />
```

4. **Focus States**
```css
/* Already included in base.css */
button:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: ≥ 768px
- **Desktop**: ≥ 1024px
- **Large Desktop**: ≥ 1280px

### Responsive Utilities
```html
<!-- Hidden on mobile, visible on desktop -->
<div class="sm:hidden md:block">Desktop only</div>

<!-- Grid that changes with screen size -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    ...
</div>
```

## 🌍 RTL Support

For Arabic language support, the layout automatically adjusts:

```html
<html dir="rtl">
```

All components are designed to work in both LTR and RTL modes.

## 🐛 Debugging

### Check if CSS is Loaded
```javascript
console.log(getComputedStyle(document.documentElement)
    .getPropertyValue('--color-brand'));
// Should output: #22A35D
```

### Check if JavaScript is Loaded
```javascript
console.log(typeof Modal !== 'undefined'); // Should be true
```

### Common Issues

1. **Styles not applying**: Check that all CSS files are loaded
2. **JavaScript not working**: Ensure `core.js` is loaded with `defer` attribute
3. **Modal not opening**: Check that modal has correct `id` matching trigger

## 📚 Additional Resources

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Complete design token reference
- [COMPONENTS.md](COMPONENTS.md) - Detailed component documentation
- [README.md](README.md) - Project setup and architecture

## 🎓 Best Practices

1. **Use semantic HTML** - `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`
2. **Avoid inline styles** - Use utility classes instead
3. **Use data attributes** - For JavaScript hooks instead of classes
4. **Test keyboard navigation** - Tab through your page
5. **Check color contrast** - Use browser dev tools
6. **Test on mobile** - Ensure responsive design works

## 💻 Development Workflow

### Testing Locally

1. Start the backend server:
```bash
cd backend
./mvnw spring-boot:run
```

2. Visit: `http://localhost:8080`

### Making Changes

1. **Edit CSS**: Modify files in `/static/assets/css/`
2. **Edit HTML**: Modify templates in `/templates/`
3. **Edit JavaScript**: Modify `/static/assets/js/core.js`
4. **Refresh browser** to see changes

### Creating New Components

1. Add CSS to `components.css`:
```css
.my-component {
  /* styles */
}
```

2. Create HTML structure in template:
```html
<div class="my-component">
  <!-- markup -->
</div>
```

3. Document in `COMPONENTS.md`

## 🚀 Production Deployment

Before deploying:

1. **Minify CSS** (optional):
```bash
# Use cssnano or similar
npx cssnano assets/css/*.css
```

2. **Test all pages**:
- Homepage
- Job listing
- Job detail
- Login
- Test on mobile

3. **Check accessibility**:
- Run Lighthouse audit
- Test with screen reader
- Verify keyboard navigation

4. **Performance check**:
- Check page load times
- Verify lazy loading works
- Test on slow connection

## 📞 Support

If you encounter issues:

1. Check the documentation in this repository
2. Review console errors in browser dev tools
3. Verify all files are loaded correctly
4. Check browser compatibility

## 🎉 You're Ready!

You now have everything you need to build beautiful, accessible pages with the Hamediah design system. Happy coding!
