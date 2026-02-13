"use client"
import { useGetLeaderboardStats } from '@/hooks/useGetLeaderBoard'
import React from 'react'

type LeaderBoard={
    rank: number,
    names: string,
    wallet: string,
    scored_point: number,
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
  if (!address)   return "Unknown Wallet";
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const BoardTable = () => {
  const { data, isLoading } = useGetLeaderboardStats()

  if (isLoading) {
    return <p className="text-white">Loading position ...</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/20">
      <table className="w-full border-collapse text-white">
        <thead className="bg-white/10">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Position
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold">
              Wallet Address
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold">
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
  )
}


export default BoardTable

type RowProp ={
    data:{
        rank: number,
        names: string,
        wallet: string,
        scored_point: number,
        avatar?: string | null
        color?: string
    },
    
}

const TableRow = ({ data }: RowProp) => {
  return (
    <tr
      style={{ backgroundColor: data.color }}
      className="border-b border-white/10 hover:bg-white/10 transition"
    >
      <td className="px-4 py-3 font-medium">
        #{data.rank}
      </td>

       <td className="px-4 py-3 max-w-[260px]">
        <div className="flex items-center gap-3 justify-center">
          {/* Avatar */}
          {data.avatar ? (
            <img
              src={data.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-white/30"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
              ?
            </div>
          )}

          {/* Wallet */}
          <span className="truncate">
            {formatWellet (data.wallet)}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 text-right font-semibold">
        {data.scored_point}
      </td>
    </tr>
  )
}
