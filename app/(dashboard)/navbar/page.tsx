"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, CircleUser, Copy, Check, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUserStore } from "@/store/useUserProfile"
import { useProfileStats } from "@/hooks/useGetProfileStats"

// ============================================================================
// DATA
// ============================================================================

const FAQ_DATA = [
  {
    question: "What awaits in Digidrop?",
    answer: "A boundless haven for Web3 enthusiasts to connect, create, and celebrate through quests and digital collectibles.",
  },
  {
    question: "Which network is DigiDrop built on?",
    answer: "We are powered by the BSC (BEP20). We chose this network to ensure lightning-fast transactions and minimal gas fees (usually <$0.10) for our community.",
  },
  {
    question: "What is the benefit of the White or Gold Pass?",
    answer: "While the Black Pass earns standard Stardust, the White Pass grants a x2 Multiplier and the Gold Pass grants a x4 Multiplier on all quest rewards.",
  },
  {
    question: "Can I sell my Passport later?",
    answer: "No. Your Passport is a Soulbound Token (SBT). It is permanently fused to your wallet address and is not a financial asset.",
  },
  {
    question: "What is Stardust?",
    answer: "A luminous marker of your engagement (XP). It holds no monetary value but grants you status and prestige within the fleet.",
  },
] as const

const PLAY_STEPS = [
  {
    number: "1",
    title: "Signal (Awaken Your Comms)",
    desc: "Connect your wallet (Metamask, Trust Wallet) and switch your network to BNB Smart Chain (BEP20).",
  },
  {
    number: "2",
    title: "Supply (Select Your Engine)",
    desc: "Choose your speed. Mint a Black (1x), White (2x), or Gold (4x) Passport. Higher tiers gather Stardust faster.",
  },
  {
    number: "3",
    title: "Action (Embark on Quests)",
    desc: "Dive into captivating challenges that spark creativity and community spirit.",
  },
  {
    number: "4",
    title: "Ascension (Rise in Rank)",
    desc: "Watch your Stardust shine among the brightest explorers in the universe.",
  },
  {
    number: "5",
    title: "Expansion (Summon Allies)",
    desc: "Share your referral beacon to guide others, weaving a richer tapestry of shared discovery.",
  },
] as const

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface StepItemProps {
  number: string
  title: string
  desc: string
}

