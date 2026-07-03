"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
})

const WhatWeDoSection = () => {
  const steps = [
    {
      id: 1,
      icon: "/assets_icon/15.webp",
      title: "Identity",
      topic: "(Proof of Personhood)",
      text: "Establish cryptographic human identity on-chain via Soulbound Passports to filter bots and eliminate Sybil attacks.",
      delay: 0.2,
    },
    {
      id: 2,
      icon: "/assets_icon/11.webp",
      title: "Growth",
      topic: "(Web3 Growth Engine)",
      text: "Empower users to complete verified social and on-chain flight missions for top Web3 projects to accumulate Stardust points.",
      delay: 0.35,
    },
    {
      id: 3,
      icon: "/assets_icon/19.webp",
      title: "RLHF",
      topic: "(AI Training Layer)",
      text: "Transition the verified human community into a powerful gig workforce for Reinforcement Learning from Human Feedback (RLHF) and content curation.",
      delay: 0.5,
    },
    {
      id: 4,
      icon: "/assets_icon/14.webp",
      title: "Provenance",
      topic: "(AI Data Infrastructure)",
      text: "Package high-fidelity human annotation datasets and deliver them directly to B2B AI builders with full cryptographic provenance.",
      delay: 0.65,
    },
  ]

  return (
    <section className="relative w-full font-chakra text-white bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0.1)} className="mb-16 text-center md:text-left">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
            What We Do
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
              <div className="mb-6 flex h-[90px] sm:h-[100px] w-full items-center justify-center">
                <div className="relative h-[70px] w-[80px] sm:h-[80px] sm:w-[90px]">
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
    </section>
  )
}

export default WhatWeDoSection
