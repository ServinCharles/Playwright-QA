const { test, expect } = require('@playwright/test');

test('uses accessible locators and a stable test id for a custom visual', async ({ page }) => {
  await page.setContent(`
    <main>
      <label for="email">Email</label>
      <input id="email" type="email">
      <button type="button" onclick="document.querySelector('[role=status]').textContent = 'Settings saved'">
        Save
      </button>
      <p role="status"></p>
      <p>Monthly sessions: 42</p>
      <canvas data-testid="sessions-chart" aria-hidden="true" width="240" height="80"></canvas>
    </main>
  `);

  await page.getByLabel('Email').fill('qa@example.com');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Settings saved');
  await expect(page.getByTestId('sessions-chart')).toBeVisible();
});