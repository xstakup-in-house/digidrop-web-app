"use client"

import React, { useState, useEffect, useCallback } from "react"
import { 
  ArrowUpIcon, User, Search, Bell, Home, BookOpen,
  Award, ShieldCheck,
  Copy, Check, X, ChevronRight, PlayCircle, Share2, Menu
} from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import InfoCard from "../info-card"
import TaskQuest from "../quest-card"

import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/useUserProfile"
import { useProfileStats } from "@/hooks/useGetProfileStats"
import { faqItems, PLAY_STEPS } from "@/lib/constants/shared-data"
import EditProfileClient from "../../(membership)/profile/_components/EditProfileClient"
import { toast } from "sonner"

// Community Activity Rotation Constants
const USER_POOL = [
  { name: "Nova", role: "Explorer", avatar: "/assets_icon/0.webp" },
  { name: "Astro", role: "Pilot", avatar: "/assets_icon/1.webp" },
  { name: "Pixel", role: "Creator", avatar: "/assets_icon/2.webp" },
  { name: "Cosmo", role: "Admin", avatar: "/assets_icon/3.webp" },
  { name: "Zenix", role: "Explorer", avatar: "/assets_icon/4.webp" },
  { name: "Zephyr", role: "Pilot", avatar: "/assets_icon/5.webp" },
  { name: "Apex", role: "Member", avatar: "/assets_icon/6.webp" },
] as const;

const POINT_POOL = ["+100 Stardust", "+200 Stardust", "+50 Stardust", "+20 Stardust"] as const;

