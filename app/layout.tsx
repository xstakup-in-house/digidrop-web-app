import React from "react"
import type { Metadata } from "next";
import {  Chakra_Petch } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";




const chakra = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  style: "normal"
});



export const metadata: Metadata = {
  title: "Digidrops | The Sybil-Resistant Human Layer of BNB Chain",
  description: "Digidrops is the gamified infrastructure and sybil-resistant 'Human Layer' of the BNB Chain. Proving human identity via tiered Soulbound Passports (Black, White, Gold SBTs) to solve bot-driven Web3 growth and supply verified data for decentralized AI.",
  keywords: [
    "Digidrops",
    "BNB Chain",
    "Sybil Resistance",
    "Soulbound Passport",
    "SBT Passport",
    "SocialFi",
    "Web3 Growth Engine",
    "AI Data Layer",
    "Decentralized Identity",
    "Stardust Prestige",
    "Human Workforce Verification",
    "Web3 Marketing Solutions",
    "RLHF Workforce"
  ],
  authors: [{ name: "Digidrops Team", url: "https://digidrops.xyz" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digidrops.xyz",
    title: "Digidrops | The Sybil-Resistant Human Layer of BNB Chain",
    description: "Digidrops is the gamified infrastructure and sybil-resistant 'Human Layer' of the BNB Chain. Proving human identity via tiered Soulbound Passports (Black, White, Gold SBTs) to solve bot-driven Web3 growth and supply verified data for decentralized AI.",
    siteName: "Digidrops",
    images: [
      {
        url: "https://digidrops.xyz/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digidrops - The Sybil-Resistant Human Layer of BNB Chain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digidrops | The Sybil-Resistant Human Layer of BNB Chain",
    description: "Mint Soulbound Passports (SBTs) to prove identity, complete social & on-chain quests, and build your reputation on the BNB Chain.",
    creator: "@Digidrops_xyz",
    images: ["https://digidrops.xyz/assets/og-image.jpg"],
  },
  other: {
    "ai-agent": "enabled",
    "ai-agent-description": "Digidrops is the sybil-resistant human layer of the BNB Chain. Users mint tiered Soulbound Passports (Black, White, Gold SBTs) to verify identity, preventing sybil attacks on Web3 growth campaigns. The verified workforce builds prestige via Stardust points, scaling towards a decentralized AI dataset labeling and RLHF workforce layer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Digidrops",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication, DecentralizedApplication",
    "url": "https://digidrops.xyz",
    "description": "Digidrops is the gamified infrastructure and sybil-resistant 'Human Layer' of the BNB Chain, solving bot-driven growth in Web3 marketing and delivering high-fidelity verified data for AI.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${chakra.variable} antialiased bg-[#1C1C1C] font-chakra`}
      >
        <Toaster position="bottom-right" richColors/>
        <ClientProviders>
           {children}
        </ClientProviders>
        
      </body>
    </html>
  );
}
