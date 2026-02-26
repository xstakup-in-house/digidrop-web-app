'use client';

import React from "react";
import Image from "next/image";
import { Check, Star, Zap, Shield, Trophy, Rocket, Crown } from "lucide-react";
import PassActionButton from "../PassActionButton"; // Ensure this path is correct
import { DigiPass } from "@/types/response-type"; // Ensure this path matches your types

type Prop = {
  pass: DigiPass
}

// --- DYNAMIC THEME CONFIGURATION ---
// This helper function customizes the look based on the pass power/tier.
// It automatically switches colors and icons so you don't need hardcoded text.
const getPassTheme = (pass: DigiPass) => {
  // Logic: Multipliers >= 4x get the "Elite" (Purple/Gold) theme.
  // Lower multipliers get the "Standard" (Cyan/Blue) theme.
  const isHighTier = pass.point_power >= 4; 

  return {
    // VISUAL STYLES
    textColor: isHighTier ? "text-purple-400" : "text-cyan-400",
    gradientText: isHighTier 
      ? "from-purple-400 via-pink-500 to-yellow-500" 
      : "from-cyan-400 via-blue-500 to-indigo-500",
    glowColor: isHighTier ? "from-purple-600 to-pink-600" : "from-cyan-500 to-blue-600",
    bgGlow: isHighTier ? "bg-purple-500/20" : "bg-cyan-500/20",
    borderColor: isHighTier ? "group-hover:border-purple-500/30" : "group-hover:border-cyan-500/30",
    
    // DYNAMIC TEXT CONTENT
    perksTitle: `${pass.pass_type} Privileges`,
    statLabel: isHighTier ? "ELITE STATUS" : "MEMBER STATUS",
    statDesc: isHighTier 
      ? "Full ecosystem access\nPriority Support" 
      : "Community access\nDaily Missions",

    // DYNAMIC PERKS ICONS & LABELS
    perks: isHighTier 
      ? [
          { label: "Governance Voting Rights", icon: <Crown size={20} /> },
          { label: "Airdrop Multiplier Applied", icon: <Zap size={20} /> },
          { label: "VIP Discord Channel", icon: <Shield size={20} /> },
        ]
      : [
          { label: "Regular Platform Access", icon: <Rocket size={20} /> },
          { label: "Community Badge", icon: <Trophy size={20} /> },
          { label: "Basic Voting Power", icon: <Check size={20} /> },
        ],
  };
};

export default function PassDetailClient({ pass }: Prop) {
  const theme = getPassTheme(pass);

  // Reusable CSS class for the side glass panels
  const glassPanelClass = `relative flex flex-col items-center justify-center w-full h-full min-h-[300px] bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl overflow-hidden group ${theme.borderColor} transition-all duration-300`;

  return (
    <div className='w-full min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a2c55] via-[#0b1026] to-[#000000] text-white selection:bg-brandColor/30'>
      
      {/* Background Noise Texture for cinematic feel */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className='relative container mx-auto flex flex-col items-center py-12 px-4 z-10'>
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16 space-y-4">
        
          
          {/* Main Title */}
          <h1 className='text-5xl md:text-7xl font-bold font-chakra uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 drop-shadow-lg'>
            {pass.name}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-400 font-medium tracking-wide">
             Mint your <span className={`font-bold ${theme.textColor}`}>Soul-Bound</span> Access Pass
          </p>
        </div>

        {/* --- MAIN CONTENT GRID (3 Columns) --- */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl items-center mb-16'>
          
          {/* 1. LEFT PANEL: Stats & Multiplier */}
          <div className='lg:col-span-3 order-2 lg:order-1 h-full'>
            <div className={glassPanelClass}>
              <div className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">Power Level</div>
              
              <div className="flex flex-col items-center">
                {/* Huge Number with Gradient */}
                <span className={`text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${theme.gradientText} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                  {pass.point_power}x
                </span>
                <span className={`text-2xl font-bold tracking-widest mt-2 uppercase ${theme.textColor} opacity-80`}>Multiplier</span>
              </div>

              {/* Animated Stars based on power level (Max 5 stars) */}
              <div className="flex gap-2 mt-6 mb-4">
                {Array.from({ length: Math.min(pass.point_power, 5) }).map((_, i) => (
                  <Star key={i} size={16} className={`${theme.textColor} fill-current animate-pulse`} style={{animationDelay: `${i * 200}ms`}} />
                ))}
              </div>

              <div className="text-center text-sm text-gray-300 font-medium leading-relaxed whitespace-pre-line">
                {theme.statLabel}<br/>
                <span className="text-gray-500 text-xs">{theme.statDesc}</span>
              </div>
            </div>
          </div>

          {/* 2. CENTER PANEL: Hero Card Image */}
          <div className='lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center relative py-6'>
            {/* Background Glow Halo */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] ${theme.bgGlow} rounded-full blur-[80px] pointer-events-none`}></div>
            
            {/* 3D Floating Image Effect */}
            <div className="relative z-10 transform transition-all duration-500 hover:scale-105 hover:rotate-1 perspective-1000">
              <Image 
                src={pass.card} 
                alt={pass.name} 
                width={420} 
                height={600}
                className="w-full max-w-[320px] md:max-w-[380px] h-auto rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                priority
              />
            </div>
            
            {/* Floating Price Tag */}
            <div className="mt-8 py-2 px-8 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-gray-400 text-xs font-bold tracking-widest mr-3">PRICE</span>
              <span className="text-2xl font-bold text-white">${pass.usd_price}</span>
            </div>
          </div>

        
          

        </div>
        
        {/* --- FOOTER ACTION SECTION --- */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 mt-4">
           {/* Button Container with Animated Glow */}
           <div className="w-full relative group">
              
              <div className="relative">
                 <PassActionButton pass={pass} />
              </div>
           </div>
           
           {/* Footer Disclaimer */}
                <div className="mt-auto pt-16 w-full">
                    <p className="mx-auto max-w-3xl rounded-xl border border-white/5 bg-black/60 p-4 text-center text-xs leading-relaxed text-gray-300 backdrop-blur-md sm:text-sm">
                       SB Passports are non-transferable community credentials used to access Digiverse. They hold no external monetary value.
                    </p>
                </div>
        </div>
        
      </div>
    </div>
  );
}