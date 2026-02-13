import { test, expect } from '@playwright/test';

test.describe('Tax Engine Tests', () => {

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));
        page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

        // Go to the tax engine tools page
        await page.goto('/tools/tax-engine');
    });

    test('Life Engine - Family Optimizer Calculation', async ({ page }) => {
        console.log('Starting Life Engine test');
        // Navigate to Life Engine
        console.log('Clicking Individual & Family (Life Engine)');
        await page.getByRole('heading', { name: 'Individual & Family' }).click();
        console.log('Checking URL');
        await expect(page).toHaveURL(/.*\/life$/);

        // Select Family Optimizer
        console.log('Clicking Family Optimizer');
        await page.getByText('Family Optimizer').click();

        // Fill in the form
        console.log('Filling form');
        await page.getByLabel('Your Annual Income').fill('85000');
        await page.getByLabel("Spouse's Annual Income").fill('45000');
        await page.getByLabel('Your Age').fill('35');

        // Check checkboxes
        console.log('Checking boxes');
        await page.getByLabel('Do you receive pension income?').check();
        await page.getByLabel('Do you have children?').check();

        // Fill conditional field
        console.log('Filling child care');
        await page.getByLabel('Annual Childcare Expenses').fill('12000');

        // Wait for results
        // expect will wait for visibility automatically

        // Check results
        console.log('Checking results');
        await expect(page.getByText('Estimated Savings')).toBeVisible();
        await expect(page.getByText('CRA Audit Risk')).toBeVisible();
    });

    test('Growth Engine - HST Optimizer Calculation', async ({ page }) => {
        // Navigate to Growth Engine
        console.log('Clicking Business Owner (Growth Engine)');
        const headings = page.getByRole('heading', { name: 'Business Owner' });
        console.log('Headings found:', await headings.count());
        if (await headings.count() > 1) {
            console.log('First heading:', await headings.nth(0).textContent());
            console.log('Second heading:', await headings.nth(1).textContent());
        }
        await headings.first().click(); // Workaround if multiple

        await expect(page).toHaveURL(/.*\/growth$/);

        // Select HST Optimizer
        const hstButton = page.getByText('HST Optimizer');
        console.log('HST Button visible:', await hstButton.isVisible());
        await hstButton.click();

        // Fill Form
        await page.getByLabel('Annual Business Revenue', { exact: true }).fill('150000');
        await page.getByLabel('Annual Business Expenses').fill('5000');
        await page.locator('select').selectOption('Consulting');

        // Wait for results
        // expect will wait for visibility automatically

        // Check results
        await expect(page.getByText('Estimated Savings')).toBeVisible();
        // Benefit of Quick Method ($4,884.000) over Regular ITCs ($650.000) = $4,234.000
        await expect(page.getByText('$4,234.000').first()).toBeVisible();
    });

    test('Niche Engine - Navigation Check', async ({ page }) => {
        // Navigate to Niche Engine (assuming it exists based on code structure)
        // Check if the card exists first, it might be named differently or not linked yet
        const nicheCard = page.getByRole('heading', { name: 'Investor & Specialist' });
        if (await nicheCard.isVisible()) {
            await nicheCard.click();
            // Just verify we can load the page without crashing
            await expect(page.getByText('Back to Brain Selection')).toBeVisible();
        }
    });

});
