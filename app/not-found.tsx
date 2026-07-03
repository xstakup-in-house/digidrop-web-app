'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Footer from '@/components/common/footer';

export default function NotFound() {
  // Generate random twinkling stars backdrop
  const stars = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, idx) => ({
      id: idx,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 4}s`,
    }));
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#1a0e3a] via-[#09154a] to-[#0B0B0B] text-gray-100 font-chakra">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/assets/noise.svg')] opacity-40 pointer-events-none mix-blend-overlay z-[1]" />
      
      {/* Galaxy Nebulae Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[70%] h-[70%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Twinkling Star Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-particle bg-white absolute"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: '2s',
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-lg">
          {/* Floating Logo/Orb */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 -z-10 bg-purple-500/30 blur-2xl rounded-full" />
            <img
              src="/assets/logo.png"
              alt="Digidrops Logo"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            />
          </motion.div>

          {/* 404 Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
              404
            </h1>
          </motion.div>

          {/* Error Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4"
          >
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-gray-200">
              Lost in Space
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-sm mx-auto">
              Find your way back home. The coordinates you entered do not exist or have drifted away into the void.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8"
          >
            <Button
              asChild
              className="group relative h-auto overflow-hidden rounded-xl border border-purple-500/50 bg-gray-900/80 px-8 py-3.5 text-base font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] backdrop-blur-md transition-all hover:scale-105 hover:border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)]"
            >
              <Link href="/">
                Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  );
}