const DashboardUi = () => {
  const router = useRouter()
  const profile = useUserStore((state) => state.profile)
  const { data: api_data, isLoading } = useProfileStats()
  
  const [activeTab, setActiveTab] = useState<"missions" | "communities">("missions")
  const [activeMenu, setActiveMenu] = useState("Home")
  const [copiedWallet, setCopiedWallet] = useState(false)
  const [dailySpinCountdown, setDailySpinCountdown] = useState("14h 25m 10s")
  const [isFAQDialogOpen, setIsFAQDialogOpen] = useState(false)
  const [isHowToPlayDialogOpen, setIsHowToPlayDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false)
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Dynamic Community Activity List
  const [activities, setActivities] = useState([
    { name: "Dax", role: "Creator", value: "+100 Stardust", avatar: "/assets_icon/7.webp" },
    { name: "Elysia", role: "Admin", value: "+200 Stardust", avatar: "/assets_icon/8.webp" },
    { name: "Rogan", role: "Member", value: "+50 Stardust", avatar: "/assets_icon/9.webp" },
    { name: "Nova", role: "Explorer", value: "+100 Stardust", avatar: "/assets_icon/0.webp" },
    { name: "Astro", role: "Pilot", value: "+200 Stardust", avatar: "/assets_icon/1.webp" },
    { name: "Pixel", role: "Creator", value: "+50 Stardust", avatar: "/assets_icon/2.webp" },
  ])

  // Count down Daily Spin
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const nextSpin = new Date(now)
      nextSpin.setHours(24, 0, 0, 0)
      const diff = nextSpin.getTime() - now.getTime()
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setDailySpinCountdown(`${hours}h ${minutes}m ${seconds}s`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Rotate community activity feed every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = USER_POOL[Math.floor(Math.random() * USER_POOL.length)]
      const randomPoints = POINT_POOL[Math.floor(Math.random() * POINT_POOL.length)]
      
      const newActivity = {
        name: randomUser.name,
        role: randomUser.role,
        value: randomPoints,
        avatar: randomUser.avatar,
      }
      
      setActivities((prev) => [newActivity, ...prev.slice(0, 6)])
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const refLink = useUserStore((state) => state.referralLink) || "https://digidrops.xyz/loading..."

  const handleCopyWallet = useCallback(() => {
    const textToCopy = profile?.wallet_addr || "Not Connected"
    navigator.clipboard.writeText(textToCopy)
    setCopiedWallet(true)
    toast.success("Wallet address copied to clipboard!")
    setTimeout(() => setCopiedWallet(false), 2000)
  }, [profile?.wallet_addr])

  const positionData = {
    icon: ArrowUpIcon,
    text: "Leaderboard Rank",
    value: api_data?.rank ? `#${api_data?.rank}` : "N/A",
  }

  const stardustData = {
    icon: "/assets_icon/7.webp",
    text: "My Stardust",
    value: api_data?.point ?? 0,
  }
 
  const passData = {
    icon: "/assets/iconLogo.webp",
    text: "SBT Pass Multiplier",
    value: `${profile?.current_pass_power || 1}x`,
  }

  const referralData = {
    icon: User,
    text: "Total Referrals",
    value: api_data?.referral_count || 0,
  }

  // Mock Web3 Communities Data
  const communitiesData = [
    { name: "Vance", handle: "@vance_web3", avatar: "/assets_icon/3.webp", change: "+12.45%", isPositive: true, holdings: "0.45 BTC" },
    { name: "Selena", handle: "@crypto_selena", avatar: "/assets_icon/4.webp", change: "-3.20%", isPositive: false, holdings: "15400 USDT" },
    { name: "Kaelen", handle: "@kaelen_decent", avatar: "/assets_icon/5.webp", change: "+5.67%", isPositive: true, holdings: "10600 BNB" },
    { name: "Amara", handle: "@amara_fi", avatar: "/assets_icon/6.webp", change: "+18.89%", isPositive: true, holdings: "2.34 ETH" },
  ]

  const menuItems = [
    { name: "Home", icon: Home, route: "/dashboard" },
    { name: "Leaderboard", icon: Award, route: "/leaderboard" },
    { name: "Referral", icon: Share2, route: "/referrals" },
    { name: "FAQ", icon: BookOpen, action: "faq" },
    { name: "How to Play", icon: PlayCircle, action: "how-to-play" },
  ]

  const handleMenuClick = (item: typeof menuItems[number]) => {
    setActiveMenu(item.name)
    if (item.route) {
      router.push(item.route)
    } else if (item.action === "faq") {
      setIsFAQDialogOpen(true)
    } else if (item.action === "how-to-play") {
      setIsHowToPlayDialogOpen(true)
    }
  }

  return (
    <div 
      style={{ backgroundImage: "url('/assets/bg/dashboard%20bg.webp')" }}
      className="min-h-screen w-full bg-[#0B0B0B] bg-cover bg-center bg-no-repeat bg-fixed text-white flex relative overflow-hidden"
    >
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />

      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 relative z-20 justify-between">
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/dashboard")}>
            <img src="/assets/logo.png" alt="Digidrops Logo" className="h-12 w-auto object-contain" />
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive 
                      ? "bg-white/10 border border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-[#CB6CE6]" : "text-gray-400"} />
                  {item.name}
                </button>
              )
            })}

            {/* Vertically positioned profile card directly below How to Play */}
            <div className="pt-4">
              <div 
                onClick={() => setIsProfileDialogOpen(true)}
                className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl cursor-pointer hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-[#FF00FF]/20 flex items-center justify-center border border-white/20 shrink-0">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-white uppercase">{profile?.names ? profile?.names[0] : "U"}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-white uppercase">
                      {profile?.names || "Username"}
                    </p>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <ShieldCheck size={10} /> Verified Human
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto px-4 sm:px-8 py-6 relative z-10">
        
        {/* TOP NAVIGATION BAR */}
        <header className="pb-6 border-b border-white/5 font-chakra">
          {/* Main Row: Logo (left) and Actions Row (right) - Always horizontal */}
          <div className="flex items-center justify-between w-full gap-2">
            
            {/* Left side: Mobile Menu + Logo (visible on mobile/tablet only) */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 bg-black/50 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-md relative z-30 shrink-0"
                aria-label="Open menu"
              >
                <Menu size={16} className="text-white" />
              </button>
              <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => router.push("/dashboard")}>
                <img src="/assets/iconLogo.webp" alt="Digidrops Logo" className="h-7 w-auto object-contain" />
              </div>
            </div>

            {/* Pill-shaped search bar (hidden on mobile/tablet, visible on desktop) */}
            <div className="relative hidden lg:block w-72 lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search through Digiverse for treasure, co-pilots activties, quests. etc" 
                className="w-full pl-12 pr-4 py-2.5 bg-black/50 border border-white/10 backdrop-blur-md rounded-full text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#CB6CE6]/50 transition-all font-chakra"
              />
            </div>

            {/* Right side: Actions (Wallet, Beta, Bell, Avatar) - Desktop/Tablet/Mobile */}
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-nowrap shrink-0 ml-auto">
              {/* Search icon button on mobile/tablet (hidden on desktop lg) */}
              <button className="lg:hidden p-1.5 bg-black/50 border border-white/10 backdrop-blur-md rounded-xl hover:bg-white/10 transition-all shrink-0">
                <Search size={13} className="text-white" />
              </button>

              {/* Connected / Not Connected Wallet Display */}
              <div className="flex items-center gap-1 bg-black/50 border border-white/10 backdrop-blur-md rounded-full px-2 py-1.5 sm:px-2.5 sm:py-1.5 min-w-0">
                <p className={`text-[9px] sm:text-xs font-mono truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none ${profile?.wallet_addr ? 'text-gray-200' : 'text-gray-400'}`}>
                  {profile?.wallet_addr 
                    ? `${profile.wallet_addr.slice(0, 4)}...${profile.wallet_addr.slice(-4)}` 
                    : "Not Connected"
                  }
                </p>
                <button 
                  onClick={handleCopyWallet}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  aria-label="Copy wallet address"
                >
                  {copiedWallet ? (
                    <Check size={9} className="text-green-400" />
                  ) : (
                    <Copy size={9} />
                  )}
                </button>
              </div>

              {/* Beta Dialog Trigger Button - Hidden on mobile viewports below sm to prevent layout choking */}
              <Button 
                variant="outline" 
                onClick={() => setIsBetaDialogOpen(true)} 
                className="btn-landing-outline border-purple-500/50 text-[9px] sm:text-xs px-2 py-1 sm:px-2.5 sm:py-1.5 h-auto font-bold tracking-wider rounded-xl transition-all shrink-0 hidden xs:inline-flex"
              >
                Beta
              </Button>

              {/* Notification Bell */}
              <button 
                onClick={() => {
                  setIsNotificationsDialogOpen(true)
                  setHasUnreadNotifications(false)
                }}
                className="p-1.5 bg-black/50 border border-white/10 backdrop-blur-md rounded-xl hover:bg-white/10 transition-all relative shrink-0"
              >
                <Bell size={13} className="text-white" />
                {hasUnreadNotifications && (
                  <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-[#FF00FF] rounded-full" />
                )}
              </button>

              {/* Clickable Circular Profile Avatar */}
              <button 
                onClick={() => setIsProfileDialogOpen(true)}
                className="h-7 w-7 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-white/20 bg-landing-gradient p-[1px] focus:outline-none hover:border-white transition-all duration-300 shrink-0"
              >
                <div className="w-full h-full rounded-full bg-[#0A0A12] flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={12} className="text-[#CB6CE6]" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* BENTO-BOX GRID LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          
          <motion.div 
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.25)" }}
            transition={{ duration: 0.3 }}
            className="xl:col-span-2 relative overflow-hidden rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 flex flex-col justify-start shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF00FF]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative space-y-4 flex flex-col items-center text-center">
              {/* Header Row: Claimed Points and countdown of daily spin side by side */}
              <div className="flex items-center justify-between w-full flex-row flex-nowrap gap-1">
                <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#CB6CE6] uppercase bg-[#CB6CE6]/10 border border-[#CB6CE6]/20 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap">
                  Claimed Points: {isLoading ? "..." : api_data?.point || 0}
                </span>
                
                {/* Daily Spin Countdown */}
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-gray-400 font-mono whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CB6CE6] animate-pulse shrink-0" />
                  Daily Spin: <span className="text-[#CB6CE6]">{dailySpinCountdown}</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide font-chakra uppercase leading-tight text-landing-gradient text-center mx-auto w-full">
                Welcome {profile?.names || 'Voyager'}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-md md:max-w-xl leading-relaxed text-center mx-auto">
                You are a pioneer copilot, engage continuously with our quest and keep broadcasting everything on our official @digidrops_xyz as we collectively growing our digiverse and you keep gathering unlimited stardust and continuously build your reputation.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/5 relative z-10 w-full">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/mint-pass")}
                  className="px-6 py-2.5 rounded-xl text-xs uppercase font-extrabold btn-landing-gradient"
                >
                  Update Pass
                </motion.button>

                {/* Referral button */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/referrals")}
                  className="px-6 py-2.5 rounded-xl text-xs uppercase font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white"
                >
                  Referrals
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bento 4: Leaderboard Stats (Performance Metrics Card) */}
          <motion.div 
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.25)" }}
            transition={{ duration: 0.3 }}
            className="xl:col-span-1 backdrop-blur-md bg-black/50 border border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-xl space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Performance metrics
            </h3>
            
            <InfoCard data={positionData} isLoading={isLoading} />
            <InfoCard data={stardustData} isLoading={isLoading} />
            <InfoCard data={passData} isLoading={isLoading} />
            <InfoCard data={referralData} isLoading={isLoading} />
          </motion.div>

          {/* Bento 3: Quest Board */}
          <motion.div 
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.25)" }}
            transition={{ duration: 0.3 }}
            className="xl:col-span-2 backdrop-blur-md bg-black/50 border border-white/10 rounded-3xl p-6 transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Active Missions
              </h3>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-chakra">
                Season 1 Live
              </div>
            </div>

            <div className="w-full">
              <TaskQuest />
            </div>
          </motion.div>

          {/* Bento 6: Community list & Activity */}
          <motion.div 
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.25)" }}
            transition={{ duration: 0.3 }}
            className="xl:col-span-1 backdrop-blur-md bg-black/50 border border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-xl"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Community Activity
            </h3>
            
            <div className="space-y-4">
              {activities.map((act, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center font-chakra text-[10px] text-gray-300 font-bold uppercase">
                      {act.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{act.name}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-chakra">
                    {act.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-400 leading-relaxed text-center font-chakra flex items-center justify-center gap-1.5">
                <ShieldCheck size={11} className="text-emerald-400" /> Human proof verified via Soulbound Credentials.
              </p>
            </div>
          </motion.div>

        </div>

      </div>

      {/* NAV MODALS SYNCED AND READY */}
      <AnimatePresence>
        {/* Beta Modal */}
        {isBetaDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsBetaDialogOpen(false)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-lg" 
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
                    onClick={() => setIsBetaDialogOpen(false)} 
                    className="w-full btn-landing-gradient font-semibold rounded-xl py-2.5"
                  >
                    Close Transmission
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* FAQ Modal */}
        {isFAQDialogOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80 font-chakra text-white" 
            onClick={() => setIsFAQDialogOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="flex max-h-[85vh] w-full max-w-sm sm:max-w-lg lg:max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl sm:text-2xl font-bold uppercase text-transparent">
                  FAQ
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsFAQDialogOpen(false)} 
                  className="text-gray-400 hover:text-purple-400 hover:bg-white/5 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl bg-black/50 border border-white/10 transition-all duration-300 hover:border-purple-500/30"
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
                      <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-gray-300 font-chakra">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
              
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
                  onClick={() => setIsFAQDialogOpen(false)} 
                  className="btn-landing-gradient font-semibold rounded-xl px-6 py-2.5 w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* How to Play Modal */}
        {isHowToPlayDialogOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80" 
            onClick={() => setIsHowToPlayDialogOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="flex max-h-[85vh] w-full max-w-sm sm:max-w-md lg:max-w-xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl font-chakra"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl sm:text-2xl font-bold uppercase text-transparent">
                  Welcome to Digiverse
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsHowToPlayDialogOpen(false)} 
                  className="text-gray-400 hover:text-purple-400 hover:bg-white/5 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {PLAY_STEPS.map((step) => (
                  <div key={step.number} className="flex gap-3 sm:gap-4">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/40 text-xs sm:text-sm font-bold text-purple-300">
                      {step.number}
                    </span>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-bold text-sm sm:text-base text-gray-100">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/10 px-6 py-4 text-right bg-[#121212]">
                <Button 
                  onClick={() => setIsHowToPlayDialogOpen(false)} 
                  className="btn-landing-gradient font-semibold rounded-xl px-6 py-2.5"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isProfileDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsProfileDialogOpen(false)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-lg" 
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

        {/* Notifications Modal */}
        {isNotificationsDialogOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80 font-chakra text-white" 
            onClick={() => setIsNotificationsDialogOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="flex max-h-[85vh] w-full max-w-sm sm:max-w-md flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181818] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 sm:py-5">
                <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg sm:text-xl font-bold uppercase text-transparent flex items-center gap-2">
                  <Bell size={18} className="text-purple-400" /> Notifications
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsNotificationsDialogOpen(false)} 
                  className="text-gray-400 hover:text-purple-400 hover:bg-white/5 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3">
                {/* Daily Stardust Reward notification */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md relative overflow-hidden group text-left transition-all duration-300 hover:border-purple-500/30">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF00FF]/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] sm:text-xs font-black uppercase text-[#CB6CE6] tracking-wider bg-[#CB6CE6]/10 px-2 py-0.5 rounded border border-[#CB6CE6]/20">
                      System reward
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">Today</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">Daily Stardust Credited</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Your account has been credited with today's daily loyalty reward of <span className="text-yellow-400 font-bold">+50 Stardust</span>. Keep participating daily to maximize your multiplier!
                  </p>
                </div>

                {/* Beta Voyager Welcome notification */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md relative overflow-hidden group text-left transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] sm:text-xs font-black uppercase text-blue-400 tracking-wider bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">
                      Announcement
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">2 days ago</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">Welcome to Digiverse Beta</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Welcome voyager! As one of the first human copilots in the Digiverse, you have unlocked access to exclusive early quests. Claim your pass and start securing your future.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-white/10 p-4 sm:px-6 sm:py-4 bg-[#121212] flex justify-end">
                <Button 
                  onClick={() => setIsNotificationsDialogOpen(false)} 
                  className="btn-landing-gradient font-semibold rounded-xl text-xs px-5 py-2.5 h-auto"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Mobile Drawer Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-[150] lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            {/* Sidebar Content */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-64 border-r border-white/10 bg-[#0B0B0B]/95 backdrop-blur-2xl p-6 h-full justify-between z-10"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => { router.push("/dashboard"); setIsSidebarOpen(false); }}>
                    <img src="/assets/logo.png" alt="Digidrops Logo" className="h-10 w-auto object-contain" />
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeMenu === item.name
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleMenuClick(item);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                          isActive 
                            ? "bg-white/10 border border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon size={18} className={isActive ? "text-[#CB6CE6]" : "text-gray-400"} />
                        {item.name}
                      </button>
                    )
                  })}

                  {/* Vertically positioned profile card */}
                  <div className="pt-4">
                    <div 
                      onClick={() => { setIsProfileDialogOpen(true); setIsSidebarOpen(false); }}
                      className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl cursor-pointer hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-[#FF00FF]/20 flex items-center justify-center border border-white/20 shrink-0">
                          {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-white uppercase">{profile?.names ? profile?.names[0] : "U"}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate text-white uppercase">
                            {profile?.names || "Username"}
                          </p>
                          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <ShieldCheck size={10} /> Verified Human
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default DashboardUi
