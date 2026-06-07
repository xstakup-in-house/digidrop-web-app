"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function CardBase({
  title,
  btn,
  delay,
}: {
  title: string;
  btn: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex items-center justify-center w-full"
    >
      <div className="bg-[linear-gradient(203.64deg,rgba(24,24,24,0.5)_9.95%,rgba(0,74,173,0.5)_50.53%,rgba(25,24,24,0.5)_90.05%)]
          text-white p-3 xs:p-4 sm:p-5 md:p-6 rounded-tl-[1.25rem] rounded-br-[1.25rem] sm:rounded-tl-[1.5rem] sm:rounded-br-[1.5rem] md:rounded-tl-[2rem] md:rounded-br-[2rem] shadow-lg
          transform hover:-translate-y-2
          transition-transform duration-300 ease-out w-full text-center"
      >
        <h2 className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-bold mb-1.5 xs:mb-2 sm:mb-3 md:mb-4 font-chakra tracking-wider">
          {title}
        </h2>
        <button
          className="px-2 py-1 xs:px-3 xs:py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 font-chakra bg-[rgba(161,118,214,0.14)]
            border border-white/30 text-gray-100 text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-semibold
            rounded-lg sm:rounded-xl shadow-lg backdrop-blur-md hover:bg-[rgba(109,87,14,0.49)]
            hover:scale-105 transition-all duration-300 ease-out w-full sm:w-auto whitespace-nowrap"
        >
          {btn}
        </button>
      </div>
    </motion.div>
  );
}

export default function Circular() {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <section className="relative w-full min-h-screen clip-path-v flex flex-col items-center justify-start lg:justify-center px-3 xs:px-4 pt-10 pb-24 xs:pb-28 sm:pb-36 overflow-x-hidden">
        {!videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover -z-10"
          >
            <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-[url('/assets/bg/home bg.webp')] bg-cover bg-no-repeat -z-20" />

        {/* ===== MOBILE (< 640px): single-column zigzag ===== */}
        <div className="flex flex-col items-center justify-evenly flex-1 w-full sm:hidden z-20 px-2 gap-3 xs:gap-4">

          <div className="w-[75%] xs:w-[80%] max-w-[280px] self-start">
            <CardBase title="DAILY LOGIN" btn="50 STARDUST" delay={0} />
          </div>

          <div className="w-[75%] xs:w-[80%] max-w-[280px] self-end">
            <CardBase title="MINT A GOLDEN PASS" btn="4X STARDUST" delay={0.8} />
          </div>

          <div className="w-[75%] xs:w-[80%] max-w-[280px] self-start">
            <CardBase title="REFER YOUR FRIEND" btn="100 STARDUST" delay={0.4} />
          </div>

          <div className="w-[75%] xs:w-[80%] max-w-[280px] self-end">
            <CardBase title="COMMUNITY REWARD" btn="UNLIMITED STARDUST" delay={1.2} />
          </div>

          <div className="w-[75%] xs:w-[80%] max-w-[280px] self-center">
            <CardBase title="MULTIPLE QUESTS" btn="MULTIPLE STARDUST" delay={0.6} />
          </div>
        </div>

        {/* ===== TABLET (640–1023px): 2-column flex evenly-spaced ===== */}
        <div className="hidden sm:flex sm:flex-col justify-evenly flex-1 w-full max-w-3xl lg:hidden z-20 px-4 gap-3">

          {/* Row 1: Daily + Mint */}
          <div className="flex gap-3 w-full">
            <div className="flex-1 min-w-0">
              <CardBase title="DAILY LOGIN" btn="50 STARDUST" delay={0} />
            </div>
            <div className="flex-1 min-w-0">
              <CardBase title="MINT A GOLDEN PASS" btn="4X STARDUST" delay={0.8} />
            </div>
          </div>

          {/* Row 2: Refer + Community */}
          <div className="flex gap-3 w-full">
            <div className="flex-1 min-w-0">
              <CardBase title="REFER YOUR FRIEND" btn="100 STARDUST" delay={0.4} />
            </div>
            <div className="flex-1 min-w-0">
              <CardBase title="COMMUNITY REWARD" btn="UNLIMITED STARDUST" delay={1.2} />
            </div>
          </div>

          {/* Row 3: Multiple — centered */}
          <div className="flex justify-center w-full">
            <div className="w-1/2 min-w-0">
              <CardBase title="MULTIPLE QUESTS" btn="MULTIPLE STARDUST" delay={0.6} />
            </div>
          </div>
        </div>

        {/* ===== DESKTOP (≥ 1024px): 4-column with stacked middle ===== */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-12 xl:gap-x-20 w-full max-w-7xl z-20">

          {/* Col 1 */}
          <div className="flex items-center justify-center">
            <CardBase title="DAILY LOGIN" btn="50 STARDUST" delay={0} />
          </div>

          {/* Col 2 wrapper: Mint + Refer stacked with big vertical gap */}
          <div className="flex flex-col justify-between lg:space-y-48">
            <CardBase title="MINT A GOLDEN PASS" btn="4X STARDUST" delay={0.8} />
            <CardBase title="REFER YOUR FRIEND" btn="100 STARDUST" delay={0.4} />
          </div>

          {/* Col 3 */}
          <div className="flex items-end justify-end lg:translate-x-12">
            <CardBase title="COMMUNITY REWARD" btn="UNLIMITED STARDUST" delay={1.2} />
          </div>

          {/* Col 4 */}
          <div className="flex items-start justify-start">
            <CardBase title="MULTIPLE QUESTS" btn="MULTIPLE STARDUST" delay={0.6} />
          </div>
        </div>
      </section>
    </>
  );
}
