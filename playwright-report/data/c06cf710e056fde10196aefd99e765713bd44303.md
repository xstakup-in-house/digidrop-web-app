# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard >> dashboard T&C page loads with return link
- Location: e2e\dashboard.spec.ts:24:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/return to flight deck/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/return to flight deck/i)

```

```yaml
- region "Notifications alt+T"
- alert
- banner:
  - link "Digi Drop Logo":
    - /url: /
    - img "Digi Drop Logo"
  - navigation:
    - button "How to Play"
    - button "FAQ"
    - link "Manifesto":
      - /url: /manifesto
  - button "Beta"
  - link "Login with Wallet":
    - /url: /login
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
  3  | test.describe("Dashboard", () => {
  4  |   test("dashboard page loads", async ({ page }) => {
  5  |     await page.goto("/dashboard", { waitUntil: "domcontentloaded", timeout: 45000 })
  6  |     expect(page.url()).toContain("/dashboard")
  7  |   })
  8  | 
  9  |   test("leaderboard page loads", async ({ page }) => {
  10 |     await page.goto("/leaderboard", { waitUntil: "domcontentloaded", timeout: 45000 })
  11 |     expect(page.url()).toContain("/leaderboard")
  12 |   })
  13 | 
  14 |   test("referrals page loads", async ({ page }) => {
  15 |     await page.goto("/referrals", { waitUntil: "domcontentloaded", timeout: 45000 })
  16 |     expect(page.url()).toContain("/referrals")
  17 |   })
  18 | 
  19 |   test("profile edit page loads", async ({ page }) => {
  20 |     await page.goto("/profile/edit", { waitUntil: "domcontentloaded", timeout: 45000 })
  21 |     expect(page.url()).toContain("/profile/edit")
  22 |   })
  23 | 
  24 |   test("dashboard T&C page loads with return link", async ({ page }) => {
  25 |     await page.goto("/dashboard/term-and-condition")
> 26 |     await expect(page.getByText(/return to flight deck/i)).toBeVisible()
     |                                                            ^ Error: expect(locator).toBeVisible() failed
  27 |   })
  28 | 
  29 |   test("dashboard privacy policy page loads", async ({ page }) => {
  30 |     await page.goto("/dashboard/privacy-policy", { waitUntil: "domcontentloaded" })
  31 |     expect(page.url()).toContain("/dashboard/privacy-policy")
  32 |   })
  33 | 
  34 |   test("dashboard manifesto page loads", async ({ page }) => {
  35 |     await page.goto("/dashboard/manifesto", { waitUntil: "domcontentloaded" })
  36 |     expect(page.url()).toContain("/dashboard/manifesto")
  37 |   })
  38 | })
  39 | 
```