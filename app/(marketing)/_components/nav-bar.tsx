"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false)
  const [isHowToPlayDialogOpen, setIsHowToPlayDialogOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Lock body scroll when mobile menu is open
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
      <header className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-[#0B0B0B]/95 backdrop-blur-md font-chakra text-gray-200">
        <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/assets/logo.png"
                alt="Digi Drop Logo"
                width={100}
                height={100}
                className="h-[50px] w-[50px] object-contain md:h-[60px] md:w-[60px]"
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
              <Link
                href="#FAQs"
                className="transition-colors hover:text-purple-400"
              >
                FAQ
              </Link>
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
              className="bg-gray-100 font-chakra font-bold text-black hover:bg-gray-300"
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
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-black/95 backdrop-blur-sm md:hidden font-chakra"
          >
            <div className="container mx-auto flex flex-col items-end gap-6 px-4 py-8">
              <button
                className="w-full text-right text-xl font-medium text-gray-100 hover:text-purple-400"
                onClick={() => handleMobileNavClick(() => setIsHowToPlayDialogOpen(true))}
              >
                How to Play
              </button>

              <Link
                href="#FAQs"
                className="w-full text-right text-xl font-medium text-gray-100 hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

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
                  Beta Horizon
                </h2>
                <p className="mb-6 text-lg text-purple-400">Pioneer the Unknown</p>
                
                <p className="mb-8 text-sm leading-relaxed text-gray-300">
                  You are among the first to gaze upon this evolving galaxy. As beta
                  voyagers, your discoveries refine the stars. Launch Bonus: Mint
                  your Passport today to lock in your Stardust Multiplier before
                  the galaxy expands.
                </p>

                <div className="flex justify-center">
                  <Button
                    onClick={() => setIsBetaDialogOpen(false)}
                    className="bg-purple-600 font-chakra hover:bg-purple-500 text-white"
                  >
                    Close Transmission
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
                  Welcome to Digiverse
                </h2>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
                <div className="mb-8 text-center">
                  <h3 className="mb-2 text-lg font-bold text-white">Chart Your Course</h3>
                  <p className="mx-auto max-w-md text-sm text-gray-400">
                    Your odyssey begins with a single spark. Follow this
                    celestial path to enter the ecosystem.
                  </p>
                </div>

                <div className="space-y-6">
                  <StepItem
                    number="1"
                    title="Signal (Awaken Your Comms)"
                    desc="Connect your wallet (Metamask, Trust Wallet) and switch your network to BNB Smart Chain (BEP20)."
                  />
                  <StepItem
                    number="2"
                    title="Supply (Select Your Engine)"
                    desc="Choose your speed. Mint a Black (1x), White (2x), or Gold (4x) Passport. Higher tiers gather Stardust faster."
                  />
                  <StepItem
                    number="3"
                    title="Action (Embark on Quests)"
                    desc="Dive into captivating challenges that spark creativity and community spirit."
                  />
                  <StepItem
                    number="4"
                    title="Ascension (Rise in Rank)"
                    desc="Watch your Stardust shine among the brightest explorers in the universe."
                  />
                  <StepItem
                    number="5"
                    title="Expansion (Summon Allies)"
                    desc="Share your referral beacon to guide others, weaving a richer tapestry of shared discovery."
                  />
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