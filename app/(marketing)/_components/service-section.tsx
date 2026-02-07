"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import BenefitSection from "./benefit-section"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
})

const ServiceSection = () => {
  const steps = [
    {
      id: 1,
      icon: "/assets_icon/4.png",
      title: "Signal",
      topic: "(Awaken Your Comms)",
      text: "Connect your wallet (Metamask, Trust Wallet) and switch your network to BNB Smart Chain (BEP20).",
      delay: 0.2,
    },
    {
      id: 2,
      icon: "/assets_icon/15.png",
      title: "Supply",
      topic: "(Select Your Engine)",
      text: "Choose your speed. Mint a Black (1x), White (2x), or Gold (4x) Passport.",
      delay: 0.35,
    },
    {
      id: 3,
      icon: "/assets_icon/9.png",
      title: "Action",
      topic: "(Embark on Quests)",
      text: "Dive into captivating challenges that spark creativity and community spirit.",
      delay: 0.5,
    },
    {
      id: 4,
      icon: "/assets_icon/10.png",
      title: "Ascension",
      topic: "(Rise in Rank)",
      text: "Complete quests and witness your Stardust shine among the brightest explorers.",
      delay: 0.65,
    },
  ]

  return (
    <section className="relative w-full bg-[#1C1C1C]/90 bg-[url('/assets/pattern-bg.png')] bg-cover bg-center bg-blend-multiply font-chakra text-white">
      {/* ===== HOW TO PLAY ===== */}
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0.1)} className="mb-16 text-center md:text-left">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
            How to Play
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              {...fadeUp(step.delay)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-[#1C1C1C] p-8 text-center transition-all duration-300 hover:border-gray-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
            >
              {/* Icon Wrapper for consistent height */}
              <div className="mb-6 flex h-[160px] w-full items-center justify-center">
                <div className="relative h-[130px] w-[150px]">
                <Image
                  src={step.icon}
                  alt={step.title}
                  fill
                  className="object-contain drop-shadow-lg"
                />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                  <span className="opacity-60 mr-2"></span>
                  {step.title}
                </h3>
                
                <p className="text-sm font-semibold text-gray-300">
                  {step.topic}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <BenefitSection />
    </section>
  )
}

export default ServiceSection