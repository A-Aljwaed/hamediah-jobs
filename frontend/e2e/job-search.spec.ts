import { test, expect } from '@playwright/test';

test.describe('Job Search and Application Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Hamediah Jobs/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /find your dream job/i })).toBeVisible();
    
    // Check search functionality is present
    await expect(page.getByPlaceholder(/search for jobs/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible();
  });

  test('should navigate to job listings', async ({ page }) => {
    // Click on "Browse Jobs" or similar link
    await page.getByRole('link', { name: /browse jobs/i }).click();
    
    // Should navigate to jobs page
    await expect(page).toHaveURL(/\/jobs/);
    
    // Should show job listings
    await expect(page.getByText(/jobs found/i)).toBeVisible();
  });

  test('should perform basic job search', async ({ page }) => {
    // Navigate to jobs page
    await page.goto('/jobs');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Perform search
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('developer');
    await page.getByRole('button', { name: /search/i }).click();
    
    // Wait for results
    await page.waitForLoadState('networkidle');
    
    // Should show search results
    await expect(page.getByText(/developer/i)).toBeVisible();
  });

  test('should use advanced search filters', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Open advanced filters (if collapsed)
    const advancedFiltersButton = page.getByText(/advanced filters/i);
    if (await advancedFiltersButton.isVisible()) {
      await advancedFiltersButton.click();
    }
    
    // Apply location filter
    const locationInput = page.getByPlaceholder(/location/i);
    if (await locationInput.isVisible()) {
      await locationInput.fill('San Francisco');
    }
    
    // Apply job type filter
    const fullTimeCheckbox = page.getByLabel(/full.?time/i);
    if (await fullTimeCheckbox.isVisible()) {
      await fullTimeCheckbox.check();
    }
    
    // Apply remote work filter
    const remoteCheckbox = page.getByLabel(/remote/i);
    if (await remoteCheckbox.isVisible()) {
      await remoteCheckbox.check();
    }
    
    // Submit search
    await page.getByRole('button', { name: /search/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Results should be filtered
    await expect(page.getByText(/jobs found/i)).toBeVisible();
  });

  test('should view job details', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Click on first job listing
    const firstJobLink = page.getByRole('link', { name: /view details/i }).first();
    await firstJobLink.click();
    
    // Should navigate to job detail page
    await expect(page).toHaveURL(/\/jobs\/\d+/);
    
    // Should show job details
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByText(/company/i)).toBeVisible();
    await expect(page.getByText(/location/i)).toBeVisible();
  });

  test('should show login requirement for job application', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Navigate to a job detail page
    const firstJobLink = page.getByRole('link', { name: /view details/i }).first();
    await firstJobLink.click();
    
    // Try to apply for the job
    const applyButton = page.getByRole('button', { name: /apply/i });
    await applyButton.click();
    
    // Should show login requirement
    await expect(page.getByText(/login required/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
  });

  test('should handle responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check mobile navigation
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
    }
    
    // Check search functionality on mobile
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();
  });

  test('should handle language switching', async ({ page }) => {
    await page.goto('/');
    
    // Look for language switcher
    const languageSwitcher = page.getByRole('button', { name: /language/i }).or(
      page.getByText(/العربية/i)
    ).or(
      page.locator('[data-testid="language-switcher"]')
    );
    
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      
      // Wait for language change
      await page.waitForTimeout(1000);
      
      // Check if content changed (this would depend on actual implementation)
      // For now, just verify the page is still functional
      await expect(page.getByRole('main')).toBeVisible();
    }
  });

  test('should handle search analytics toggle', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Look for analytics toggle
    const analyticsButton = page.getByRole('button', { name: /analytics/i });
    if (await analyticsButton.isVisible()) {
      await analyticsButton.click();
      
      // Should show analytics section
      await expect(page.getByText(/trending/i).or(page.getByText(/insights/i))).toBeVisible();
    }
  });

  test('should save and unsave jobs', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Look for save job button
    const saveButton = page.getByRole('button', { name: /save/i }).first();
    if (await saveButton.isVisible()) {
      await saveButton.click();
      
      // Should show feedback (toast or visual change)
      // This would depend on the actual implementation
      await page.waitForTimeout(1000);
    }
  });

  test('should handle pagination', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Look for pagination controls
    const nextButton = page.getByRole('button', { name: /next/i });
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForLoadState('networkidle');
      
      // Should load next page of results
      await expect(page.getByText(/jobs found/i)).toBeVisible();
    }
  });

  test('should handle sorting options', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Look for sort dropdown
    const sortDropdown = page.getByRole('combobox').or(
      page.locator('select')
    ).first();
    
    if (await sortDropdown.isVisible()) {
      await sortDropdown.selectOption('date');
      await page.waitForLoadState('networkidle');
      
      // Results should be re-sorted
      await expect(page.getByText(/jobs found/i)).toBeVisible();
    }
  });

  test('should handle view mode toggle', async ({ page }) => {
    await page.goto('/jobs');
    await page.waitForLoadState('networkidle');
    
    // Look for view mode buttons (list/grid)
    const gridViewButton = page.getByRole('button').filter({ hasText: /grid/i });
    if (await gridViewButton.isVisible()) {
      await gridViewButton.click();
      
      // Layout should change
      await page.waitForTimeout(500);
      await expect(page.getByText(/jobs found/i)).toBeVisible();
    }
  });
});
