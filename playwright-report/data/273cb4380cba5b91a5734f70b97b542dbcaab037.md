# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> protected route /mint-pass loads
- Location: e2e\navigation.spec.ts:16:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "/mint-pass"
Received string:    "http://localhost:3000/login?redirect=%2Fmint-pass"
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
          - link "Digi Drop Logo" [ref=e8] [cursor=pointer]:
            - /url: /
            - img "Digi Drop Logo" [ref=e9]
          - navigation [ref=e10]:
            - button "How to Play" [ref=e11] [cursor=pointer]
            - button "FAQ" [ref=e12] [cursor=pointer]
            - link "Manifesto" [ref=e13] [cursor=pointer]:
              - /url: /manifesto
        - generic [ref=e14]:
          - button "Beta" [ref=e15] [cursor=pointer]
          - link "Login with Wallet" [ref=e16] [cursor=pointer]:
            - /url: /login
    - main [ref=e17]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - heading "Welcome to Digiverse" [level=1] [ref=e23]
          - paragraph [ref=e24]: Connect your wallet for secure login
        - paragraph [ref=e26]: Use Metamask or Trust Wallet · BNB Chain
    - contentinfo [ref=e27]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - paragraph [ref=e31]: COPYRIGHT © 2026 DIGIDROPS
          - link "Terms and Conditions" [ref=e32] [cursor=pointer]:
            - /url: /term-and-condition
          - link "Privacy Policy" [ref=e33] [cursor=pointer]:
            - /url: /privacy-policy
          - link "Manifesto" [ref=e34] [cursor=pointer]:
            - /url: /manifesto
        - generic [ref=e35]:
          - link "X (Twitter)" [ref=e36] [cursor=pointer]:
            - /url: https://twitter.com/Digidrops_xyz
            - img [ref=e37]
          - link "Facebook" [ref=e39] [cursor=pointer]:
            - /url: https://facebook.com/Digidrops_xyz
            - img [ref=e40]
          - link "Instagram" [ref=e42] [cursor=pointer]:
            - /url: https://instagram.com/digidrops.xyz
            - img [ref=e43]
          - link "Discord" [ref=e45] [cursor=pointer]:
            - /url: https://discord.com/invite/digidropsai
            - img [ref=e46]
          - link "Telegram" [ref=e48] [cursor=pointer]:
            - /url: https://t.me/DigidropsAI
            - img [ref=e49]
      - generic [ref=e52]: "Disclaimer: Digidrops Soulbound Tokens (SBTs) and Stardust points are non-transferable digital utility credentials and participation metrics used for platform access, reputation, and identity. They have no market/monetary value, cannot be resold or traded, and strictly represent membership within the community. The minting fee covers protocol maintenance and ecosystem development. This is a purchase of a digital good, not an investment contract."
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
> 18 |     expect(page.url()).toContain("/mint-pass")
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  19 |   })
  20 | 
  21 |   test("mint pass detail page shows pass options", async ({ page }) => {
  22 |     await page.goto("/mint-pass", { waitUntil: "domcontentloaded" })
  23 |     await expect(page.getByRole("heading", { name: /Choose Your Digidrops Pass/i })).toBeVisible()
  24 |   })
  25 | })
  26 | 
```