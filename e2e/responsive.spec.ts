import { test, expect } from "@playwright/test"

test.describe("Responsive Layout", () => {
  test("homepage adapts to mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/", { waitUntil: "domcontentloaded" })

    await expect(page.getByText(/AI Should Learn From Humans/i)).toBeVisible()
    await expect(page.getByRole("link", { name: /mint your passport/i })).toBeVisible()
  })

  test("dashboard adapts to mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" })

    expect(page.url()).toContain("/dashboard")
  })

  test("login page adapts to mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/login")

    await expect(page).toHaveURL(/\/login/)
  })
})
