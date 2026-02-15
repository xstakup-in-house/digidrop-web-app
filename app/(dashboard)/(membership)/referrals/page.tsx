"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  TbBrandWhatsapp, 
  TbBrandFacebook, 
  TbBrandTelegram, 
  TbBrandX 
} from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserProfile";
import { motion } from "framer-motion"; 

const SHARE_TEXT = "Join me on Digi Drop and earn Stardust!";
const STARDUST_REWARD = 200;
 

const SOCIAL_PLATFORMS = [
  {  name: "WhatsApp", color: "#25D366", icon: TbBrandWhatsapp,  id: "whatsapp" },
  {  name: "Facebook", color: "#1877F2", icon: TbBrandFacebook,  id: "facebook" },
  {  name: "Telegram", color: "#229ED9", icon: TbBrandTelegram, id: "telegram" },
  { name: "X",  color: "#FFFFFF", icon: TbBrandX,  id: "x"  },
] as const;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect for child elements
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50 } 
  },
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0, x: 50 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const ReferralSection = () => {
  const refLink = useUserStore((state) => state.referralLink) || "https://digidrops.xyz/loading...";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard failed", err);
    }
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(`${SHARE_TEXT} ${refLink}`);
    const url = encodeURIComponent(refLink);
    
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
    <section className="relative flex min-h-screen w-full items-start bg-[url('/assets/background.jpg')] bg-cover bg-center bg-no-repeat pt-24 pb-20 lg:pt-40 lg:pb-32">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Left: Content Column (Animated) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center space-y-12 lg:items-start lg:space-y-16"
          >
            
            {/* Header Text */}
            <motion.header variants={itemVariants} className="space-y-6 text-center lg:text-left">
              <h1 className="max-w-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text bg-[200%_auto] py-2 text-4xl font-extrabold leading-[1.15] text-transparent animate-gradient sm:text-5xl md:text-7xl">
                REFER & GET STARDUST
              </h1>
              <p className="mx-auto max-w-xl font-chakra text-lg text-gray-200 lg:mx-0">
                Share your referral link with friends & get <span className="font-bold text-yellow-400">{STARDUST_REWARD} Stardust</span> for every recruit.
              </p>
            </motion.header>

            {/* Referral Link Box */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl">
              <div className="flex w-full items-stretch overflow-hidden rounded-xl border-2 border-white/10 bg-black/40 backdrop-blur-lg transition-colors hover:border-white/30">
                <div className="flex min-w-0 flex-1 items-center px-5 py-5 md:py-6">
                  <span className="truncate font-chakra text-sm text-gray-300 md:text-base">
                    {refLink}
                  </span>
                </div>

                <Button
                  onClick={handleCopy}
                  className={cn(
                    "h-auto rounded-none px-6 py-5 font-chakra text-base font-bold transition-all md:px-10",
                    copied 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-[#A176D6] hover:bg-[#8e61c7] text-white"
                  )}
                >
                  {copied ? <FaCheck className="mr-2" /> : <FaLink className="mr-2" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </motion.div>

            {/* Social Share Group */}
            <motion.div variants={itemVariants} className="flex w-full flex-col items-center space-y-8 lg:items-start">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Share link through
              </span>
              
              {/* GLASSMORPHISM BUTTONS */}
              <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                {SOCIAL_PLATFORMS.map(({ id, name, icon: Icon, color }) => (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.05, y: -5 }} // Physics-based hover
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="icon"
                      onClick={() => handleShare(id)}
                      className="group relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl md:h-20 md:w-20"
                      aria-label={`Share on ${name}`}
                    >
                      {/* Dynamic Hover Glow */}
                      <div 
                        className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"
                        style={{ backgroundColor: color }} 
                      />

                      {/* Icon */}
                      <Icon 
                        className="relative z-10 h-10 w-10 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] md:h-12 md:w-12"
                        style={{ color: color }} 
                      />
                      
                      {/* Glass Highlight */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="mt-6 inline-block rounded-full bg-white/5 px-8 py-3 backdrop-blur-sm border border-white/10">
                <p className="font-chakra text-sm font-bold text-gray-300 sm:text-base">
                  No cap! Earn as much Stardust as possible 
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Illustration (Lazy Loaded + Animated) */}
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="hidden items-center justify-center lg:flex lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/assets_icon/Mask.png"
                alt="Referral rewards illustration"
                width={800}
                height={800}
                loading="lazy" 
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ReferralSection;