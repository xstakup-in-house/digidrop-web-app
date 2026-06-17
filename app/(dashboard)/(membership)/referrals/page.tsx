"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaLink, FaWhatsapp, FaFacebook, FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserProfile";
import { useProfileStats } from "@/hooks/useGetProfileStats";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";

const SHARE_TEXT = "Join me on Digidrops the human layer on web3. lets build our digiverse and earn unlimited stardust.";
const STARDUST_REWARD = 100;

const SOCIAL_PLATFORMS = [
  { name: "WhatsApp", color: "#25D366", icon: FaWhatsapp, id: "whatsapp" },
  { name: "Facebook", color: "#1877F2", icon: FaFacebook, id: "facebook" },
  { name: "Telegram", color: "#229ED9", icon: FaTelegram, id: "telegram" },
  { name: "X", color: "#FFFFFF", icon: FaTwitter, id: "x" },
  { name: "Discord", color: "#5865F2", icon: FaDiscord, id: "discord" },
] as const;

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.05, duration: 0.55, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 65, damping: 13 },
  },
};

const ReferralSection = () => {
  const storedLink = useUserStore((state) => state.referralLink);
  const profile = useUserStore((state) => state.profile);
  const [refLink, setRefLink] = useState("https://digidrops.xyz/loading...");
  
  useEffect(() => {
    if (profile?.referral_code) {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://digidrops.xyz";
      setRefLink(`${origin}/login?ref=${profile.referral_code}`);
    } else if (storedLink) {
      setRefLink(storedLink);
    }
  }, [profile, storedLink]);

  const { data: apiData, isLoading } = useProfileStats();
  const [copied, setCopied] = useState(false);

  const referralCount = apiData?.referral_count ?? 0;
  const stardustAccumulated = referralCount * STARDUST_REWARD;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(refLink);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
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
      discord: `https://discord.com/channels/@me`,
    };

    if (platform === "discord") {
      navigator.clipboard.writeText(refLink).then(() => {
        toast.success("Referral link copied! Paste it in your Discord chat.");
      });
    }

    if (links[platform]) {
      window.open(links[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section 
      style={{ backgroundImage: "url('/assets/bg/referal%20bg.webp')" }}
      className="relative flex min-h-screen w-full flex-col items-center justify-start bg-[#0B0B0B] bg-cover bg-fixed bg-center bg-no-repeat pt-4 sm:pt-6 pb-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />

      {/* Noise overlay for premium texture */}
      <div className="fixed inset-0 bg-[url('/assets/noise.svg')] opacity-15 pointer-events-none mix-blend-overlay" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start pt-6">
        
        {/* Sub-Navigation Links */}
        <div className="flex justify-between items-center w-full max-w-5xl mb-6">
          <Link href="/leaderboard" className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-[10px] sm:text-xs uppercase font-extrabold bg-black/50 border border-white/10 hover:border-white/20 transition-all text-white font-chakra backdrop-blur-md">
            ← Leaderboard
          </Link>
          <Link href="/dashboard" className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-[10px] sm:text-xs uppercase font-extrabold bg-black/50 border border-white/10 hover:border-white/20 transition-all text-white font-chakra backdrop-blur-md">
            Dashboard →
          </Link>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
        >
          
          {/* --- 1. HEADER SECTION --- */}
          <motion.header variants={itemVariants} className="space-y-6 text-center lg:text-left flex-1 max-w-xl">
            <h1 className="text-landing-gradient py-1.5 text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(168,85,247,0.18)] font-chakra">
              SHARE AND GATHER UNLIMITED STARDUST
            </h1>
            <p className="mx-auto lg:mx-0 max-w-xl text-sm sm:text-base leading-relaxed text-gray-300">
              Invite your friends to join Digidrops. For every friend who signs up and mints a Passport, you earn <span className="font-bold text-yellow-400 font-chakra">{STARDUST_REWARD} Stardust</span> instantly. There is no limit to how much you can accumulate!
            </p>
            {/* BOTTOM MOTIVATIONAL BANNER relocated inside header or at the bottom */}
            <div className="hidden lg:block pt-4">
              <div className="inline-block rounded-full bg-white/5 px-6 py-2.5 backdrop-blur-sm border border-white/10 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors">
                Broadcast your link now to climb the leaderboard rankings.
              </div>
            </div>
          </motion.header>

          {/* --- 2. THE UNIFIED REFERRAL ACTION CARD --- */}
          <motion.div 
            variants={itemVariants} 
            className="w-full flex-1 max-w-xl relative group rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-purple-500/20"
          >
            {/* Background radial highlight */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-purple-600/10 blur-[80px] group-hover:bg-purple-600/15 transition-all duration-500" />
            
            <div className="relative space-y-6">
              
              {/* Embedded Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                {/* Metric Card 1: Active Recruits */}
                <div className="relative group/metric overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-3 sm:p-4 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-500/30">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-landing-gradient opacity-50 group-hover/metric:opacity-100 transition-opacity" />
                  
                  {/* Premium Game Icon 11.webp */}
                  <div className="relative h-8 w-8 mb-2 group-hover/metric:scale-110 transition-transform duration-300">
                    <Image 
                      src="/assets_icon/11.webp" 
                      alt="Friends recruited icon" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  
                  <span className="text-lg sm:text-2xl font-black text-white font-chakra">
                    {isLoading ? "..." : referralCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">
                    Friends Recruited
                  </span>
                </div>

                {/* Metric Card 2: Accumulated Rewards */}
                <div className="relative group/metric overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-3 sm:p-4 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-500/30">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-landing-gradient opacity-50 group-hover/metric:opacity-100 transition-opacity" />
                  
                  {/* Premium Game Icon 7.webp */}
                  <div className="relative h-8 w-8 mb-2 group-hover/metric:scale-110 transition-transform duration-300">
                    <Image 
                      src="/assets_icon/7.webp" 
                      alt="Stardust reward icon" 
                      fill 
                      className="object-contain animate-pulse"
                    />
                  </div>
                  
                  <span className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-chakra">
                    {isLoading ? "..." : stardustAccumulated}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">
                    Stardust Earned
                  </span>
                </div>
              </div>

              {/* Copy Box Title */}
              <div className="text-center sm:text-left space-y-1 pt-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Your Personal Referral Link
                </h3>
                <p className="text-xs text-gray-400">
                  Copy and share this link to start collecting Stardust.
                </p>
              </div>

              {/* Link Input and Copy Button (100% fluid & mobile responsive layout) */}
              <div className={cn(
                "flex flex-col sm:flex-row w-full items-stretch overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-500",
                copied 
                  ? "border-green-500 bg-green-950/25 shadow-[0_0_35px_rgba(34,197,94,0.35)]" 
                  : "border-white/10 bg-black/40 hover:border-purple-500/30"
              )}>
                <div className="flex min-w-0 flex-1 items-center px-4 py-4 md:px-6 justify-center sm:justify-start">
                  <span className="truncate font-mono text-sm text-blue-400 md:text-base font-semibold">
                    {refLink}
                  </span>
                </div>

                <Button
                  onClick={handleCopy}
                  className={cn(
                    "h-auto rounded-none py-3.5 px-6 sm:px-8 font-chakra text-base font-bold transition-all duration-300 border-t sm:border-t-0 sm:border-l border-white/10",
                    copied 
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]" 
                      : "btn-landing-gradient"
                  )}
                >
                  {copied ? <FaCheck className="mr-2 animate-bounce" /> : <FaLink className="mr-2" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              {/* Divider separating Link and Sharing Options */}
              <div className="h-px w-full bg-white/10 my-4" />

              {/* Integrated Social Share Section (Centered text and logos) */}
              <div className="flex flex-col space-y-4 items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 font-mono block text-center">
                  Share directly via social media
                </span>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {SOCIAL_PLATFORMS.map(({ id, name, icon: Icon, color }) => (
                    <motion.div
                      key={id}
                      whileHover={{ 
                        scale: 1.08,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl"
                    >
                      <Button
                        size="icon"
                        onClick={() => handleShare(id)}
                        className="group relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                        aria-label={`Share on ${name}`}
                      >
                        <div 
                          className="absolute inset-0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-15"
                          style={{ backgroundColor: color }} 
                        />
                        <Icon 
                          className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:scale-110"
                          style={{ color: color }} 
                        />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>

        {/* Mobile motivational banner */}
        <motion.div variants={itemVariants} className="w-full text-center mt-10 lg:hidden">
          <div className="inline-block rounded-full bg-white/5 px-8 py-3 backdrop-blur-sm border border-white/10 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors">
            Broadcast your link now to climb the leaderboard rankings.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralSection;