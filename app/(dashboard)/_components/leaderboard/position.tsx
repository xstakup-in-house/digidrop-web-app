"use client"
import { useProfileStats            } from '@/hooks/useGetProfileStats';
import React from 'react'



const Position = () => {
  const { data, isLoading } = useProfileStats()

  if (isLoading) {
    return <p className="text-white">Loading stats ...</p>
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-10 text-white">
      <h2 className="text-2xl md:text-4xl font-bold font-chakra">
        LEADERBOARD
      </h2>

      <span className="text-lg md:text-2xl font-semibold font-chakra">
        My Position: {data.point}/{data.highest_point}
      </span>
    </div>
  )
}


export default Position 
