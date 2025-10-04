/**
 * Hamediah Jobs - Core JavaScript
 * Modern vanilla JS with ES6 modules
 * No dependencies - lightweight and performant
 */

// Utility Functions
const Utils = {
  /**
   * Debounce function to limit function calls
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function for scroll/resize handlers
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Focus trap for modals
   */
  focusTrap(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });

    // Focus first element
    firstFocusable?.focus();
  },

  /**
   * Get element by selector
   */
  $(selector, parent = document) {
    return parent.querySelector(selector);
  },

  /**
   * Get all elements by selector
   */
  $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }
};

// Navigation Module
const Navigation = {
  init() {
    const toggle = Utils.$('.menu-toggle');
    const nav = Utils.$('.header__nav');
    
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
      }
    });

    // Active link highlighting
    const currentPath = window.location.pathname;
    Utils.$$('.header__nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('header__nav-link--active');
      }
    });
  }
};

// Modal Module
const Modal = {
  openModals: new Set(),

  init() {
    // Initialize modal triggers
    Utils.$$('[data-modal-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal-trigger');
        this.open(modalId);
      });
    });

    // Initialize close buttons
    Utils.$$('[data-modal-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = closeBtn.closest('.modal');
        if (modal) this.close(modal.id);
      });
    });

    // Close on backdrop click
    Utils.$$('.modal__backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        const modal = backdrop.closest('.modal');
        if (modal) this.close(modal.id);
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.openModals.size > 0) {
        const lastModal = Array.from(this.openModals).pop();
        this.close(lastModal);
      }
    });
  },

  open(modalId) {
    const modal = Utils.$(`#${modalId}`);
    if (!modal) return;

    modal.classList.add('active');
    this.openModals.add(modalId);
    document.body.style.overflow = 'hidden';

    // Focus trap
    Utils.focusTrap(modal);

    // Trigger custom event
    modal.dispatchEvent(new CustomEvent('modalOpened', { detail: { modalId } }));
  },

  close(modalId) {
    const modal = Utils.$(`#${modalId}`);
    if (!modal) return;

    modal.classList.remove('active');
    this.openModals.delete(modalId);
    
    if (this.openModals.size === 0) {
      document.body.style.overflow = '';
    }

    // Trigger custom event
    modal.dispatchEvent(new CustomEvent('modalClosed', { detail: { modalId } }));
  }
};

// Form Validation Module
const FormValidation = {
  init() {
    Utils.$$('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation on blur
      Utils.$$('input, textarea, select', form).forEach(field => {
        field.addEventListener('blur', () => {
          this.validateField(field);
        });
      });
    });
  },

  validateForm(form) {
    let isValid = true;
    Utils.$$('input, textarea, select', form).forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  },

  validateField(field) {
    const value = field.value.trim();
    const required = field.hasAttribute('required');
    const type = field.getAttribute('type');
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearError(field);

    // Required validation
    if (required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    // URL validation
    if (type === 'url' && value && !this.isValidURL(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid URL';
    }

    // Min length validation
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
      isValid = false;
      errorMessage = `Minimum length is ${minLength} characters`;
    }

    // Pattern validation
    const pattern = field.getAttribute('pattern');
    if (pattern && value && !new RegExp(pattern).test(value)) {
      isValid = false;
      errorMessage = field.getAttribute('data-pattern-error') || 'Invalid format';
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    }

    return isValid;
  },

  showError(field, message) {
    field.classList.add('has-error');
    
    let errorElement = field.parentElement.querySelector('.form-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
  },

  clearError(field) {
    field.classList.remove('has-error');
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
};

// Simple Testimonial Slider
const Slider = {
  sliders: [],

  init() {
    Utils.$$('[data-slider]').forEach(sliderElement => {
      const slider = {
        element: sliderElement,
        slides: Utils.$$('[data-slide]', sliderElement),
        currentIndex: 0,
        autoplayInterval: null
      };

      if (slider.slides.length === 0) return;

      // Hide all slides except first
      slider.slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
      });

      // Setup navigation
      const prevBtn = Utils.$('[data-slider-prev]', sliderElement);
      const nextBtn = Utils.$('[data-slider-next]', sliderElement);

      if (prevBtn) {
        prevBtn.addEventListener('click', () => this.prev(slider));
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.next(slider));
      }

      // Autoplay
      const autoplay = sliderElement.getAttribute('data-autoplay');
      if (autoplay) {
        const interval = parseInt(autoplay) || 5000;
        this.startAutoplay(slider, interval);
      }

      // Pause autoplay on hover
      sliderElement.addEventListener('mouseenter', () => {
        this.stopAutoplay(slider);
      });

      sliderElement.addEventListener('mouseleave', () => {
        const autoplay = sliderElement.getAttribute('data-autoplay');
        if (autoplay) {
          const interval = parseInt(autoplay) || 5000;
          this.startAutoplay(slider, interval);
        }
      });

      this.sliders.push(slider);
    });
  },

  showSlide(slider, index) {
    slider.slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    slider.currentIndex = index;
  },

  next(slider) {
    const nextIndex = (slider.currentIndex + 1) % slider.slides.length;
    this.showSlide(slider, nextIndex);
  },

  prev(slider) {
    const prevIndex = (slider.currentIndex - 1 + slider.slides.length) % slider.slides.length;
    this.showSlide(slider, prevIndex);
  },

  startAutoplay(slider, interval) {
    this.stopAutoplay(slider);
    slider.autoplayInterval = setInterval(() => {
      this.next(slider);
    }, interval);
  },

  stopAutoplay(slider) {
    if (slider.autoplayInterval) {
      clearInterval(slider.autoplayInterval);
      slider.autoplayInterval = null;
    }
  }
};

