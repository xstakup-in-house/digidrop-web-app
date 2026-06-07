"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { faqItems, PLAY_STEPS } from "@/lib/constants/shared-data"

const Navbar: React.FC = () => {
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false)
  const [isHowToPlayDialogOpen, setIsHowToPlayDialogOpen] = useState(false)
  const [isFAQDialogOpen, setIsFAQDialogOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const handleMobileNavClick = (action: () => void) => {
    action()
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 left-0 z-50 h-16 w-full transition-all duration-300 font-chakra text-gray-200 ${
        isScrolled 
          ? "bg-[#0a0b1c]/50 backdrop-blur-md border-b border-white/10" 
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}>
        <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Digi Drop Logo"
                width={3000}
                height={100}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden items-center gap-6 font-medium md:flex">
              <button
                onClick={() => setIsHowToPlayDialogOpen(true)}
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                How to Play
              </button>
              <button
                onClick={() => setIsFAQDialogOpen(true)}
                className="transition-colors hover:text-purple-400"
              >
                FAQ
              </button>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Button
              variant="outline"
              className="border-purple-500/50 bg-transparent font-chakra text-gray-200 hover:bg-purple-900/20 hover:text-white"
              onClick={() => setIsBetaDialogOpen(true)}
            >
              Beta
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-[#09154a] via-purple-500 to-brandColor font-chakra font-bold text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_15px_rgba(203,108,230,0.3)] hover:shadow-[0_0_25px_rgba(203,108,230,0.6)] border-none"
            >
              <Link href="/login">Login with Wallet</Link>
            </Button>
          </div>

          {/* Mobile Actions + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              asChild
              size="sm"
              className="h-8 border border-purple-500/50 bg-gray-900 font-chakra text-xs text-white hover:bg-gray-800"
            >
              <Link href="/login">Login</Link>
            </Button>

            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-md p-1 text-gray-200 hover:bg-gray-800 active:scale-95 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-gradient-to-b from-[#09154a]/60 via-[#0a0b1c]/50 to-[#0b0b0b]/60 backdrop-blur-lg border-b border-blue-500/20 md:hidden font-chakra"
          >
            <div className="container mx-auto flex flex-col items-end gap-6 px-4 py-8">
              <button
                className="w-full text-right text-xl font-medium text-gray-100 hover:text-purple-400"
                onClick={() => handleMobileNavClick(() => setIsHowToPlayDialogOpen(true))}
              >
                How to Play
              </button>

              <button
                className="w-full text-right text-xl font-medium text-gray-100 hover:text-purple-400"
                onClick={() => handleMobileNavClick(() => setIsFAQDialogOpen(true))}
              >
                FAQ
              </button>

              <div className="mt-4 w-full flex justify-end">
                <Button
                  className="w-full max-w-[150px] border border-purple-500 bg-transparent font-chakra text-lg hover:bg-purple-900/20"
                  onClick={() => handleMobileNavClick(() => setIsBetaDialogOpen(true))}
                >
                  Beta
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== BETA DIALOG ===== */}
      <AnimatePresence>
        {isBetaDialogOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm font-chakra"
            onClick={() => setIsBetaDialogOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-xl border border-white/10 bg-[#181818] p-8 shadow-2xl"
            >
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold uppercase text-white">
                  You Are in Beta
                </h2>
                <p className="mb-6 text-lg text-purple-400">Season 1 is live now</p>
                
                <p className="mb-8 text-sm leading-relaxed text-gray-300">
                  Digidrops is in its early stage. Things move fast. Mint your Passport
                  now to lock in your Stardust Multiplier before Season 1 ends. Early
                  users get the biggest head start on the leaderboard.
                </p>

                <div className="flex justify-center">
                  <Button
                    onClick={() => setIsBetaDialogOpen(false)}
                    className="bg-purple-600 font-chakra hover:bg-purple-500 text-white"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== HOW TO PLAY DIALOG ===== */}
      <AnimatePresence>
        {isHowToPlayDialogOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm font-chakra"
            onClick={() => setIsHowToPlayDialogOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="border-b border-white/10 bg-[#181818] px-6 py-5 text-center">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold uppercase text-transparent">
                  How to Play
                </h2>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
                <div className="mb-8 text-center">
                  <h3 className="mb-2 text-lg font-bold text-white">Get started in 5 steps</h3>
                  <p className="mx-auto max-w-md text-sm text-gray-400">
                    It takes under 5 minutes to set up and start earning Stardust.
                  </p>
                </div>

                <div className="space-y-6">
                  {PLAY_STEPS.map((step) => (
                    <StepItem
                      key={step.number}
                      number={step.number}
                      title={step.title}
                      desc={step.desc}
                    />
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 px-6 py-4 text-right">
                <Button
                  onClick={() => setIsHowToPlayDialogOpen(false)}
                  className="bg-purple-600 font-chakra hover:bg-purple-500 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== FAQ DIALOG ===== */}
      <AnimatePresence>
        {isFAQDialogOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm font-chakra"
            onClick={() => setIsFAQDialogOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="border-b border-white/10 bg-[#181818] px-6 py-5 text-center">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold uppercase text-transparent">
                  FAQ
                </h2>
                <p className="mt-1 text-sm text-gray-400">Common questions answered simply</p>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-6 space-y-3 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl bg-black/50 border border-white/10 transition-colors duration-300 hover:border-purple-500/30"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className={`text-sm font-semibold sm:text-base transition-colors duration-300 ${
                        openFaqIndex === index ? "text-purple-400" : "text-white"
                      }`}>
                        {faq.question}
                      </span>
                      <ChevronRight
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                          openFaqIndex === index ? "rotate-90 text-[#CB6CE6]" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: openFaqIndex === index ? "auto" : 0,
                        opacity: openFaqIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 px-6 py-4 text-right">
                <Button
                  onClick={() => setIsFAQDialogOpen(false)}
                  className="bg-purple-600 font-chakra hover:bg-purple-500 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

// Helper Component for Steps
const StepItem = ({
  number,
  title,
  desc,
}: {
  number: string
  title: string
  desc: string
}) => (
  <div className="flex gap-4">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/40 text-sm font-bold text-purple-300">
      {number}
    </span>
    <div>
      <h4 className="mb-1 text-base font-bold text-gray-100">{title}</h4>
      <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
    </div>
  </div>
)

export default Navbar