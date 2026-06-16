"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  
  // Detect if user is in an active dashboard/membership session
  const isDashboardSession = pathname?.startsWith("/dashboard") || 
                             pathname?.startsWith("/mint-pass") || 
                             pathname?.startsWith("/referrals") || 
                             pathname?.startsWith("/leaderboard") || 
                             pathname?.startsWith("/profile");

  const termsLink = isDashboardSession ? "/dashboard/term-and-condition" : "/term-and-condition";
  const privacyLink = isDashboardSession ? "/dashboard/privacy-policy" : "/privacy-policy";
  const manifestoLink = isDashboardSession ? "/dashboard/manifesto" : "/manifesto";

  return (
    <footer className="w-full mt-8 border-t border-white/[0.03] bg-transparent">

      {/* Top Footer Row */}
      <div className="flex justify-center py-6 px-4">
        <div
          className="
            flex flex-col gap-6 text-gray-200
            md:flex-row md:items-center md:justify-between
            max-w-6xl w-full
          "
        >

          {/* Text links */}
          <div
            className="
              flex flex-col gap-4 text-gray-400 text-sm
              md:flex-row md:items-center md:gap-8
              text-center md:text-left
            "
          >
            <p className="tracking-wide">COPYRIGHT © {new Date().getFullYear() } DIGIDROPS</p>

            <Link href={termsLink} className="hover:text-white transition uppercase font-chakra">
              Terms and Conditions
            </Link>

            <Link href={privacyLink} className="hover:text-white transition uppercase font-chakra">
              Privacy Policy
            </Link>

            <Link href={manifestoLink} className="hover:text-white transition uppercase font-chakra">
              Manifesto
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex justify-center items-center gap-6">
            <Link href="https://twitter.com/Digidrops_xyz" target="_blank" aria-label="X (Twitter)">
              <FaTwitter className="text-xl hover:text-blue-400 transition transform hover:scale-110" />
            </Link>

            <Link href="https://facebook.com/Digidrops_xyz" target="_blank" aria-label="Facebook">
              <FaFacebook className="text-xl hover:text-blue-600 transition transform hover:scale-110" />
            </Link>

            <Link href="https://instagram.com/digidrops.xyz" target="_blank" aria-label="Instagram">
              <FaInstagram className="text-xl hover:text-pink-500 transition transform hover:scale-110" />
            </Link>

            <Link href="https://discord.com/invite/digidropsai" target="_blank" aria-label="Discord">
              <FaDiscord className="text-xl hover:text-indigo-500 transition transform hover:scale-110" />
            </Link>

            <Link href="https://t.me/DigidropsAI" target="_blank" aria-label="Telegram">
              <FaTelegram className="text-xl hover:text-sky-500 transition transform hover:scale-110" />
            </Link>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* Disclaimer */}
      <div className="px-4 py-4 text-center text-gray-400 text-sm leading-relaxed max-w-6xl mx-auto">
        Disclaimer: Digidrops Soulbound Tokens (SBTs) are non-transferable digital
        utility credentials used for platform access and identity. They have no
        market value, cannot be resold, and strictly represent membership within
        the community. The minting fee covers protocol maintenance and ecosystem
        development. This is a purchase of a digital good, not an investment
        contract.
      </div>

    </footer>
  );
};

export default Footer;
