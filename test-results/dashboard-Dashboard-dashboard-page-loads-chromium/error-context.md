# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard >> dashboard page loads
- Location: e2e\dashboard.spec.ts:4:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/dashboard"
Received string:    "http://localhost:3000/login?redirect=%2Fdashboard"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Notifications alt+T"
  - alert [ref=e2]
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - link "Digi Drop Logo":
            - /url: /
            - img "Digi Drop Logo"
          - navigation [ref=e8]:
            - button "How to Play" [ref=e9] [cursor=pointer]
            - button "FAQ" [ref=e10] [cursor=pointer]
            - link "Manifesto" [ref=e11] [cursor=pointer]:
              - /url: /manifesto
        - generic [ref=e12]:
          - button "Beta" [ref=e13] [cursor=pointer]
          - link "Login with Wallet" [ref=e14] [cursor=pointer]:
            - /url: /login
    - main [ref=e15]:
      - generic [ref=e19]:
        - generic [ref=e20]:
          - heading "Welcome to Digiverse" [level=1] [ref=e21]
          - paragraph [ref=e22]: Connect your wallet for secure login
        - generic [ref=e23]:
          - button "Connect Wallet" [ref=e26] [cursor=pointer]
          - paragraph [ref=e27]: Use Metamask or Trust Wallet · BNB Chain
    - contentinfo [ref=e28]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - paragraph [ref=e32]: COPYRIGHT © 2026 DIGIDROPS
          - link "Terms and Conditions" [ref=e33] [cursor=pointer]:
            - /url: /term-and-condition
          - link "Privacy Policy" [ref=e34] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Manifesto" [ref=e35] [cursor=pointer]:
            - /url: /manifesto
        - generic [ref=e36]:
          - link "X (Twitter)" [ref=e37] [cursor=pointer]:
            - /url: https://twitter.com/Digidrops_xyz
            - img [ref=e38]
          - link "Facebook" [ref=e40] [cursor=pointer]:
            - /url: https://facebook.com/Digidrops_xyz
            - img [ref=e41]
          - link "Instagram" [ref=e43] [cursor=pointer]:
            - /url: https://instagram.com/digidrops.xyz
            - img [ref=e44]
          - link "Discord" [ref=e46] [cursor=pointer]:
            - /url: https://discord.com/invite/digidropsai
            - img [ref=e47]
          - link "Telegram" [ref=e49] [cursor=pointer]:
            - /url: https://t.me/DigidropsAI
            - img [ref=e50]
      - generic [ref=e53]: "Disclaimer: Digidrops Soulbound Tokens (SBTs) and Stardust points are non-transferable digital utility credentials and participation metrics used for platform access, reputation, and identity. They have no market/monetary value, cannot be resold or traded, and strictly represent membership within the community. The minting fee covers protocol maintenance and ecosystem development. This is a purchase of a digital good, not an investment contract."
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | test.describe("Dashboard", () => {
  4  |   test("dashboard page loads", async ({ page }) => {
  5  |     await page.goto("/dashboard", { waitUntil: "domcontentloaded", timeout: 45000 })
> 6  |     expect(page.url()).toContain("/dashboard")
     |                        ^ Error: expect(received).toContain(expected) // indexOf
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