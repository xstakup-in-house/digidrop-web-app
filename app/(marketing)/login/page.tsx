import { Suspense } from "react";
import type { Metadata } from "next";
import LoginClient from "../_components/LoginClient";

export const metadata: Metadata = {
  title: "Connect to Digidrops — The Human Data Layer for Web3 AI",
  description: "Connect your Web3 wallet securely to access your dashboard, complete quests, and verify your human contributor status inside the Digiverse.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digidrops.xyz/login",
    title: "Connect to Digidrops — The Human Data Layer for Web3 AI",
    description: "Connect your Web3 wallet securely to access your dashboard, complete quests, and verify your human contributor status inside the Digiverse.",
    siteName: "Digidrops",
    images: [
      {
        url: "https://digidrops.xyz/assets/login-og.webp",
        width: 1200,
        height: 630,
        alt: "Digidrops - Connect Wallet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect to Digidrops — The Human Data Layer for Web3 AI",
    description: "Connect your Web3 wallet securely to access your dashboard, complete quests, and verify your human contributor status inside the Digiverse.",
    creator: "@Digidrops_xyz",
    images: ["https://digidrops.xyz/assets/login-og.webp"],
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}