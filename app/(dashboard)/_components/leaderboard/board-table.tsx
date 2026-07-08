"use client"
import { useGetLeaderboardStats } from '@/hooks/useGetLeaderBoard'
import React from 'react'
import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

type LeaderBoard = {
  rank: number
  names: string
  wallet: string
  scored_point: number
  avatar?: string | null
  avatar_url?: string | null
  color?: string
}

const COLORS = [
  "#E8B810",
  "#2B98E6",
  "#B837F5",
  "#26F7C5",
  "#F945C6",
]

const formatWallet = (address: string) => {
  if (!address) return "Unknown";
  // Display exactly 15 characters: 6 start + 3 dots + 6 end
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

const BoardTable = () => {
  const { data, isLoading } = useGetLeaderboardStats()

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 text-white animate-pulse">
        {/* Shimmering Podium Skeleton */}
        <div className="flex flex-row justify-center items-end gap-2 sm:gap-6 my-4 sm:my-8 max-w-2xl mx-auto w-full px-2 sm:px-4">
          {[2, 1, 3].map((rank) => (
            <div key={rank} className="flex flex-col items-center w-1/3 max-w-[110px] sm:max-w-[200px]">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-3"></div>
              <div className={`w-full bg-black/30 border border-white/5 rounded-2xl ${
                rank === 1 ? 'h-32 sm:h-48' : rank === 2 ? 'h-28 sm:h-38' : 'h-24 sm:h-32'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* Shimmering Table Rows Skeleton */}
        <div className="h-64 rounded-2xl border border-white/10 bg-black/50 p-4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex justify-between items-center py-2.5 border-b border-white/5">
                <div className="h-4 w-8 bg-white/10 rounded"></div>
                <div className="h-4 w-32 sm:w-44 bg-white/10 rounded"></div>
                <div className="h-4 w-12 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const listData = Array.isArray(data) ? data : []
  const topThree = listData.slice(0, 3)

  // Silver, Gold, Bronze order for visual podium
  const podiumOrder = [
    topThree[1], // Silver (Rank 2)
    topThree[0], // Gold (Rank 1)
    topThree[2], // Bronze (Rank 3)
  ].filter(Boolean)

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Side-by-Side Podium Section */}
      {topThree.length > 0 && (
        <div className="flex flex-row justify-center items-end gap-2 sm:gap-6 my-4 sm:my-8 max-w-2xl mx-auto w-full px-2 sm:px-4">
          {podiumOrder.map((pilot) => {
            const isGold = pilot.rank === 1;
            const isSilver = pilot.rank === 2;
            const isBronze = pilot.rank === 3;
            
            // High-contrast Bronze color adjustments (amber-500) to stand out on dark backdrops
            const themeColor = isGold ? "text-yellow-400" : isSilver ? "text-slate-300" : "text-amber-500";
            const borderColor = isGold ? "border-yellow-500/20" : isSilver ? "border-slate-400/20" : "border-amber-500/20";
            const glowColor = isGold 
              ? "shadow-[0_0_25px_rgba(234,179,8,0.15)]" 
              : isSilver 
              ? "shadow-[0_0_15px_rgba(203,213,225,0.1)]" 
              : "shadow-[0_0_12px_rgba(245,158,11,0.08)]";
              
            // 2nd podium is size of 3rd, 3rd is size of 2nd: Gold (32) > Silver (28) > Bronze (24)
            const heightClass = isGold ? "h-32 sm:h-48" : isSilver ? "h-28 sm:h-38" : "h-24 sm:h-32";
            const initialLetter = pilot.wallet ? pilot.wallet.replace('0x', '').slice(0, 2).toUpperCase() : '?';

            return (
              <div
                key={pilot.rank}
                className="flex flex-col items-center w-1/3 max-w-[110px] sm:max-w-[200px] mx-auto"
              >
                {/* Avatar and Crown Container */}
                <div className="relative mb-2 sm:mb-3 flex flex-col items-center">
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                      rotate: [0, isGold ? 2 : -2, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: pilot.rank * 0.4
                    }}
                    // Shifted left more (left-[35%]) and raised up more (-top-6 sm:-top-9)
                    className="absolute -top-6 sm:-top-9 left-[35%] -translate-x-1/2 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  >
                    <Crown className={`w-5 h-5 sm:w-8 sm:h-8 ${themeColor} fill-current`} />
                  </motion.div>
 
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 bg-black/40 ${isGold ? "border-yellow-400" : isSilver ? "border-slate-300" : "border-amber-500"} flex items-center justify-center shadow-lg`}>
                    {pilot.avatar || pilot.avatar_url ? (
                      <img src={pilot.avatar || pilot.avatar_url || ''} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div 
                        style={{ background: `linear-gradient(135deg, ${COLORS[(pilot.rank - 1) % COLORS.length]} 0%, #111 100%)` }}
                        className="w-full h-full flex items-center justify-center text-[10px] sm:text-lg font-bold font-chakra text-white shadow-inner"
                      >
                        {initialLetter}
                      </div>
                    )}
                  </div>
                  
                  <div className={`absolute -bottom-1.5 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold font-chakra ${isGold ? "bg-yellow-500 text-black" : isSilver ? "bg-slate-300 text-black" : "bg-amber-500 text-white"} shadow-md sm:-bottom-2 sm:px-2.5`}>
                    {pilot.rank === 1 ? "1st" : pilot.rank === 2 ? "2nd" : "3rd"}
                  </div>
                </div>

                {/* Obsidian Pedestal Block (Strict uniform vertical gaps) */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`w-full ${heightClass} flex flex-col items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-4 bg-black/50 border border-white/10 backdrop-blur-md rounded-2xl ${borderColor} ${glowColor} text-center transition-all duration-300 cursor-pointer`}
                >
                  {/* Displaying Username instead of Wallet Address */}
                  <p className="font-chakra font-bold text-white text-[9px] sm:text-xs truncate max-w-full px-1">
                    {pilot.names || "Unknown"}
                  </p>
                  <p className={`font-chakra font-extrabold ${themeColor} text-xs sm:text-lg leading-none`}>
                    {pilot.scored_point}
                  </p>
                  <p className="text-[7px] sm:text-[9px] text-white/40 font-semibold tracking-wider uppercase leading-none">
                    Stardust
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      )}

      {/* Main Table with Sticky Header and Custom Vertical Scroll (4 columns on desktop, 3 columns on mobile) */}
      <div className="overflow-y-auto max-h-[420px] overflow-x-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl scrollbar-thin scrollbar-thumb-white/10">
        <table className="w-full border-collapse text-white table-fixed">
          <thead className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/10">
            <tr>
              <th className="w-1/3 sm:w-1/4 px-2 sm:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Rank
              </th>
              <th className="hidden sm:table-cell w-1/4 px-2 sm:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Player
              </th>
              <th className="w-1/3 sm:w-1/4 px-2 sm:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Wallet Address
              </th>
              <th className="w-1/3 sm:w-1/4 px-2 sm:px-4 py-3 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Stardust
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {listData.map((row: LeaderBoard, idx: number) => (
              <TableRow
                key={row.rank || idx}
                data={{
                  ...row,
                  color: COLORS[idx % COLORS.length],
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BoardTable

type RowProp = {
  data: {
    rank: number
    names: string
    wallet: string
    scored_point: number
    avatar?: string | null
    avatar_url?: string | null
    color?: string
  }
}

const TableRow = ({ data }: RowProp) => {
  const initialLetter = data.wallet ? data.wallet.replace('0x', '').slice(0, 2).toUpperCase() : '?';

  return (
    <motion.tr
      whileHover={{ scale: 1.005, x: 2 }}
      style={{ borderLeft: `3px solid ${data.color || 'transparent'}` }}
      className="group hover:border-purple-400 hover:bg-purple-500/[0.04] transition-all duration-300 cursor-pointer"
    >
      {/* 1. Rank Col (1/3 width on mobile, 25% centered on desktop) */}
      <td className="w-1/3 sm:w-1/4 px-2 sm:px-4 py-3 font-medium font-chakra text-xs sm:text-sm text-center transition-transform duration-300 group-hover:scale-105 group-hover:text-purple-300">
        #{data.rank}
      </td>

      {/* 2. Player Col (hidden on mobile, 25% centered on desktop) */}
      <td className="hidden sm:table-cell w-1/4 px-2 sm:px-4 py-3 text-center">
        <div className="flex items-center gap-2.5 justify-center w-fit mx-auto min-w-0">
          {data.avatar || data.avatar_url ? (
            <img
              src={data.avatar || data.avatar_url || ''}
              alt="avatar"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-white/30 transition-transform duration-300 group-hover:scale-110 shrink-0"
            />
          ) : (
            <div 
              style={{ background: `linear-gradient(135deg, ${data.color || '#333'} 0%, #111 100%)` }}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-[8px] sm:text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110 shadow-md shrink-0"
            >
              {initialLetter}
            </div>
          )}
          
          <span className="truncate font-chakra text-xs sm:text-sm text-gray-200 font-medium">
            {data.names || "Unknown"}
          </span>
        </div>
      </td>

      {/* 3. Wallet Address Col (1/3 width on mobile, 25% centered on desktop) */}
      <td className="w-1/3 sm:w-1/4 px-2 sm:px-4 py-3 text-center">
        <span className="truncate text-xs sm:text-sm transition-transform duration-300 group-hover:scale-[1.02] group-hover:text-purple-300 font-mono inline-block max-w-full text-gray-300">
          {formatWallet(data.wallet)}
        </span>
      </td>

      {/* 4. Stardust Col (1/3 width on mobile, 25% centered on desktop) */}
      <td className="w-1/3 sm:w-1/4 px-2 sm:px-4 py-3 text-center font-semibold font-chakra text-xs sm:text-sm transition-transform duration-300 group-hover:scale-105 group-hover:text-purple-300">
        {data.scored_point}
      </td>
    </motion.tr>
  )
}



