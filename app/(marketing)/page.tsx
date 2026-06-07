"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"

// Component Imports
import Circular from "./_components/Circular"
import ServiceSection from "./_components/service-section"
import BrandSupport from "./_components/brand-section"
import FAQ from "./_components/faq-section"
import LogoMark from "./_components/logo-mark"

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
}

function Typewriter({ text, delay = 100, startDelay = 600, loopInterval = 10000 }: { text: string; delay?: number; startDelay?: number; loopInterval?: number }) {
  const [currentText, setCurrentText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  React.useEffect(() => {
    if (!started) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setCurrentText("");
        setCurrentIndex(0);
      }, loopInterval);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, delay, text, started, loopInterval]);

  return <>{currentText}</>;
}

export default function Home() {
  // Generate 35 twinkling stars in random coordinates
  const stars = React.useMemo(() => {
    return Array.from({ length: 35 }).map((_, idx) => ({
      id: idx,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 4}s`,
    }));
  }, []);

  return (
    <main className="flex min-h-screen flex-col font-chakra overflow-x-hidden cosmic-deck">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/assets/noise.svg')] opacity-40 pointer-events-none mix-blend-overlay z-[1]" />
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full px-4 pb-16 pt-12 sm:px-6 md:pb-24 lg:px-8 bg-gradient-to-b from-[#1a0e3a] via-[#09154a] to-[#0B0B0B]">
        
        {/* Twinkling Star Particles Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star-particle bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center relative z-10">
          
          {/* Subheading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-4 mt-6 sm:mt-8 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm border border-blue-500/25"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-blue-400 sm:text-base">
              Season 1 is live
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text bg-[200%_auto] py-2 text-4xl font-extrabold leading-[1.15] text-transparent animate-gradient sm:text-5xl md:text-7xl drop-shadow-[0_0_35px_rgba(168,85,247,0.15)]"
          >
            Prove You're Human. <br className="hidden sm:block" /> <Typewriter text="Secure Your Future." />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-gray-300 sm:text-lg md:text-xl"
          >
            Mint your Soulbound Passport on BNB Chain, complete quests, and climb the leaderboard.
            Build your verified reputation today to unlock the decentralized AI gig economy of tomorrow.
          </motion.p>

          {/* Pass Images Grid (Mobile First Layout with Holographic Effects) */}
          <div className="mt-12 grid w-full max-w-5xl grid-cols-3 items-end gap-2 sm:gap-6 md:gap-8">
            
            {/* Left Card (Black) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-end pb-2 sm:pb-4 holo-card-hover"
            >
              <div className="holo-card-shine rounded-2xl transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <Image
                  src="/assets_icon/blackpass.webp"
                  alt="Black Passport"
                  width={294}
                  height={460}
                  className="w-full max-w-[100px] object-contain transition-transform hover:scale-105 sm:max-w-[180px] md:max-w-[260px]"
                />
              </div>
            </motion.div>

            {/* Middle Card (Golden) - Hero */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              transition={{ delay: 0.6 }}
              className="relative z-10 flex justify-center pb-2 sm:pb-4 holo-card-hover"
            >
              <div className="relative holo-card-shine rounded-2xl transition-all duration-300 hover:drop-shadow-[0_0_40px_rgba(234,179,8,0.45)]">
                {/* Glow Effect behind main card */}
                <div className="absolute inset-0 -z-10 bg-purple-500/30 blur-2xl" />
                <Image
                  src="/assets_icon/goldpass.webp"
                  alt="Gold Passport"
                  width={294}
                  height={460}
                  priority
                  className="w-full max-w-[110px] object-contain transition-transform hover:scale-105 sm:max-w-[198px] md:max-w-[286px]"
                />
              </div>
            </motion.div>

            {/* Right Card (White) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-start pb-2 sm:pb-4 holo-card-hover"
            >
              <div className="holo-card-shine rounded-2xl transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <Image
                  src="/assets_icon/whitepass.webp"
                  alt="White Passport"
                  width={294}
                  height={460}
                  className="w-full max-w-[100px] object-contain transition-transform hover:scale-105 sm:max-w-[180px] md:max-w-[260px]"
                />
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-col items-center gap-4 md:mt-14"
          >
            <Button
              asChild
              className="group relative h-auto overflow-hidden rounded-xl border border-purple-500/50 bg-gray-900/80 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] backdrop-blur-md transition-all hover:scale-105 hover:border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] sm:text-lg"
            >
              <Link href="/login" className="flex items-center gap-2">
                <span className="tracking-wide">Mint Your Passport</span>
              </Link>
            </Button>

            <div className="text-center">
              <p className="text-[11px] font-semibold tracking-widest text-gray-400/80 uppercase sm:text-xs">
                Powered by BNB Chain
              </p>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ===== OTHER SECTIONS ===== */}
      <div className="relative z-10 pb-20">
        {/*
          The pattern-bg wrapper sits BEHIND the Circular sky-bg.
          Where clip-path-v cuts away the bottom of the sky-bg (the V notch),
          the pattern-bg shows through — creating a seamless bleed into ServiceSection.
        */}
        <div className="bg-[url('/assets/bg/pattern%20bg.webp')] bg-cover bg-center bg-[#1C1C1C]/90 bg-blend-multiply">
          <Circular />
          <ServiceSection />
        </div>
        <BrandSupport />
        <FAQ />
        <LogoMark />
      </div>
    </main>
  )
}