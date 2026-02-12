"use client"

import React, { useState } from "react"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion" // Changed from "motion/react" to "framer-motion" (Standard import)

// 1. ADD THIS DEFINITION HERE
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const faqs = [
  {
    question: "What awaits in Digidrop?",
    answer:
      "A boundless haven for Web3 enthusiasts to connect, create, and celebrate through quests and digital collectibles.",
  },
  {
    question: "Which network is DigiDrop built on?",
    answer:
      "We are powered by the BSC (BEP20). We chose this network to ensure lightning-fast transactions and minimal gas fees (usually <$0.10) for our community.",
  },
  {
    question: "What is the benefit of the White or Gold Pass?",
    answer:
      "While the Black Pass earns standard Stardust, the White Pass grants a x2 Multiplier and the Gold Pass grants a x4 Multiplier on all quest rewards. If a quest gives 100 Stardust, a Gold user earns 400 instantly.",
  },
  {
    question: "Can I sell my Passport later?",
    answer:
      "No. Your Passport is a Soulbound Token (SBT). It is permanently fused to your wallet address. It is not a financial asset to be traded; it is your immutable reputation and legacy in our world.",
  },
  {
    question: "What is Stardust?",
    answer:
      "A luminous marker of your engagement (XP). It holds no monetary value but grants you status and prestige within the fleet.",
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="FAQs" className="w-full py-12 font-chakra">
      {/* Container */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36">
        
        {/* Heading */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp} 
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl font-bold text-white uppercase sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="mb-4 h-px w-full bg-white/10" />

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-[#1C1C1C]/95"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left transition sm:px-8"
              >
                <span className="text-lg font-medium text-white sm:text-xl font-chakra">
                  {faq.question}
                </span>

                <ChevronRight
                  className={`mt-1 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Inner Divider */}
              <div className="h-px w-full bg-white/5" />

              {/* Accordion Body */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-8 pt-2 text-base leading-relaxed text-gray-300 sm:px-8 sm:text-lg font-chakra">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