"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Animation helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true },
})

// Single Card Component
const BCard = ({
  icon,
  heading,
  text,
  delay,
}: {
  icon: React.ReactNode
  heading: string
  text: string
  delay: number
}) => {
  return (
    <motion.div
      // Spread the fadeUp object directly for cleaner code
      {...fadeUp(delay)}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <div className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-[#1C1C1C] p-8 text-center transition-all duration-300 hover:border-gray-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
        
        {/* Icon - Consistent Height Container */}
        <div className="mb-6 flex h-[140px] w-full items-center justify-center">
          {icon}
        </div>

        {/* Heading and Text */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold uppercase tracking-wide text-white">
            {heading}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 transition-colors group-hover:text-gray-200">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Main Benefit Section
const BenefitSection: React.FC = () => {
  const cards = [
    {
      icon: (
        <Image
          src="/assets_icon/22.png"
          alt="Cosmic Curiosity"
          width={120}
          height={120}
          className="h-auto w-auto object-contain drop-shadow-lg"
        />
      ),
      heading: "Cosmic Curiosity",
      text: "Mint a one of a kind Passport to unlock an ever-expanding universe of interactive quests and collaborative discoveries.",
    },
    {
      icon: (
        <Image
          src="/assets_icon/19.png"
          alt="Gather Stardust"
          width={120}
          height={120}
          className="object-contain drop-shadow-lg"
        />
      ),
      heading: "Gather Stardust",
      text: "Engage in inspiring activities to collect Stardust. It is not currency, it is glory. Illuminate your path on the community leaderboard.",
    },
    {
      icon: (
        <Image
          src="/assets_icon/2.png"
          alt="Eternal Bonds"
          width={120}
          height={120}
          className="h-auto w-auto object-contain drop-shadow-lg"
        />
      ),
      heading: "Eternal Bonds",
      text: "Invite fellow travelers to expand the constellation, creating lasting connections and collective adventures across the digital cosmos.",
    },
    {
      icon: (
        <Image
          src="/assets_icon/3.png"
          alt="Loyalty Honors"
          width={120}
          height={120}
          className="h-auto w-auto object-contain drop-shadow-lg"
        />
      ),
      heading: "Loyalty Honors",
      text: "Dedicated explorers receive exquisite digital badges and role upgrades, honoring your enduring role in our shared galactic story.",
    },
  ]

  return (
    <section className="w-full pb-20 pt-10 font-chakra text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          className="mb-16 text-center md:text-left" 
          {...fadeUp(0.1)}
        >
          <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
            Why Venture Into the Deep?
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <BCard
              key={index}
              icon={card.icon}
              heading={card.heading}
              text={card.text}
              delay={0.2 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitSection