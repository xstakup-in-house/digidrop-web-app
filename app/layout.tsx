import React from "react"
import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";
import { TelegramScript } from "@/components/common/TelegramScript";




const chakra = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  style: "normal"
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1C1C1C",
};

export const metadata: Metadata = {
  title: "Digidrops — The Human Data Layer for Web3 AI",
  description: "Digidrops is building a decentralized network of verified humans contributing trusted signals, reputation, and intelligence for the next generation of Web3 AI.",
  icons: {
    icon: "/assets/favicon (1).webp",
  },
  keywords: "Digidrops, Web3 AI, Human Data Layer, Human Intelligence Network, Soulbound Passport, Stardust, decentralized AI, human reputation, verified contributors, Web3 testnet, AI data network",
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
    title: "Digidrops — The Human Data Layer for Web3 AI",
    description: "Join Digidrops Testnet and become part of a verified human network built to power community rewards, reputation, and future AI data programs.",
    siteName: "Digidrops",
    images: [
      {
        url: "https://digidrops.xyz/assets/main-og.webp",
        width: 1200,
        height: 630,
        alt: "Digidrops - The Human Data Layer for Web3 AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digidrops — The Human Data Layer for Web3 AI",
    description: "Verified humans. Trusted signals. Reputation for Web3 AI. Testnet Live",
    creator: "@Digidrops_xyz",
    images: ["https://digidrops.xyz/assets/main-og.webp"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TelegramScript />
      </head>
      <body
        className={`${chakra.variable} ${inter.variable} antialiased bg-[#1C1C1C] font-ui`}
      >
        <Toaster position="bottom-right" richColors/>
        <ClientProviders>
           {children}
        </ClientProviders>
        
      </body>
    </html>
  );
}
