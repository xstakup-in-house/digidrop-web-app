"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaCheck, FaLink } from "react-icons/fa";
import { 
  TbBrandWhatsapp, 
  TbBrandFacebook, 
  TbBrandTelegram, 
  TbBrandX 
} from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserProfile";
import { motion, Variants } from "framer-motion";

const SHARE_TEXT = "Join me on Digi Drop and earn Stardust!";
const STARDUST_REWARD = 200;

const SOCIAL_PLATFORMS = [
  {  name: "WhatsApp", color: "#25D366", icon: TbBrandWhatsapp,  id: "whatsapp" },
  {  name: "Facebook", color: "#1877F2", icon: TbBrandFacebook,  id: "facebook" },
  {  name: "Telegram", color: "#229ED9", icon: TbBrandTelegram, id: "telegram" },
  { name: "X",  color: "#FFFFFF", icon: TbBrandX,  id: "x"  },
] as const;

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};


const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0, x: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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
    <section className="relative flex min-h-screen w-full items-center bg-[url('/assets/background.jpg')] bg-cover bg-center bg-no-repeat py-32 lg:py-40">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          
          {/* Left: Content Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center lg:items-start"
          >
            
            {/* --- 1. HEADER SECTION --- */}
            <motion.header variants={itemVariants} className="mb-12 text-center lg:text-left">
              <h1 className="max-w-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text py-2 text-4xl font-extrabold leading-tight text-transparent animate-gradient sm:text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                SIGNAL PROPAGATION BEACON
              </h1>
              <p className="mx-auto mt-6 max-w-lg font-chakra text-md leading-relaxed text-gray-300 lg:mx-0">
                Establish your celestial link. Broadcast your unique transmission frequency to guide recruits through the void & accumulate <span className="font-bold text-yellow-400">{STARDUST_REWARD} Stardust units</span> for every pilot that docks.
              </p>
            </motion.header>

            {/* --- 2. LINK BOX --- */}
            <motion.div variants={itemVariants} className="mb-16 w-full max-w-xl">
              <div className={cn(
                "flex w-full items-stretch overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-500",
                copied 
                  ? "border-green-500 bg-green-950/25 shadow-[0_0_35px_rgba(34,197,94,0.35)]" 
                  : "border-purple-500/25 bg-black/60 hover:border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.05)]"
              )}>
                <div className="flex min-w-0 flex-1 items-center px-4 py-4 md:px-6">
                  <span className="truncate font-chakra text-sm font-mono text-blue-400 md:text-base">
                    {refLink}
                  </span>
                </div>

                <Button
                  onClick={handleCopy}
                  className={cn(
                    "h-auto rounded-none px-6 py-4 font-chakra text-base font-bold transition-all duration-300 md:px-8",
                    copied 
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]" 
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {copied ? <FaCheck className="mr-2 animate-bounce" /> : <FaLink className="mr-2" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </motion.div>

            {/* --- 3. SOCIAL SECTION --- */}
            <motion.div variants={itemVariants} className="flex w-full flex-col items-center lg:items-start">
              
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 font-mono">
                BROADCAST SECTOR SIGNAL THROUGH
              </span>
              
              <div className="mb-12 mt-6 flex flex-wrap justify-center gap-6 lg:justify-start">
                {SOCIAL_PLATFORMS.map(({ id, name, icon: Icon, color }, idx) => (
                  <motion.div
                    key={id}
                    animate={{
                      y: [0, -6, 0]
                    }}
                    transition={{
                      duration: 3 + (idx * 0.4),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.15
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 30px ${color}55`
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-2xl"
                  >
                    <Button
                      size="icon"
                      onClick={() => handleShare(id)}
                      className="group relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:h-20 md:w-20"
                      aria-label={`Share on ${name}`}
                    >
                      <div 
                        className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"
                        style={{ backgroundColor: color }} 
                      />
                      <Icon 
                        className="relative z-10 h-8 w-8 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] md:h-10 md:w-10"
                        style={{ color: color }} 
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              {/* Added 'mt-4' (or just reliance on the mb-16 above) */}
              <motion.div variants={itemVariants} className="inline-block rounded-full bg-white/5 px-8 py-3 backdrop-blur-sm border border-white/10">
                <p className="font-chakra text-sm font-bold text-gray-300 sm:text-base">
                  No cap! Earn as much Stardust as possible 
                </p>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
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