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
  color?: string
}

const COLORS = [
  "#E8B810",
  "#2B98E6",
  "#B837F5",
  "#26F7C5",
  "#F945C6",
]

const formatWellet = (address: string) => {
  if (!address) return "Unknown Wallet";
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const BoardTable = () => {
  const { data, isLoading } = useGetLeaderboardStats()

  if (isLoading) {
    return <p className="text-white text-center py-10">Loading position ...</p>
  }

  const topThree = data ? data.slice(0, 3) : []

  // Silver, Gold, Bronze order for visual podium
  const podiumOrder = [
    topThree[1], // Silver (Rank 2)
    topThree[0], // Gold (Rank 1)
    topThree[2], // Bronze (Rank 3)
  ].filter(Boolean)

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Pedestal Section */}
      {topThree.length > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 my-10 max-w-4xl mx-auto w-full px-4">
          {podiumOrder.map((pilot, idx) => {
            const isGold = pilot.rank === 1;
            const isSilver = pilot.rank === 2;
            const isBronze = pilot.rank === 3;
            
            const themeColor = isGold ? "text-yellow-400" : isSilver ? "text-slate-300" : "text-amber-600";
            const borderColor = isGold ? "border-yellow-500/30" : isSilver ? "border-slate-400/30" : "border-amber-600/30";
            const glowColor = isGold 
              ? "shadow-[0_0_35px_rgba(234,179,8,0.25)]" 
              : isSilver 
              ? "shadow-[0_0_25px_rgba(203,213,225,0.2)]" 
              : "shadow-[0_0_20px_rgba(180,83,9,0.15)]";
              
            const floatDelay = idx * 0.5;
            const heightClass = isGold ? "h-44 sm:h-52" : isSilver ? "h-36 sm:h-40" : "h-32 sm:h-36";

            return (
              <motion.div
                key={pilot.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`flex flex-col items-center w-full md:w-1/3 max-w-[200px] mx-auto`}
              >
                {/* Avatar and Crown Container */}
                <div className="relative mb-3 flex flex-col items-center">
                  <motion.div
                    animate={{ 
                      y: [0, -6, 0],
                      rotate: [0, isGold ? 3 : -3, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay
                    }}
                    className="absolute -top-7 z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  >
                    <Crown className={`w-8 h-8 ${themeColor} fill-current`} />
                  </motion.div>

                  <div className={`w-16 h-16 rounded-full overflow-hidden border-2 bg-black/40 ${isGold ? "border-yellow-400" : isSilver ? "border-slate-300" : "border-amber-600"} flex items-center justify-center`}>
                    {pilot.avatar ? (
                      <img src={pilot.avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold font-chakra text-white/50">?</span>
                    )}
                  </div>
                  
                  <div className={`absolute -bottom-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-chakra ${isGold ? "bg-yellow-500 text-black" : isSilver ? "bg-slate-300 text-black" : "bg-amber-600 text-white"}`}>
                    {pilot.rank === 1 ? "1st" : pilot.rank === 2 ? "2nd" : "3rd"}
                  </div>
                </div>

                {/* Pedestal Block */}
                <div className={`w-full ${heightClass} flex flex-col items-center justify-center p-4 bg-zinc-900/60 border border-white/10 backdrop-blur-md rounded-2xl ${borderColor} ${glowColor} text-center`}>
                  <p className="font-chakra font-bold text-white text-sm truncate max-w-full mb-1">
                    {formatWellet(pilot.wallet)}
                  </p>
                  <p className={`font-chakra font-extrabold ${themeColor} text-lg`}>
                    {pilot.scored_point}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase mt-1">
                    Stardust
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-x-auto rounded-lg border border-white/20 bg-zinc-950/20 backdrop-blur-md">
        <table className="w-full border-collapse text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                Wallet Address
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                Stardusts
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row: LeaderBoard, idx: number) => (
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
    color?: string
  }
}

const TableRow = ({ data }: RowProp) => {
  return (
    <tr
      style={{ borderLeft: `3px solid ${data.color || 'transparent'}` }}
      className="group border-b border-white/5 hover:border-cyan-400 hover:bg-cyan-500/[0.04] transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
    >
      <td className="px-6 py-4 font-medium font-chakra transition-transform duration-300 group-hover:scale-105 group-hover:text-cyan-300">
        #{data.rank}
      </td>

      <td className="px-6 py-4 max-w-[260px]">
        <div className="flex items-center gap-3 justify-center">
          {data.avatar ? (
            <img
              src={data.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-white/30 transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-300 group-hover:scale-110">
              ?
            </div>
          )}

          <span className="truncate transition-transform duration-300 group-hover:scale-[1.02] group-hover:text-cyan-300 font-mono">
            {formatWellet(data.wallet)}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-right font-semibold font-chakra transition-transform duration-300 group-hover:scale-105 group-hover:text-cyan-300">
        {data.scored_point}
      </td>
    </tr>
  )
}
