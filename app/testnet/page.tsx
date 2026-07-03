import React from "react";
import type { Metadata } from "next";
import TestnetClient from "./TestnetClient";

export const metadata: Metadata = {
  title: "Digidrops Testnet — The Human Data Layer for Web3 AI",
  description: "Join the Digidrops Testnet. Verify your human footprint, participate in early rewards, test networks, and help secure the decentralized data layer for AI.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://testnet.digidrops.xyz",
    title: "Digidrops Testnet — The Human Data Layer for Web3 AI",
    description: "Join the Digidrops Testnet. Verify your human footprint, participate in early rewards, test networks, and help secure the decentralized data layer for AI.",
    siteName: "Digidrops Testnet",
    images: [
      {
        url: "https://digidrops.xyz/assets/testnet-og.webp",
        width: 1200,
        height: 630,
        alt: "Digidrops Testnet - The Human Data Layer for Web3 AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digidrops Testnet — The Human Data Layer for Web3 AI",
    description: "Verify your human footprint, participate in rewards, and help build the Web3 AI network. Testnet Phase 1 Live.",
    creator: "@Digidrops_xyz",
    images: ["https://digidrops.xyz/assets/testnet-og.webp"],
  },
};

export default function TestnetPage() {
  return <TestnetClient />;
}
