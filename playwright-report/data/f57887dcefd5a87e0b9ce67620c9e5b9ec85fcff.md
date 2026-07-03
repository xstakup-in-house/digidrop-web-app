# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.ts >> Responsive Layout >> dashboard adapts to mobile viewport
- Location: e2e\responsive.spec.ts:12:7

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
  3  | test.describe("Responsive Layout", () => {
  4  |   test("homepage adapts to mobile viewport", async ({ page }) => {
  5  |     await page.setViewportSize({ width: 375, height: 812 })
  6  |     await page.goto("/", { waitUntil: "domcontentloaded" })
  7  | 
  8  |     await expect(page.getByText(/AI Should Learn From Real Humans/i)).toBeVisible()
  9  |     await expect(page.getByRole("link", { name: /mint your passport/i })).toBeVisible()
  10 |   })
  11 | 
  12 |   test("dashboard adapts to mobile viewport", async ({ page }) => {
  13 |     await page.setViewportSize({ width: 375, height: 812 })
  14 |     await page.goto("/dashboard", { waitUntil: "domcontentloaded" })
  15 | 
> 16 |     expect(page.url()).toContain("/dashboard")
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  17 |   })
  18 | 
  19 |   test("login page adapts to mobile viewport", async ({ page }) => {
  20 |     await page.setViewportSize({ width: 375, height: 812 })
  21 |     await page.goto("/login")
  22 | 
  23 |     await expect(page).toHaveURL(/\/login/)
  24 |   })
  25 | })
  26 | 
```