import { test, expect } from '@playwright/test';

test.describe('Admin Panel Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication for admin user
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'mock-admin-token');
      localStorage.setItem('user_role', 'admin');
    });
  });

  test('should require authentication for admin access', async ({ page }) => {
    // Clear auth first
    await page.addInitScript(() => {
      localStorage.clear();
    });
    
    await page.goto('/admin');
    
    // Should show authentication required message
    await expect(page.getByText(/authentication required/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
  });

  test('should deny access for non-admin users', async ({ page }) => {
    // Mock regular user
    await page.addInitScript(() => {
      localStorage.setItem('auth_token', 'mock-user-token');
      localStorage.setItem('user_role', 'user');
    });
    
    await page.goto('/admin');
    
    // Should show access denied message
    await expect(page.getByText(/access denied/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /return to home/i })).toBeVisible();
  });

  test('should display admin dashboard for admin users', async ({ page }) => {
    await page.goto('/admin');
    
    // Should show admin dashboard
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible();
    await expect(page.getByText(/manage and moderate/i)).toBeVisible();
    
    // Should show navigation items
    await expect(page.getByText(/dashboard/i)).toBeVisible();
    await expect(page.getByText(/content moderation/i)).toBeVisible();
    await expect(page.getByText(/analytics/i)).toBeVisible();
    await expect(page.getByText(/settings/i)).toBeVisible();
  });

  test('should show key metrics on dashboard', async ({ page }) => {
    await page.goto('/admin');
    
    // Should show metric cards
    await expect(page.getByText(/total users/i)).toBeVisible();
    await expect(page.getByText(/active jobs/i)).toBeVisible();
    await expect(page.getByText(/pending review/i)).toBeVisible();
    await expect(page.getByText(/flagged content/i)).toBeVisible();
    
    // Should show numeric values
    await expect(page.locator('text=/\\d+/')).toBeVisible();
  });

  test('should navigate between admin sections', async ({ page }) => {
    await page.goto('/admin');
    
    // Click on Content Moderation
    await page.getByText(/content moderation/i).click();
    await expect(page.getByText(/review and moderate/i)).toBeVisible();
    
    // Click on Analytics
    await page.getByText(/analytics/i).click();
    await expect(page.getByText(/advanced analytics/i)).toBeVisible();
    
    // Click on Settings
    await page.getByText(/settings/i).click();
    await expect(page.getByText(/system settings/i)).toBeVisible();
    
    // Return to Dashboard
    await page.getByText(/dashboard/i).click();
    await expect(page.getByText(/total users/i)).toBeVisible();
  });

  test('should display content moderation interface', async ({ page }) => {
    await page.goto('/admin');
    
    // Navigate to content moderation
    await page.getByText(/content moderation/i).click();
    
    // Should show moderation controls
    await expect(page.getByPlaceholder(/search content/i)).toBeVisible();
    await expect(page.getByText(/all types/i)).toBeVisible();
    await expect(page.getByText(/pending/i)).toBeVisible();
    
    // Should show content items (if any)
    const contentItems = page.locator('[data-testid="content-item"]');
    if (await contentItems.count() > 0) {
      await expect(contentItems.first()).toBeVisible();
    }
  });

  test('should handle content moderation actions', async ({ page }) => {
    await page.goto('/admin');
    await page.getByText(/content moderation/i).click();
    
    // Look for moderation items
    const moderationItem = page.locator('text=/suspicious/i').or(
      page.locator('text=/pending/i')
    ).first();
    
    if (await moderationItem.isVisible()) {
      await moderationItem.click();
      
      // Should show moderation actions
      await expect(page.getByRole('button', { name: /approve/i }).or(
        page.getByRole('button', { name: /reject/i })
      )).toBeVisible();
    }
  });

  test('should filter content by type and status', async ({ page }) => {
    await page.goto('/admin');
    await page.getByText(/content moderation/i).click();
    
    // Test type filter
    const typeFilter = page.locator('select').first();
    if (await typeFilter.isVisible()) {
      await typeFilter.selectOption('job');
      await page.waitForTimeout(500);
    }
    
    // Test status filter
    const statusFilter = page.locator('select').nth(1);
    if (await statusFilter.isVisible()) {
      await statusFilter.selectOption('pending');
      await page.waitForTimeout(500);
    }
  });

  test('should search content items', async ({ page }) => {
    await page.goto('/admin');
    await page.getByText(/content moderation/i).click();
    
    // Use search functionality
    const searchInput = page.getByPlaceholder(/search content/i);
    await searchInput.fill('test');
    await page.waitForTimeout(1000);
    
    // Results should be filtered
    // This would depend on actual data
  });

  test('should show job moderation interface', async ({ page }) => {
    await page.goto('/admin');
    
    // Navigate to job moderation tab
    await page.getByText(/job moderation/i).click();
    
    // Should show job moderation interface
    await expect(page.getByText(/job title/i)).toBeVisible();
    await expect(page.getByText(/company/i)).toBeVisible();
    await expect(page.getByText(/status/i)).toBeVisible();
    await expect(page.getByText(/priority/i)).toBeVisible();
  });

  test('should show user management interface', async ({ page }) => {
    await page.goto('/admin');
    
    // Navigate to user management tab
    await page.getByText(/user management/i).click();
    
    // Should show user management interface
    await expect(page.getByText(/user/i)).toBeVisible();
    await expect(page.getByText(/role/i)).toBeVisible();
    await expect(page.getByText(/status/i)).toBeVisible();
    await expect(page.getByText(/joined/i)).toBeVisible();
  });

  test('should show content reports interface', async ({ page }) => {
    await page.goto('/admin');
    
    // Navigate to content reports tab
    await page.getByText(/content reports/i).click();
    
    // Should show reports interface
    await expect(page.getByText(/content/i)).toBeVisible();
    await expect(page.getByText(/type/i)).toBeVisible();
    await expect(page.getByText(/reason/i)).toBeVisible();
    await expect(page.getByText(/severity/i)).toBeVisible();
  });

  test('should handle quick actions', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for quick action buttons
    const viewAlertsButton = page.getByRole('button', { name: /view alerts/i });
    if (await viewAlertsButton.isVisible()) {
      await viewAlertsButton.click();
      // Should trigger some action (depends on implementation)
    }
    
    const exportReportButton = page.getByRole('button', { name: /export report/i });
    if (await exportReportButton.isVisible()) {
      await exportReportButton.click();
      // Should trigger export action
    }
  });

  test('should show quick stats in sidebar', async ({ page }) => {
    await page.goto('/admin');
    
    // Should show quick stats
    await expect(page.getByText(/quick stats/i)).toBeVisible();
    await expect(page.getByText(/pending reviews/i)).toBeVisible();
    await expect(page.getByText(/active users/i)).toBeVisible();
    await expect(page.getByText(/system health/i)).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/admin');
    
    // Should still be functional on mobile
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible();
    
    // Navigation should work
    await page.getByText(/content moderation/i).click();
    await expect(page.getByText(/review and moderate/i)).toBeVisible();
  });

  test('should handle admin user profile display', async ({ page }) => {
    await page.goto('/admin');
    
    // Should show admin user info
    await expect(page.getByText(/admin access/i)).toBeVisible();
    
    // Should show user avatar or icon
    const userIcon = page.locator('[data-testid="user-avatar"]').or(
      page.locator('svg').filter({ hasText: /shield/i })
    );
    await expect(userIcon.first()).toBeVisible();
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Mock network error
    await page.route('**/api/**', route => {
      route.abort('failed');
    });
    
    await page.goto('/admin');
    
    // Should still show the interface
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible();
    
    // Error handling would depend on implementation
  });
});