const StepItem = ({ number, title, desc }: StepItemProps) => (
  <div className="flex gap-3 sm:gap-4">
    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs sm:text-sm font-bold text-white">
      {number}
    </div>
    <div className="space-y-1 flex-1">
      <h4 className="font-bold text-sm sm:text-base text-gray-100">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
)

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem = ({ question, answer }: FAQItemProps) => (
  <div className="rounded-lg border border-white/5 bg-white/5 p-3 sm:p-4 transition-colors hover:border-white/10 hover:bg-white/[0.07]">
    <h4 className="mb-2 flex items-start gap-2 font-bold text-sm sm:text-base text-[#CB6CE6]">
      <ChevronRight size={16} className="shrink-0 mt-0.5" />
      <span className="flex-1">{question}</span>
    </h4>
    <p className="pl-6 text-xs sm:text-sm leading-relaxed text-gray-300">{answer}</p>
  </div>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const DashboardNavbar = () => {
  // State Management
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false)
  const [isHowToPlayDialogOpen, setIsHowToPlayDialogOpen] = useState(false)
  const [isFAQDialogOpen, setIsFAQDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Data Hooks
  const profile = useUserStore((state) => state.profile)
  const { data: apiData, isLoading } = useProfileStats()

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const truncateWallet = useCallback((addr: string) => {
    if (!addr) return "Not Connected"
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }, [])

  const handleCopy = useCallback(() => {
    if (!profile?.wallet_addr) return
    
    navigator.clipboard.writeText(profile.wallet_addr)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [profile?.wallet_addr])

  const handleNavClick = useCallback((action?: () => void) => {
    setIsMobileMenuOpen(false)
    if (action) action()
  }, [])

  const closeModal = useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false)
  }, [])

  // ============================================================================
  // NAVIGATION CONFIG
  // ============================================================================

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/referrals", label: "Referrals" },
    { label: "FAQ", onClick: () => setIsFAQDialogOpen(true) },
    { 
      label: "How to Play", 
      highlight: true, 
      onClick: () => setIsHowToPlayDialogOpen(true) 
    },
  ] as const

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B0B]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 sm:h-20 lg:h-[80px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          
          {/* LEFT: Logo & Profile */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/" className="shrink-0">
              <Image 
                src="/assets_icon/25.png" 
                alt="DigiDrop Logo" 
                height={40} 
                width={40} 
                className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer" 
              />
            </Link>

            <div className="hidden h-6 w-px bg-white/20 lg:block" />

            {/* Wallet Address - Hidden on Mobile */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3 min-w-0">
              <CircleUser size={24} className="text-[#CB6CE6] shrink-0 lg:w-7 lg:h-7" />
              <div className="flex items-center gap-2 min-w-0">
                <p className="text-xs lg:text-sm text-gray-200 font-mono truncate">
                  {truncateWallet(profile?.wallet_addr || "")}
                </p>
                <button 
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  aria-label="Copy wallet address"
                >
                  {isCopied ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-chakra text-sm uppercase text-white">
            {navLinks.map((link) => (
              link.onClick ? (
                <button 
                  key={link.label}
                  onClick={link.onClick}
                  className={`transition-colors whitespace-nowrap ${
                    link.highlight 
                      ? "text-[#CB6CE6] hover:text-[#d886ee]" 
                      : "hover:text-gray-300"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link 
                  key={link.href} 
                  href={link.href!} 
                  className="hover:text-gray-300 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* RIGHT: Stats & Beta (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsBetaDialogOpen(true)} 
              className="border-white/20 bg-transparent text-white hover:bg-white/10 text-sm"
            >
              Beta
            </Button>
            
            <div className="h-6 w-px bg-white/20" />
            
            {!isLoading && apiData && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] uppercase text-gray-500 leading-none">
                    High Score
                  </p>
                  <p className="text-sm font-bold text-gray-200">
                    {apiData.highest_point || 0}
                  </p>
                </div>
                
                <Image 
                  src="/assets_icon/25.png" 
                  alt="Rank icon" 
                  width={24} 
                  height={24} 
                  className="shrink-0"
                />
                
                <div className="text-left">
                  <p className="text-[10px] uppercase text-gray-500 leading-none">
                    Points
                  </p>
                  <p className="text-sm font-bold text-[#CB6CE6]">
                    {apiData.point || 0}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="lg:hidden p-2 -mr-2" aria-label="Open menu">
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[85vw] max-w-sm border-l border-white/10 bg-[#0B0B0B] text-white p-0"
            >
              <div className="flex flex-col h-full">
                
                {/* Mobile Wallet Section */}
                <div className="border-b border-white/10 p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <CircleUser size={24} className="text-[#CB6CE6] shrink-0 sm:w-7 sm:h-7" />
                      <p className="text-xs sm:text-sm text-gray-200 font-mono truncate">
                        {truncateWallet(profile?.wallet_addr || "")}
                      </p>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={handleCopy} 
                      className="h-8 w-8 text-gray-400 shrink-0"
                      aria-label="Copy wallet address"
                    >
                      {isCopied ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 font-chakra text-base sm:text-lg uppercase">
                  {navLinks.map((link) => (
                    link.onClick ? (
                      <button 
                        key={link.label} 
                        onClick={() => handleNavClick(link.onClick)} 
                        className={`text-left transition-colors ${
                          link.highlight 
                            ? "text-[#CB6CE6]" 
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link 
                        key={link.href} 
                        href={link.href!} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </nav>

                {/* Mobile Stats & Beta Footer */}
                <div className="border-t border-white/10 p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {!isLoading && apiData && (
                    <div className="flex justify-between items-center bg-white/5 p-3 sm:p-4 rounded-lg">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase leading-none mb-1">
                          Current Points
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-[#CB6CE6]">
                          {apiData.point || 0}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase leading-none mb-1">
                          High Score
                        </p>
                        <p className="text-sm sm:text-base font-bold text-white">
                          {apiData.highest_point || 0}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-[#CB6CE6] text-black hover:bg-[#b54cd4] font-medium h-11 sm:h-12"
                    onClick={() => handleNavClick(() => setIsBetaDialogOpen(true))}
                  >
                    Beta Access
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ============================================================================ */}
      {/* MODALS */}
      {/* ============================================================================ */}

      <AnimatePresence>
        {/* Beta Modal */}
        {isBetaDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => closeModal(setIsBetaDialogOpen)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 shadow-2xl overflow-hidden font-chakra"
            >
              {/* Decorative gradient */}
              <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-purple-600/20 blur-[80px]" />
              
              <div className="relative text-center space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
                  Beta Horizon
                </h2>
                <p className="text-sm sm:text-base text-purple-400">
                  Pioneer the Unknown
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  You are among the first to gaze upon this evolving galaxy. As beta voyagers
                  your discoveries refine the stars. Launch Bonus: Mint your Passport today to lock in your Stardust Multiplier before the galaxy expands.
                </p>
                <Button 
                  onClick={() => closeModal(setIsBetaDialogOpen)} 
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white py-5 sm:py-6 text-sm sm:text-base"
                >
                  Close Transmission
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* How to Play Modal */}
        {isHowToPlayDialogOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80" 
            onClick={() => closeModal(setIsHowToPlayDialogOpen)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="flex max-h-[85vh] w-full max-w-sm sm:max-w-md lg:max-w-xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl font-chakra"
            >
              {/* Header */}
              <div className="border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5 text-center">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl sm:text-2xl font-bold uppercase text-transparent">
                  Welcome to Digiverse
                </h2>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {PLAY_STEPS.map((step) => (
                  <StepItem key={step.number} {...step} />
                ))}
              </div>
              
              {/* Footer */}
              <div className="border-t border-white/10 p-3 sm:p-4 text-right">
                <Button 
                  onClick={() => closeModal(setIsHowToPlayDialogOpen)} 
                  className="bg-purple-600 hover:bg-purple-500 text-sm sm:text-base"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* FAQ Modal */}
        {isFAQDialogOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80" 
            onClick={() => closeModal(setIsFAQDialogOpen)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="flex max-h-[85vh] w-full max-w-sm sm:max-w-lg lg:max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl font-chakra"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5">
                <h2 className="text-lg sm:text-2xl font-bold uppercase text-white">
                  Transmission Log
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => closeModal(setIsFAQDialogOpen)} 
                  className="text-gray-400 hover:text-white h-8 w-8 sm:h-10 sm:w-10"
                  aria-label="Close FAQ"
                >
                  <X size={20} />
                </Button>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {FAQ_DATA.map((faq, index) => (
                  <FAQItem key={index} {...faq} />
                ))}
              </div>
              
              {/* Footer */}
              <div className="border-t border-white/10 p-3 sm:p-4 bg-[#121212]">
                <p className="text-center text-xs text-gray-500">
                  Need more help? Join our{" "}
                  <span className="text-purple-400 cursor-pointer underline hover:text-purple-300 transition-colors">
                    Discord channel
                  </span>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DashboardNavbar