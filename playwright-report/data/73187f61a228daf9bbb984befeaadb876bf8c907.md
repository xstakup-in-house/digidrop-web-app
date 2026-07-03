# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> mint pass detail page shows pass options
- Location: e2e\navigation.spec.ts:21:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Choose Your Digidrops Pass/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Choose Your Digidrops Pass/i })

```

```yaml
- region "Notifications alt+T"
- alert
- banner:
  - link "Digi Drop Logo":
    - /url: /
    - img "Digi Drop Logo"
  - link "Login":
    - /url: /login
  - button "Toggle menu":
    - img
- main:
  - heading "Welcome to Digiverse" [level=1]
  - paragraph: Connect your wallet for secure login
  - button "Connect Wallet"
  - paragraph: Use Metamask or Trust Wallet · BNB Chain
- contentinfo:
  - paragraph: COPYRIGHT © 2026 DIGIDROPS
  - link "Terms and Conditions":
    - /url: /term-and-condition
  - link "Privacy Policy":
    - /url: /privacy-policy
  - link "Manifesto":
    - /url: /manifesto
  - link "X (Twitter)":
    - /url: https://twitter.com/Digidrops_xyz
    - img
  - link "Facebook":
    - /url: https://facebook.com/Digidrops_xyz
    - img
  - link "Instagram":
    - /url: https://instagram.com/digidrops.xyz
    - img
  - link "Discord":
    - /url: https://discord.com/invite/digidropsai
    - img
  - link "Telegram":
    - /url: https://t.me/DigidropsAI
    - img
  - text: "Disclaimer: Digidrops Soulbound Tokens (SBTs) and Stardust points are non-transferable digital utility credentials and participation metrics used for platform access, reputation, and identity. They have no market/monetary value, cannot be resold or traded, and strictly represent membership within the community. The minting fee covers protocol maintenance and ecosystem development. This is a purchase of a digital good, not an investment contract."
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | test.describe("Navigation", () => {
  4  |   test("navigate from home to login via CTA link", async ({ page }) => {
  5  |     await page.goto("/", { waitUntil: "domcontentloaded" })
  6  |     await page.getByRole("link", { name: /mint your passport/i }).click()
  7  |     await page.waitForURL(/\/login/)
  8  |     expect(page.url()).toContain("/login")
  9  |   })
  10 | 
  11 |   test("protected routes are accessible in dev mode", async ({ page }) => {
  12 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" })
  13 |     expect(page.url()).toContain("/dashboard")
  14 |   })
  15 | 
  16 |   test("protected route /mint-pass loads", async ({ page }) => {
  17 |     await page.goto("/mint-pass", { waitUntil: "domcontentloaded" })
  18 |     expect(page.url()).toContain("/mint-pass")
  19 |   })
  20 | 
  21 |   test("mint pass detail page shows pass options", async ({ page }) => {
  22 |     await page.goto("/mint-pass", { waitUntil: "domcontentloaded" })
> 23 |     await expect(page.getByRole("heading", { name: /Choose Your Digidrops Pass/i })).toBeVisible()
     |                                                                                      ^ Error: expect(locator).toBeVisible() failed
  24 |   })
  25 | })
  26 | 
```