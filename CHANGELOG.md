# Changelog - Digidrops Web App

All notable changes to the Digidrops web application will be documented in this file.

## [Unreleased] - June 2026

### Added
- **Manifesto Navigation**: Integrated `/manifesto` navigation links in both desktop and mobile menu interfaces inside [nav-bar.tsx](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/(marketing)/_components/nav-bar.tsx).
- **Deployment Documentation**: Created [DEPLOYMENT.md](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/DEPLOYMENT.md) detailing configuration, environment variables, building instructions, and deployment workflow.
- **Resilience and Error Handling**: Wrapped stats and leaderboard API routes in try-catch statements to prevent SSR (Server-Side Rendering) and API runtime crashes.

### Fixed
- **SEO & Metadata Alignment**: Aligned the title, keywords, descriptions, open graph tags, and twitter card tags inside [layout.tsx](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/layout.tsx) with updated production search directives.
- **Copywriting Refinements**: 
  - Aligned hero subheading, heading, and description on the landing page [page.tsx](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/(marketing)/page.tsx).
  - Aligned minting descriptions and sub-headers on [page.tsx (mint-pass)](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/(dashboard)/mint-pass/page.tsx).
  - Adjusted refer-and-earn text and shared referral invites in [page.tsx (referrals)](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/(dashboard)/(membership)/referrals/page.tsx).
- **Mock Data Elimination**: Removed all `MOCK_PASSES` and `MOCK_TASKS` fallbacks, along with developer bypasses on local environments (`NODE_ENV === 'development'`) in [pass.ts](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/data/digi-pass/pass.ts), [onsite-task.ts](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/app/data/tasks/onsite-task.ts), and Next.js server actions [app.ts](file:///c:/Users/user/.gemini/antigravity/scratch/digidrop-web-app/actions/app.ts) to force direct API requests.
- **Popup Blocking Mitigation**: Synchronously open blank browser tabs before async actions resolve when redirecting to social quests, preventing modern web browsers from blocking redirect popups.
- **Quest Workflow**: Fixed quest redirect mapping, timer synchronization, and robust error handling in the tasks workflow (`useTasks.ts` and `task-card.tsx`).
- **Security Hardening**: Fixed a JWT (JSON Web Token) token leak risk in API requests and hardened authentication headers across the web application.
- **Login Redirects**: Configured automatic redirection from the dashboard back to `/login` when API requests return a `401 Unauthorized` response.
- **Auth Headers**: Prevented appending Authorization headers to authentication/login requests (`/login`) to avoid intercepting issues.
- **Minting & Upgrading Flow**: Significantly improved the minting confirmation screen (`/mint/confirm`) and buttons (`mintButton.tsx`, `upgradeButton.tsx`) to handle transaction steps and wallet connections with better state management.

### Style & UI Improvements
- **Pass Price Adjustments**: Reflected updated mock prices to White ($5), Black ($3), and Gold ($9) inside local mock setups.
- **Typography Alignment**: Applied the custom `font-chakra` class consistently across the platform including terms & conditions, privacy policy, manifesto headers, and referrals headings.
- **Font Simplification**: Removed unnecessary container font overrides to enforce the default premium Inter font system-wide.
- **Dashboard Copy**: Streamlined welcome copies and adjusted the "Welcome username" greeting styles.
- **Theme Gradients**: Standardized gradient styling between the "Prove you're human" prompt, referrals page title, and the main dashboard welcome cards.
- **Layout & Layout Alignment**:
  - Aligned navbars to stretch to full-width screen edges.
  - Implemented responsive mobile layouts, including compact square cards in the Circular/benefits section and an optimized mobile navbar.
  - Conditionally set wallet connection status text color to gray when not connected.
