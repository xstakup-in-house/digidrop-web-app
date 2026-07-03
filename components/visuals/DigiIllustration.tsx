'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function DigiIllustration() {
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<{ left: string; top: string; delay: number; xOffset: number; duration: number }[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const newStars = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      xOffset: (Math.random() - 0.5) * 50,
      duration: 4 + Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center overflow-hidden">
      {/* Dynamic Starfield Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted && stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-30"
            style={{ left: star.left, top: star.top }}
            animate={{
              y: [0, -80],
              opacity: [0, 0.7, 0],
              x: [0, star.xOffset],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 filter drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]"
      >
        <defs>
          <linearGradient id="shipGradient" x1="100" y1="40" x2="100" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="1" stopColor="#7C3AED" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* The Vanguard Main Ship */}
        <motion.g
          animate={{
            y: [0, -8, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Main Body */}
          <path
            d="M100 40L130 130L100 120L70 130L100 40Z"
            fill="url(#shipGradient)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          {/* Core Engine Glow */}
          <motion.circle
            cx="100"
            cy="115"
            r="4"
            fill="#60A5FA"
            filter="url(#glow)"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          {/* Detail Lines */}
          <path d="M100 45V110" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
          <path d="M85 110L115 110" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
        </motion.g>

        {/* Small Escort Rocket 1 */}
        <motion.g
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <path
            d="M60 140L70 165L60 160L50 165L60 140Z"
            fill="white"
            fillOpacity="0.1"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <circle cx="60" cy="158" r="1.5" fill="#10B981" opacity="0.6" />
        </motion.g>

        {/* Small Escort Rocket 2 */}
        <motion.g
          animate={{
            y: [0, -20, 0],
            x: [0, 12, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <path
            d="M140 80L150 105L140 100L130 105L140 80Z"
            fill="white"
            fillOpacity="0.1"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <circle cx="140" cy="98" r="1.5" fill="#60A5FA" opacity="0.6" />
        </motion.g>

        {/* Digital Exhaust Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            r="1"
            fill="white"
            fillOpacity="0.4"
            initial={{ cx: 100, cy: 125, opacity: 0 }}
            animate={{
              cy: [125, 170],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5],
              cx: [100, 100 + (Math.random() - 0.5) * 20]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>

      {/* Floating UI Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-12 h-12 border border-white/5 rounded-lg rotate-45 backdrop-blur-sm"
        animate={{ rotate: [45, 90, 45], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-8 h-8 border border-white/5 rounded-full backdrop-blur-sm"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  );
}
