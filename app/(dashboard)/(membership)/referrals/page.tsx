"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FaLink, 
  FaCheck, 
  FaWhatsapp, 
  FaFacebookF, 
  FaTelegram, 
  FaXTwitter 
} from "react-icons/fa6"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const REFERRAL_LINK = "https://digidrops.xyz/ref/user123";
const SHARE_TEXT = "Join me on Digi Drop and earn Stardust!";
const STARDUST_REWARD = 200;

const SOCIAL_PLATFORMS = [
  { name: "WhatsApp", color: "#25D366", icon: FaWhatsapp, id: "whatsapp" },
  { name: "Facebook", color: "#1877F2", icon: FaFacebookF, id: "facebook" },
  { name: "Telegram", color: "#229ED9", icon: FaTelegram, id: "telegram" },
  { name: "X", color: "#FFFFFF", icon: FaXTwitter, id: "x" },
] as const;

const ReferralSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard failed", err);
    }
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(`${SHARE_TEXT} ${REFERRAL_LINK}`);
    const url = encodeURIComponent(REFERRAL_LINK);
    
    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      x: `https://twitter.com/intent/tweet?text=${text}`,
    };

    if (links[platform]) {
      window.open(links[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-start bg-[url('/assets_icon/background.png')] bg-cover bg-center bg-no-repeat pt-20 pb-12 lg:pt-32 lg:pb-20">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left: Content Column */}
          <div className="flex flex-col items-center space-y-8 lg:items-start lg:space-y-12">
            
            {/* Header Text */}
            <header className="space-y-4 text-center lg:text-left">
              <h1 className=" max-w-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text bg-[200%_auto] py-2 text-4xl font-extrabold leading-[1.15] text-transparent animate-gradient sm:text-5xl md:text-7xl"
                         >
                REFER & GET STARDUST
              </h1>
              <p className="mx-auto max-w-xl font-chakra text-lg text-gray-200 m:4 lg:mx-0">
                Share your referral link with friends & {STARDUST_REWARD} Stardust for every recruit.
              </p>
            </header>

            {/* Referral Link Box */}
            <div className="flex w-full max-w-2xl items-stretch overflow-hidden rounded-xl border-2 border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-white/30">
              <div className="flex min-w-0 flex-1 items-center px-5 py-4">
                <span className="truncate font-chakra text-sm text-gray-300 md:text-base">
                  {REFERRAL_LINK}
                </span>
              </div>

              <Button
                onClick={handleCopy}
                className={cn(
                  "h-auto rounded-none px-6 py-4 font-chakra text-base font-bold transition-colors md:px-10",
                  copied ? "bg-green-600 hover:bg-green-700" : "bg-[#A176D6] hover:bg-[#8e61c7]"
                )}
              >
                {copied ? <FaCheck className="mr-2" /> : <FaLink className="mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            {/* Social Share Group */}
            <div className="flex w-full flex-col items-center space-y-6 lg:items-start">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Share link through
              </span>
              
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                {SOCIAL_PLATFORMS.map(({ id, name, icon: Icon, color }) => (
                  <Button
                    key={id}
                    size="icon"
                    onClick={() => handleShare(id)}
                    className="h-14 w-14 rounded-2xl bg-[#A176D6] transition-all hover:-translate-y-1 hover:bg-[#8e61c7] hover:shadow-lg hover:shadow-purple-500/40 md:h-16 md:w-16"
                    aria-label={`Share on ${name}`}
                  >
                    <Icon size={28} style={{ color }} />
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 inline-block rounded-full bg-white/5 px-6 py-2 backdrop-blur-sm border border-white/10">
                <p className="font-chakra text-xs font-bold text-gray-300 sm:text-sm">
                  No cap! Earn as much Stardust as possible
                </p>
              </div>
            </div>
          </div>

          {/* Right: Illustration (Hidden on mobile/tablet, visible on desktop) */}
          <div className="hidden items-center justify-center lg:flex lg:justify-end">
            <div className="relative w-full max-w-xl transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src="/assets_icon/Mask.png"
                alt="Referral rewards illustration"
                width={800}
                height={700}
                className="h-auto w-full drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReferralSection;