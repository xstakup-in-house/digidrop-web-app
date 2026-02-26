import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-8 shadow-lg shadow-slate-300">

      {/* Top Footer Row */}
      <div className="flex justify-center py-4 px-4">
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
              flex flex-col gap-3 text-gray-400 text-sm
              md:flex-row md:items-center md:gap-6
              text-center md:text-left
            "
          >
            <p>COPYRIGHT © {new Date().getFullYear() } DIGIDROP</p>

            <Link href="/term-and-condition" className="hover:text-white transition">
              TERMS AND CONDITIONS
            </Link>

            <Link href="/privacy-policy" className="hover:text-white transition">
              PRIVACY POLICY
            </Link>
          </div>

          {/* Middle section */}
          <div
            className="
              flex flex-col gap-2 text-gray-400 text-sm
              md:flex-row md:items-center md:gap-4
              text-center
            "
          >
            <Link href="/manifesto" className="hover:text-white transition">
              MANIFESTO
            </Link>

          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-6">
            <Link href="https://twitter.com/Digidrops_xyz" target="_blank">
              <FaTwitter className="text-xl hover:text-blue-400 transition" />
            </Link>

            <Link href="https://facebook.com/Digidrops_xyz" target="_blank">
              <FaFacebook className="text-xl hover:text-blue-600 transition" />
            </Link>

            <Link href="https://instagram.com/Digidrops_xyz" target="_blank">
              <FaInstagram className="text-xl hover:text-pink-500 transition" />
            </Link>

            <Link href="https://discord.com/invite/Digidrops_xyz" target="_blank">
              <FaDiscord className="text-xl hover:text-indigo-500 transition" />
            </Link>

            <Link href="https://t.me/Digidrops_xyz" target="_blank">
              <FaTelegram className="text-xl hover:text-sky-500 transition" />
            </Link>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* Disclaimer */}
      <div className="px-4 py-4 text-center text-gray-400 text-sm leading-relaxed max-w-6xl mx-auto">
        Disclaimer: DigiDrop Soulbound Tokens (SBTs) are non-transferable digital
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





