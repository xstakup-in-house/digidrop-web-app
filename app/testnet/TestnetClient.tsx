'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DigiIllustration } from "@/components/visuals/DigiIllustration";
import { Shield } from "lucide-react";

// Dynamically import the form with SSR disabled
const OnboardingForm = dynamic(() => import('@/components/forms/OnboardingForm'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-white/[0.02] animate-pulse rounded-2xl border border-white/5" />
});

// Enhanced Galaxy Background Component
const GalaxyBackground = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="fixed inset-0 bg-transparent" />;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-transparent">
      {/* Deep Space Gradients (Nebulae) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/15 blur-[160px] rounded-full animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/15 blur-[160px] rounded-full animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute top-[30%] right-[5%] w-[40%] h-[40%] bg-emerald-500/5 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '20s' }} />
      <div className="absolute middle-[50%] left-[20%] w-[30%] h-[30%] bg-blue-400/5 blur-[100px] rounded-full" />
      
      {/* Star Layer 1 - Static distant stars */}
      <div className="absolute inset-0 opacity-40" style={{ 
        backgroundImage: `
          radial-gradient(1px 1px at 25px 35px, white, rgba(0,0,0,0)), 
          radial-gradient(1.5px 1.5px at 50px 100px, white, rgba(0,0,0,0)), 
          radial-gradient(1px 1px at 80px 150px, #60A5FA, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 150px 200px, white, rgba(0,0,0,0))
        `, 
        backgroundSize: '250px 250px' 
      }} />
      
      {/* Star Layer 2 - Moving pioneers */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{ 
            x: Math.random() * 2000 - 1000, 
            y: Math.random() * 2000 - 1000,
            opacity: Math.random() * 0.6 + 0.2,
            scale: Math.random() * 0.8 + 0.2
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() > 0.8 ? '2px' : '1px',
            height: Math.random() > 0.8 ? '2px' : '1px',
            backgroundColor: Math.random() > 0.7 ? '#60A5FA' : 'white',
            boxShadow: Math.random() > 0.9 ? '0 0 4px white' : 'none'
          }}
        />
      ))}

      {/* Galaxy Core Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-60" />
    </div>
  );
};

function Typewriter({ text, delay = 100, startDelay = 600, loopInterval = 10000 }: { text: string; delay?: number; startDelay?: number; loopInterval?: number }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
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

export default function TestnetClient() {
  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30 font-chakra cosmic-deck flex flex-col">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/assets/noise.svg')] opacity-40 pointer-events-none mix-blend-overlay z-[1]" />
      <GalaxyBackground />

      {/* Centered Header Logo with Slight Left Offset */}
      <header className="w-full h-16 flex items-center justify-center relative z-20">
        <img
          src="/assets/logo.png"
          alt="Digi Drop Logo"
          className="h-6 sm:h-7 w-auto object-contain -translate-x-3 sm:-translate-x-4"
        />
      </header>

      <main className="relative z-10 max-w-lg mx-auto px-6 pb-12 flex flex-col items-center justify-center flex-grow">
        {/* Header & Illustration Backdrop Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full text-center mb-12 py-12"
        >
          {/* Illustration as a Background Layer */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none scale-125">
            <DigiIllustration />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400"
            >
              <Shield className="w-3 h-3" />
              Testnet Phase 1 Live
            </motion.div>
            
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gradient leading-[1.1] min-h-[2.2em] sm:min-h-[2.2em]">
                Welcome to the <br /> <Typewriter text="Digiverse." />
              </h1>
            </div>
            
            <p className="text-slate-400 text-lg max-w-[400px] mx-auto leading-relaxed font-light font-ui">
              You're among the first pioneers to touch down. Test our systems and help us build the future of decentralized intelligence.
            </p>
          </div>
        </motion.div>

        {/* Form Section - Client Side Only */}
        <OnboardingForm />

        <footer className="mt-12 text-[10px] text-slate-600 text-center space-y-4 font-ui">
          <p>© 2026 DigiDrops. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.digidrops.xyz/privacy-policy" className="hover:text-blue-400">Privacy</a>
            <a href="https://www.digidrops.xyz/term-and-condition" className="hover:text-blue-400">Terms</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
