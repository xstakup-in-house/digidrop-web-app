import { test, expect } from "@playwright/test"

test.describe("Marketing Pages", () => {
  test("homepage loads with all sections", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })

    const heading = page.getByText(/prove you.*human/i).first()
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
    await expect(page.getByText("Season 1 is live")).toBeVisible()
    await expect(page.getByText("Mint Your Passport")).toBeVisible()
    await expect(page.getByText("Powered by BNB Chain")).toBeVisible()
    await expect(page.getByRole("link", { name: /mint your passport/i })).toBeVisible()
  })

  test("homepage displays three passport cards", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
    await page.getByRole("link", { name: /mint your passport/i }).scrollIntoViewIfNeeded()

    await expect(page.getByAltText("Black Passport")).toBeVisible()
    await expect(page.getByAltText("Gold Passport")).toBeVisible()
    await expect(page.getByAltText("White Passport")).toBeVisible()
  })

  test("login page loads with connect wallet button", async ({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByTestId("rk-connect-button")).toBeVisible()
  })

  test("manifesto page loads with content", async ({ page }) => {
    await page.goto("/manifesto")
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("terms and conditions page loads", async ({ page }) => {
    await page.goto("/term-and-condition")
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("privacy policy page loads", async ({ page }) => {
    await page.goto("/privacy-policy")
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("FAQ section is present on homepage", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
    await expect(page.getByRole("heading", { name: /frequently asked questions/i })).toBeVisible()
  })
})
