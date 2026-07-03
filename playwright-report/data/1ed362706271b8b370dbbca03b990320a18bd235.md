# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> protected routes are accessible in dev mode
- Location: e2e\navigation.spec.ts:11:7

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
> 13 |     expect(page.url()).toContain("/dashboard")
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  14 |   })
  15 | 
  16 |   test("protected route /mint-pass loads", async ({ page }) => {
  17 |     await page.goto("/mint-pass", { waitUntil: "domcontentloaded" })
  18 |     expect(page.url()).toContain("/mint-pass")
  19 |   })
  20 | 
  21 |   test("mint pass detail page shows pass options", async ({ page }) => {
  22 |     await page.goto("/mint-pass", { waitUntil: "domcontentloaded" })
  23 |     await expect(page.getByRole("heading", { name: /Choose Your Digidrops Pass/i })).toBeVisible()
  24 |   })
  25 | })
  26 | 
```