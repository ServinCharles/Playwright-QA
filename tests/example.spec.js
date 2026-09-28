const { test, expect } = require('@playwright/test');

test('Playwright.dev has the expected title and Playwright Test heading', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.getByRole('heading', { name: 'Playwright Test', exact: true })).toBeVisible();

  await test.step('Click Get started and land on the intro page', async () => {
    await page.getByRole('link', { name: 'Get started', exact: true }).click();

    await expect(page).toHaveURL('https://playwright.dev/docs/intro');
    await expect(page.getByRole('heading', { name: 'Installation', exact: true })).toBeVisible();

    const vscodeGuideLink = page.getByRole('link', { name: 'VS Code Extension', exact: true });
    await expect(vscodeGuideLink).toBeVisible();
    await vscodeGuideLink.click();

    await expect(page).toHaveURL('https://playwright.dev/docs/getting-started-vscode');
    await expect(page.getByRole('heading', { name: 'VS Code', exact: true })).toBeVisible();
  });
});