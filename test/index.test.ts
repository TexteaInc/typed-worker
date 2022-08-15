import { expect, test } from '@playwright/test'

test('worker', async ({ page }) => {
  await page.goto('http://localhost:3001')
  await Promise.all([
    page.waitForSelector('#iframe-result'),
    page.waitForSelector('#worker-result')
  ])

  const workerResult = await page.$('#worker-result')
  const iframeResult = await page.$('#iframe-result')
  expect(await workerResult?.textContent()).toBe('3')
  expect(await iframeResult?.textContent()).toBe('7')
})
