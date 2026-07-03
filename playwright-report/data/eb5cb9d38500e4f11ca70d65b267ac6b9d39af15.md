# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard >> dashboard privacy policy page loads
- Location: e2e\dashboard.spec.ts:29:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/dashboard/privacy-policy"
Received string:    "http://localhost:3000/login?redirect=%2Fdashboard%2Fprivacy-policy"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Notifications alt+T"
  - alert [ref=e2]
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - link "Digi Drop Logo" [ref=e8] [cursor=pointer]:
          - /url: /
          - img "Digi Drop Logo" [ref=e9]
        - generic [ref=e10]:
          - link "Login" [ref=e11] [cursor=pointer]:
            - /url: /login
          - button "Toggle menu" [ref=e12] [cursor=pointer]:
            - img [ref=e13]
    - main [ref=e14]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - heading "Welcome to Digiverse" [level=1] [ref=e20]
          - paragraph [ref=e21]: Connect your wallet for secure login
        - paragraph [ref=e23]: Use Metamask or Trust Wallet · BNB Chain
    - contentinfo [ref=e24]:
      - generic [ref=e26]:
        - generic [ref=e27]:
          - paragraph [ref=e28]: COPYRIGHT © 2026 DIGIDROPS
          - link "Terms and Conditions" [ref=e29] [cursor=pointer]:
            - /url: /term-and-condition
          - link "Privacy Policy" [ref=e30] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Manifesto" [ref=e31] [cursor=pointer]:
            - /url: /manifesto
        - generic [ref=e32]:
          - link "X (Twitter)" [ref=e33] [cursor=pointer]:
            - /url: https://twitter.com/Digidrops_xyz
            - img [ref=e34]
          - link "Facebook" [ref=e36] [cursor=pointer]:
            - /url: https://facebook.com/Digidrops_xyz
            - img [ref=e37]
          - link "Instagram" [ref=e39] [cursor=pointer]:
            - /url: https://instagram.com/digidrops.xyz
            - img [ref=e40]
          - link "Discord" [ref=e42] [cursor=pointer]:
            - /url: https://discord.com/invite/digidropsai
            - img [ref=e43]
          - link "Telegram" [ref=e45] [cursor=pointer]:
            - /url: https://t.me/DigidropsAI
            - img [ref=e46]
      - generic [ref=e49]: "Disclaimer: Digidrops Soulbound Tokens (SBTs) and Stardust points are non-transferable digital utility credentials and participation metrics used for platform access, reputation, and identity. They have no market/monetary value, cannot be resold or traded, and strictly represent membership within the community. The minting fee covers protocol maintenance and ecosystem development. This is a purchase of a digital good, not an investment contract."
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
  26 |     await expect(page.getByText(/return to flight deck/i)).toBeVisible()
  27 |   })
  28 | 
  29 |   test("dashboard privacy policy page loads", async ({ page }) => {
  30 |     await page.goto("/dashboard/privacy-policy", { waitUntil: "domcontentloaded" })
> 31 |     expect(page.url()).toContain("/dashboard/privacy-policy")
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  32 |   })
  33 | 
  34 |   test("dashboard manifesto page loads", async ({ page }) => {
  35 |     await page.goto("/dashboard/manifesto", { waitUntil: "domcontentloaded" })
  36 |     expect(page.url()).toContain("/dashboard/manifesto")
  37 |   })
  38 | })
  39 | 
```