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
import { useProfile } from "@/hooks/useProfile"
import { faqItems, PLAY_STEPS } from "@/lib/constants/shared-data"
import EditProfileClient from "../(membership)/profile/_components/EditProfileClient"

// ============================================================================
// DATA
// ============================================================================
type NavLink =
  | {
      href: string
      label: string
      highlight?: boolean
      onClick?: undefined
    }
  | {
      href?: undefined
      label: string
      highlight?: boolean
      onClick: () => void
    }

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
    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/40 text-xs sm:text-sm font-bold text-purple-300">
      {number}
    </span>
    <div className="space-y-1 flex-1">
      <h4 className="font-bold text-sm sm:text-base text-gray-100">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
)

// FAQItem removed to support unified interactive accordion styles directly inside the modal body

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const DashboardNavbar = () => {
  // State Management
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false)
  const [isHowToPlayDialogOpen, setIsHowToPlayDialogOpen] = useState(false)
  const [isFAQDialogOpen, setIsFAQDialogOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)

  // Data Hooks
  useProfile()
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

  const navLinks: NavLink[] = [
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
      <header className="sticky top-0 z-50 h-16 w-full bg-[#0a0b1c]/70 backdrop-blur-md font-chakra text-gray-200">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          
          {/*Logo */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/dashboard" className="shrink-0">
              <Image 
                src="/assets/logo.png" 
                alt="Digidrops Logo" 
                height={300} 
                width={100} 
                className="hidden sm:block h-12 w-auto md:h-16 sm:h-14 object-contain" 
              />
              <Image 
                src="/assets/iconLogo.webp" 
                alt="Digidrops Logo" 
                height={300} 
                width={100} 
                className="block sm:hidden h-8 w-auto object-contain" 
              />
            </Link>

            <div className="hidden h-6 w-px bg-white/20 lg:block" />

            {/* Wallet Address*/}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3 min-w-0">

              {/*profile Link */}
              <button onClick={() => setIsProfileDialogOpen(true)} className="focus:outline-none">
              {profile?.avatar_url ? (
                
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="w-6 h-6 lg:w-7 lg:h-7 rounded-full object-cover border border-[#CB6CE6]"
                />
              ) : (
                
                <CircleUser size={24} className="text-[#CB6CE6] shrink-0 lg:w-7 lg:h-7" />
              )}
              
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <p className={`text-xs lg:text-sm font-mono truncate ${profile?.wallet_addr ? 'text-gray-200' : 'text-gray-400'}`}>
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
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-chakra text-sm text-gray-200">
            {navLinks.map((link) => (
              link.onClick ? (
                <button 
                  key={link.label}
                  onClick={link.onClick}
                  className={`transition-colors whitespace-nowrap ${
                    link.highlight 
                      ? "text-purple-400 hover:text-purple-500" 
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

          {/*Beta (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsBetaDialogOpen(true)} 
              className="btn-landing-outline border-purple-500/50 text-sm font-semibold rounded-xl px-4 py-1.5"
            >
              Beta
            </Button>
            
            <div className="h-6 w-px bg-white/20" />
            
            {!isLoading && apiData && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] uppercase text-white leading-none">
                    Position
                  </p>
                  <p className="text-sm font-bold text-gray-200 text-center">
                    {apiData.rank || 0}
                  </p>
                </div>
                
                
                <div className="text-left">
                  <p className="text-[10px] uppercase text-white leading-none">
                    My Stardust
                  </p>
                  <p className="text-sm font-bold text-white text-center">
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
              className="w-[85vw] max-w-sm border-l border-white/10 bg-[#0B0B0B]/40 backdrop-blur-md text-white p-0"
            >
              <div className="flex flex-col h-full">
                
                {/* Mobile Wallet Section */}
                <div className="border-b border-white/10 p-4 sm:p-6">
                  <div className="flex justify-start gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">

                      <button onClick={() => { setIsMobileMenuOpen(false); setIsProfileDialogOpen(true); }} className="focus:outline-none">
              {profile?.avatar_url ? (
                
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="w-6 h-6 lg:w-7 lg:h-7 rounded-full object-cover border border-[#CB6CE6]"
                />
              ) : (
                
                <CircleUser size={24} className="text-[#CB6CE6] shrink-0 lg:w-7 lg:h-7" />
              )}
              
              </button>

                      {/*Wellet Address*/}
                      
                      <p className={`text-xs sm:text-sm font-mono truncate ${profile?.wallet_addr ? 'text-gray-200' : 'text-gray-400'}`}>
                        {truncateWallet(profile?.wallet_addr || "")}
                      </p>

                      {/*Button */}
                      <Button 
                        size="icon"
                        variant="ghost"
                        onClick={handleCopy}
                        className="h-8 w-8 text-gray-400 shrink-0"
                        aria-label="Copy wallet address">
                          {isCopied ? (
                            <Check size={16} className="text-green-400" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </Button>
                    </div>
                    
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 font-chakra text-base sm:text-lg font-semibold text-gray-200">
                  {navLinks.map((link) => (
                    link.onClick ? (
                      <button 
                        key={link.label} 
                        onClick={() => handleNavClick(link.onClick)} 
                        className={`text-left transition-colors ${
                          link.highlight 
                            ? "text-purple-400" 
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
                          Position
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-purple-400">
                          {apiData.rank || 0}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase leading-none mb-1">
                         My Stardust 
                        </p>
                        <p className="text-sm sm:text-base font-bold text-white text-">
                          {apiData.point || 0}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full btn-landing-outline font-medium h-11 sm:h-12 rounded-xl"
                    onClick={() => handleNavClick(() => setIsBetaDialogOpen(true))}
                  >
                    Beta
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

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
                <h2 className="text-2xl text-center font-bold uppercase text-white">
                  Beta Horizon
                </h2>
                <p className="text-sm sm:text-base text-purple-400">
                  Pioneer the Unknown
                </p>
                <p className=" mb-8 text-sm text-gray-300 leading-relaxed">
                  You are among the first to gaze upon this evolving galaxy. As beta voyagers
                  your discoveries refine the stars. Launch Bonus: Mint your Passport today to lock in your Stardust Multiplier before the galaxy expands.
                </p>

                <div className="flex justify-center">
                <Button 
                  onClick={() => closeModal(setIsBetaDialogOpen)} 
                  className="w-full btn-landing-gradient rounded-xl font-semibold py-2.5"
                >
                  Close Transmission
                </Button>
                </div>
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
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl sm:text-2xl font-bold uppercase text-transparent">
                  Welcome to Digiverse
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => closeModal(setIsHowToPlayDialogOpen)} 
                  className="text-gray-400 hover:text-purple-400 hover:bg-white/5 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close How to Play"
                >
                  <X size={20} />
                </Button>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {PLAY_STEPS.map((step) => (
                  <StepItem key={step.number} {...step} />
                ))}
              </div>
              
              {/* Footer */}
              <div className="border-t border-white/10 px-6 py-4 text-right bg-[#121212]">
                <Button 
                  onClick={() => closeModal(setIsHowToPlayDialogOpen)} 
                  className="btn-landing-gradient font-semibold rounded-xl px-6 py-2.5"
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80 font-chakra text-white" 
            onClick={() => closeModal(setIsFAQDialogOpen)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="flex max-h-[85vh] w-full max-w-sm sm:max-w-lg lg:max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl sm:text-2xl font-bold uppercase text-transparent">
                  FAQ
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => closeModal(setIsFAQDialogOpen)} 
                  className="text-gray-400 hover:text-purple-400 hover:bg-white/5 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close FAQ"
                >
                  <X size={20} />
                </Button>
              </div>
              
              {/* Content - Interactive Accordions with premium Obsidian theme matches */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl bg-black/50 border border-white/10 transition-colors duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left font-chakra"
                    >
                      <span className={`text-sm font-semibold sm:text-base transition-colors duration-300 ${
                        openFaqIndex === index ? "text-purple-400" : "text-white hover:text-purple-400"
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
                      <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-gray-300 font-chakra leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 p-4 sm:px-6 sm:py-4 bg-[#121212] gap-4">
                <p className="text-center sm:text-left text-xs text-gray-500">
                  Need more help? Join our{" "}
                  <a 
                    href="https://t.me/DigidropsAI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-400 cursor-pointer underline hover:text-purple-500 transition-colors"
                  >
                    Telegram channel
                  </a>
                  .
                </p>
                <Button 
                  onClick={() => closeModal(setIsFAQDialogOpen)} 
                  className="btn-landing-gradient font-semibold rounded-xl px-6 py-2.5 w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
        {/* Edit Profile Modal */}
        {isProfileDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80 font-chakra text-white">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsProfileDialogOpen(false)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-md z-10"
            >
              <EditProfileClient 
                onClose={() => setIsProfileDialogOpen(false)} 
                onBackToDashboard={() => setIsProfileDialogOpen(false)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DashboardNavbar