// Job Filter (for browse-jobs page)
const JobFilter = {
  init() {
    const filterForm = Utils.$('[data-job-filter]');
    if (!filterForm) return;

    const filters = {
      search: Utils.$('[data-filter="search"]', filterForm),
      location: Utils.$('[data-filter="location"]', filterForm),
      type: Utils.$('[data-filter="type"]', filterForm),
      category: Utils.$('[data-filter="category"]', filterForm)
    };

    // Apply filters on input change (debounced)
    Object.values(filters).forEach(filter => {
      if (!filter) return;
      
      const handler = Utils.debounce(() => {
        this.applyFilters(filters);
      }, 500);

      filter.addEventListener('input', handler);
      filter.addEventListener('change', handler);
    });

    // Clear filters button
    const clearBtn = Utils.$('[data-filter-clear]', filterForm);
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.clearFilters(filters);
      });
    }
  },

  applyFilters(filters) {
    const jobs = Utils.$$('[data-job-card]');
    
    jobs.forEach(job => {
      const jobData = {
        title: job.getAttribute('data-job-title')?.toLowerCase() || '',
        location: job.getAttribute('data-job-location')?.toLowerCase() || '',
        type: job.getAttribute('data-job-type')?.toLowerCase() || '',
        category: job.getAttribute('data-job-category')?.toLowerCase() || '',
        description: job.getAttribute('data-job-description')?.toLowerCase() || ''
      };

      let visible = true;

      // Search filter
      const searchValue = filters.search?.value.toLowerCase();
      if (searchValue) {
        visible = visible && (
          jobData.title.includes(searchValue) ||
          jobData.description.includes(searchValue)
        );
      }

      // Location filter
      const locationValue = filters.location?.value.toLowerCase();
      if (locationValue && locationValue !== 'all') {
        visible = visible && jobData.location.includes(locationValue);
      }

      // Type filter
      const typeValue = filters.type?.value.toLowerCase();
      if (typeValue && typeValue !== 'all') {
        visible = visible && jobData.type === typeValue;
      }

      // Category filter
      const categoryValue = filters.category?.value.toLowerCase();
      if (categoryValue && categoryValue !== 'all') {
        visible = visible && jobData.category === categoryValue;
      }

      // Show/hide job
      job.style.display = visible ? '' : 'none';
    });

    // Update results count
    const visibleCount = jobs.filter(job => job.style.display !== 'none').length;
    this.updateResultsCount(visibleCount);
  },

  clearFilters(filters) {
    Object.values(filters).forEach(filter => {
      if (filter) {
        filter.value = '';
        if (filter.tagName === 'SELECT') {
          filter.selectedIndex = 0;
        }
      }
    });
    this.applyFilters(filters);
  },

  updateResultsCount(count) {
    const counter = Utils.$('[data-results-count]');
    if (counter) {
      counter.textContent = `${count} job${count !== 1 ? 's' : ''} found`;
    }
  }
};

// Bookmark/Save Job (uses localStorage)
const JobBookmark = {
  storageKey: 'hamediah_saved_jobs',

  init() {
    // Load saved jobs
    const savedJobs = this.getSavedJobs();

    // Update UI for saved jobs
    Utils.$$('[data-bookmark-btn]').forEach(btn => {
      const jobId = btn.getAttribute('data-job-id');
      if (savedJobs.includes(jobId)) {
        btn.classList.add('bookmarked');
        btn.setAttribute('aria-pressed', 'true');
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleBookmark(jobId, btn);
      });
    });
  },

  toggleBookmark(jobId, btn) {
    const savedJobs = this.getSavedJobs();
    const index = savedJobs.indexOf(jobId);

    if (index > -1) {
      // Remove bookmark
      savedJobs.splice(index, 1);
      btn.classList.remove('bookmarked');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      // Add bookmark
      savedJobs.push(jobId);
      btn.classList.add('bookmarked');
      btn.setAttribute('aria-pressed', 'true');
    }

    this.setSavedJobs(savedJobs);
  },

  getSavedJobs() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  },

  setSavedJobs(jobs) {
    localStorage.setItem(this.storageKey, JSON.stringify(jobs));
  }
};

// Lazy Loading Images
const LazyLoad = {
  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      Utils.$$('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      Utils.$$('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
};

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  Modal.init();
  FormValidation.init();
  Slider.init();
  JobFilter.init();
  JobBookmark.init();
  LazyLoad.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils, Navigation, Modal, FormValidation, Slider, JobFilter, JobBookmark, LazyLoad };
}
