import React from "react";
import type { Metadata } from "next";
import ReferralsClient from "./ReferralsClient";

export const metadata: Metadata = {
  title: "Invite Friends & Earn Stardust | Digidrops",
  description: "Invite your friends to join Digidrops. For every friend who signs up and mints a Passport, you earn 100 Stardust instantly and they get 80 Stardust too! Let's build our Digiverse together.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digidrops.xyz/referrals",
    title: "Invite Friends & Earn Stardust | Digidrops",
    description: "Invite your friends to join Digidrops. For every friend who signs up and mints a Passport, you earn 100 Stardust instantly and they get 80 Stardust too! Let's build our Digiverse together.",
    siteName: "Digidrops",
    images: [
      {
        url: "https://digidrops.xyz/assets/referral-og.webp",
        width: 1200,
        height: 630,
        alt: "Digidrops - Referrals Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invite Friends & Earn Stardust | Digidrops",
    description: "Invite your friends to join Digidrops. For every friend who signs up and mints a Passport, you earn 100 Stardust instantly and they get 80 Stardust too! Let's build our Digiverse together.",
    creator: "@Digidrops_xyz",
    images: ["https://digidrops.xyz/assets/referral-og.webp"],
  },
};

export default function ReferralsPage() {
  return <ReferralsClient />;
}