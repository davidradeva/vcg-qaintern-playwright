const { test, expect } = require('@playwright/test');

async function findVisible(locator) {
  try {
    const cand = locator.first();
    if (await cand.isVisible()) return cand;
  } catch (_) {}
  return null;
}

test.describe('Gercep E2E', () => {
  const { test, expect } = require('@playwright/test');

test('Scenario A — Open Gercep Page & Check Title (spec)', async ({ page }, testInfo) => {
  await page.goto('https://www.vcgamers.com/gercep', { waitUntil: 'domcontentloaded' });
  const searchInput = page.locator('input[placeholder*="Gercep" i], input[placeholder*="Cari" i]');
  await expect(searchInput).toBeVisible({ timeout: 30_000 });

  await expect(page).toHaveURL(/\/gercep/);

  const actualTitle = await page.title();
  console.log('ACTUAL TITLE:', actualTitle);
  await testInfo.attach('actual-title.txt', { body: actualTitle, contentType: 'text/plain' });
  await testInfo.attach('page.png', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });

  await expect(page).toHaveTitle(/VCGamers/i);
});

  test('Scenario B — Search Bar Interaction (spec)', async ({ page }) => {
  await page.goto('https://vcgamers.com/gercep', { waitUntil: 'domcontentloaded' });

  const searchBoxCandidates = [
    page.getByPlaceholder(/Cari Nama Brand di Gercep/i),
    page.getByRole('searchbox'),
    page.locator('input[type="search"]'),
    page.locator('input[placeholder*="Cari" i]')
  ];
  let searchBox = null;
  for (const loc of searchBoxCandidates) {
    if (await loc.first().isVisible().catch(() => false)) { searchBox = loc.first(); break; }
  }
  if (!searchBox) throw new Error('Search bar tidak ditemukan di halaman Gercep.');
  await expect(searchBox).toBeVisible({ timeout: 30_000 });

  await searchBox.fill('mobile legends');
  await searchBox.press('Enter');

  const result = page.locator([
    'a:has-text("Mobile Legends")',
    '[data-testid*="card"]:has-text("Mobile Legends")',
    'img[alt*="Mobile Legends" i]'
  ].join(', ')).first();

  await expect(result).toBeVisible({ timeout: 15_000 });
});

test('Scenario C — Click First Item', async ({ page }) => {
  
  await page.goto('https://vcgamers.com/gercep', { waitUntil: 'domcontentloaded' });

  const searchBox = page.getByPlaceholder(/Cari Nama Brand di Gercep/i)
    .or(page.getByRole('searchbox'))
    .or(page.locator('input[type="search"]'))
    .or(page.locator('input[placeholder*="Cari" i]'));
  await expect(searchBox.first()).toBeVisible({ timeout: 30_000 });

  await searchBox.first().fill('mobile legends');
  await searchBox.first().press('Enter');

  const result = page.locator([
    'a:has-text("Mobile Legends")',
    '[data-testid*="card"]:has-text("Mobile Legends")',
    'img[alt*="Mobile Legends" i]'
  ].join(', ')).first();
  await expect(result).toBeVisible({ timeout: 15_000 });

  const before = page.url();
  await Promise.all([
    page.waitForURL(u => u.toString() !== before, { timeout: 15_000 }),
    result.click()
  ]);

  const urlNow = page.url();
  const urlLooksRight = /mobile-?legends/i.test(urlNow); 

  const brandHeading = page.getByRole('heading').filter({ hasText: /mobile legends/i }).first();
  await brandHeading.scrollIntoViewIfNeeded();
  const headingVisible = await brandHeading.isVisible().catch(() => false);

  expect(urlLooksRight || headingVisible).toBeTruthy();
});
});
