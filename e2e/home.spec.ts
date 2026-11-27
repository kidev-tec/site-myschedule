import { test, expect } from '@playwright/test'

test.describe('AGENVA site', () => {
  test('home renderiza', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/AGENVA/i)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('segmentos: 9 dots', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section[aria-labelledby="segmentos-title"]')
    await expect(section).toBeVisible()
    await expect(section.locator('[role="tablist"] button')).toHaveCount(9)
  })

  test('dot alterna slide', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section[aria-labelledby="segmentos-title"]')
    await section.locator('[role="tablist"] button').nth(2).click()
    await expect(section.locator('h3')).toBeVisible()
  })

  test('seo meta e jsonld', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="description"]')).toHaveCount(1)
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
  })

  test('termos renderiza', async ({ page }) => {
    await page.goto('/termos')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('privacidade renderiza', async ({ page }) => {
    await page.goto('/privacidade')
    await expect(page.locator('h1')).toBeVisible()
  })
})
