import { test, expect } from '@playwright/test';

test.describe('Smokeless Product Reviews', () => {
  test('should allow authenticated users to submit reviews', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword');
    await page.click('button[type="submit"]');
    
    // Navigate to a product detail page
    await page.goto('/tools/smokeless-directory/product/1');
    
    // Wait for review form to be visible
    await page.waitForSelector('text="Write a Review"');
    
    // Click stars to rate
    const stars = await page.$$('.lucide-star');
    await stars[3].click(); // 4-star rating
    
    // Fill review text
    await page.fill('textarea[id="review-text"]', 'This is a test review for the product.');
    
    // Submit review
    await page.click('button[type="submit"]:has-text("Submit Review")');
    
    // Verify success toast
    await expect(page.getByText('Review submitted successfully!')).toBeVisible();
    
    // Verify review appears in the list
    await expect(page.getByText('This is a test review for the product.')).toBeVisible();
    
    // Verify rating appears
    const reviewStars = await page.$$('.fill-amber-400');
    expect(reviewStars).toHaveLength(4); // 4 filled stars for 4-star rating
  });

  test('should prevent unauthenticated users from submitting reviews', async ({ page }) => {
    await page.goto('/tools/smokeless-directory/product/1');
    
    // Verify login message
    await expect(page.getByText('You must be logged in to submit a review.')).toBeVisible();
    
    // Verify form is disabled
    const submitButton = await page.getByText('Submit Review');
    await expect(submitButton).toBeDisabled();
  });

  test('should require star rating', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword');
    await page.click('button[type="submit"]');
    
    await page.goto('/tools/smokeless-directory/product/1');
    
    // Try to submit without rating
    await page.fill('textarea[id="review-text"]', 'Test review without rating');
    await page.click('button[type="submit"]:has-text("Submit Review")');
    
    // Verify error message
    await expect(page.getByText('Rating is required.')).toBeVisible();
  });

  test('should update product average rating after review submission', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword');
    await page.click('button[type="submit"]');
    
    await page.goto('/tools/smokeless-directory/product/1');
    
    // Get initial rating
    const initialRating = await page.evaluate(() => {
      const ratingText = document.querySelector('.average-rating')?.textContent;
      return ratingText ? parseFloat(ratingText) : null;
    });
    
    // Submit new review with 5 stars
    const stars = await page.$$('.lucide-star');
    await stars[4].click(); // 5-star rating
    await page.fill('textarea[id="review-text"]', 'Five star review');
    await page.click('button[type="submit"]:has-text("Submit Review")');
    
    // Wait for page to refresh/update
    await page.waitForTimeout(1000);
    
    // Get new rating
    const newRating = await page.evaluate(() => {
      const ratingText = document.querySelector('.average-rating')?.textContent;
      return ratingText ? parseFloat(ratingText) : null;
    });
    
    // Verify rating has changed
    expect(newRating).not.toEqual(initialRating);
  });
});